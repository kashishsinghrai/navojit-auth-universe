// src/server.ts
import Fastify, { FastifyError } from "fastify";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Hamari Core Engine Imports
import {
  NavojitAuth,
  DrizzleAdapter,
  CredentialsProvider,
  OTPProvider,
  GoogleProvider, // Naya Social Provider
} from "./index";

import { authorize } from "./middleware/rbac";

// 1. Environment Variables Load karein
dotenv.config();

const server = Fastify({
  logger: true,
});

// 2. Global Security Plugins
server.register(helmet); // Headers security (XSS protection etc.)

server.register(cors, {
  // Frontend URL (.env se) ya true (development ke liye)
  origin: process.env.ALLOWED_ORIGINS?.split(",") || true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

// 3. Rate Limiting: Brute force aur DDoS protection
server.register(rateLimit, {
  max: 100, // Per IP max requests
  timeWindow: "1 minute",
});

// 4. JWT Configuration (Rotation aur Security ke liye)
server.register(jwt, {
  secret: process.env.JWT_SECRET || "global-auth-key-2026",
});

// 5. Global Error Handler (TypeScript 'unknown' fix ke saath)
server.setErrorHandler((error: FastifyError, request, reply) => {
  server.log.error(error);

  // Validation Errors (Zod ya Fastify Schemas)
  if (error.validation) {
    return reply.status(400).send({
      error: "Validation Error",
      details: error.validation,
    });
  }

  // Token Errors
  if (error.statusCode === 401) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: error.message || "Invalid or expired token",
    });
  }

  // Global Fallback
  reply.status(500).send({
    error: "Internal Server Error",
    message: "Something went wrong in Navojit Global Engine",
  });
});

const start = async () => {
  try {
    // 6. Initialize Database Adapter
    const adapter = new DrizzleAdapter();

    // 7. Core Auth Engine Configuration
    const auth = new NavojitAuth({
      adapter,
      jwtSecret: process.env.JWT_SECRET || "global-auth-key-2026",
      providers: [
        new CredentialsProvider(adapter), // Email/Password
        new GoogleProvider(adapter), // Google One-Click Login
        new OTPProvider(adapter), // Passwordless/Email OTP
      ],
    });

    // 8. Attach Auth API Routes (/auth/register, /auth/login/google, etc.)
    auth.attach(server, "/auth");

    // 9. Health Check (Monitoring ke liye zaroori hai)
    server.get("/health", async () => ({
      status: "alive",
      engine: "Navojit Global Auth",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    }));

    // 10. --- PROTECTED RBAC ROUTES (Business Logic) ---

    // Global Dashboard: Owner aur Admin access
    server.get(
      "/api/dashboard",
      {
        preHandler: [authorize(["owner", "admin"])],
      },
      async (request) => {
        return {
          message: "Welcome to the Global Dashboard",
          stats: "Top Secret Org Data",
          user: request.user, // Token se nikala gaya data
        };
      },
    );

    // Organization Settings: Sirf Owner access
    server.get(
      "/api/settings",
      {
        preHandler: [authorize(["owner"])],
      },
      async () => {
        return { message: "Critical System Settings Accessed Successfully" };
      },
    );

    // --- END PROTECTED ROUTES ---

    // 11. Launch Server
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ port, host: "0.0.0.0" });

    console.log(`
    🚀 ============================================
    🌍 NAVOJIT GLOBAL AUTH ENGINE IS LIVE
    🛡️  SECURITY: HELMET, CORS & RATE-LIMIT ACTIVE
    🔑  AUTH: GOOGLE, CREDENTIALS & OTP READY
    👥  RBAC: ROLE-BASED ACCESS ENABLED
    📍  PORT: ${port}
    ================================================
    `);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
