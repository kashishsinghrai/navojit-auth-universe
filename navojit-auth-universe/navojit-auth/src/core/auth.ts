import { v4 as uuidv4 } from "uuid";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";
import * as argon2 from "argon2";

const wasm = require("../../pkg/navojit_auth");

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

  public getConfig() {
    return this.config;
  }

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

  public async verifyOtpCore(email: string, otp: string) {
    const user = await this.verifyAndFetchUser(email, otp);
    const tokens = this.generateOmniTokens(user, {
      mfa_v: true,
      am: ["otp"],
    });
    return { success: true, ...tokens };
  }
}
