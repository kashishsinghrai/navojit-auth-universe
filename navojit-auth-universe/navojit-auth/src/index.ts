import { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
// Types ko naye package se import kar rahe hain
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";
import * as argon2 from "argon2";

// --- WASM IMPORT ---
const wasm = require("../pkg/navojit_auth");

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================
export interface AuthAdapter {
  createUser(data: any): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  findUserById(id: string): Promise<any>;
}

export interface AuthConfig {
  adapter: AuthAdapter;
  secret: string;
  prefix?: string;
}

export type OmniTokens = {
  access_token: string;
  refresh_token: string;
  sid: string;
};

// ==========================================
// 2. THE NAVOJIT OMNI-ENGINE (Sovereign Edition)
// ==========================================
export class NavojitAuth {
  private config: Required<AuthConfig>;
  private enclave: any;

  constructor(config: AuthConfig) {
    this.config = {
      prefix: "/auth",
      ...config,
    };
    this.enclave = new wasm.SovereignEnclave(this.config.secret);
  }

  // 🚀 CORE 1: SOVEREIGN TOKENS
  public generateOmniTokens(
    user: any,
    options: { mfa_v?: boolean; am?: string[] } = {},
  ): OmniTokens {
    const userId = (user.id || user._id || "").toString();
    const email = user.email || "";
    const role = user.role || "member";
    const mfa_v = options.mfa_v || false;
    const am = options.am || ["pwd"];

    return this.enclave.generate_omni_tokens(userId, email, role, mfa_v, am);
  }

  public verifyToken(token: string): any {
    const claims = this.enclave.verify_token(token);
    if (!claims) {
      return {
        error: "expired_or_invalid",
        message: "Sovereign verification failed",
      };
    }
    return claims;
  }

  // 👁️ CORE 2: BIOMETRICS & PASSKEYS
  public async generatePasskeyOptions(
    userId: string,
    userEmail: string,
    rpID: string = "navojit.com",
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    return generateRegistrationOptions({
      rpName: "Navojit Ecosystem",
      rpID,
      userID: Buffer.from(userId),
      userName: userEmail,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
    });
  }

  public async verifyPasskey(
    challenge: string,
    response: any,
    origin: string,
    rpID: string = "navojit.com",
  ): Promise<
    VerifiedRegistrationResponse | { verified: false; error: string }
  > {
    try {
      return await verifyRegistrationResponse({
        response,
        expectedChallenge: challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      });
    } catch (error: any) {
      return { verified: false, error: error.message };
    }
  }

  // 🔐 CORE 3: CRYPTO UTILS
  public async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }
  public async verifyPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  public async verifyAndFetchUser(email: string, otp: string): Promise<any> {
    if (!otp || otp.length < 4) throw new Error("Invalid OTP");
    let user = await this.config.adapter.findUserByEmail(email);
    if (!user) {
      user = await this.config.adapter.createUser({
        email,
        password: await this.hashPassword("NAV_SECURE_" + uuidv4()),
        role: "member",
        isVerified: true,
      });
    }
    return user;
  }

  // ==========================================
  // 3. CONNECTORS
  // ==========================================

  public async attach(server: FastifyInstance): Promise<void> {
    const { prefix, adapter } = this.config;

    server.post(`${prefix}/otp/verify`, async (req: any, reply) => {
      try {
        const user = await this.verifyAndFetchUser(
          req.body.email,
          req.body.otp,
        );
        const tokens = this.generateOmniTokens(user, {
          mfa_v: true,
          am: ["otp"],
        });
        return { success: true, ...tokens, gateway: "navojit-v4-rust-fastify" };
      } catch (e: any) {
        return reply.code(400).send({ error: e.message });
      }
    });

    server.addHook("preHandler", async (req: any, reply) => {
      // Use req.url or similar for safety in Fastify
      if (req.url?.startsWith(`${prefix}/profile`)) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return reply.code(401).send({ error: "Missing Token" });
        const decoded = this.verifyToken(token);
        if (decoded.error)
          return reply.code(401).send({ error: decoded.error });
        (req as any).user = decoded;
      }
    });
  }

  public express(): any {
    const { Router } = require("express");
    const router = Router();
    const { prefix } = this.config;

    router.post(`${prefix}/otp/verify`, async (req: any, res: any) => {
      try {
        const user = await this.verifyAndFetchUser(
          req.body.email,
          req.body.otp,
        );
        const tokens = this.generateOmniTokens(user, {
          mfa_v: true,
          am: ["otp"],
        });
        res.json({
          success: true,
          ...tokens,
          gateway: "navojit-v4-rust-express",
        });
      } catch (e: any) {
        res.status(400).json({ error: e.message });
      }
    });
    return router;
  }
}

// ==========================================
// 4. ADAPTERS
// ==========================================
export class MongooseAdapter implements AuthAdapter {
  constructor(private model: any) {}
  async findUserByEmail(email: string): Promise<any> {
    return await this.model.findOne({ email });
  }
  async findUserById(id: string): Promise<any> {
    return await this.model.findById(id);
  }
  async createUser(data: any): Promise<any> {
    return await new this.model(data).save();
  }
}
