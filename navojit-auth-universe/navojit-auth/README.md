# Navojit Sovereign Core 🛡️

![npm version](https://img.shields.io/npm/v/@navojit/auth?color=blue&label=npm)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
![Rust/WASM](https://img.shields.io/badge/Powered_by-Rust_%26_WASM-orange?logo=rust)

**The World's Smartest Universal Sovereign Auth Engine.** 
Built with a highly-secure Rust Cryptographic Core compiled to WebAssembly (WASM), and shipped as a 100% framework-agnostic package for Node.js environments.

---

## ✨ Key Features

- **🦀 Rust/WASM Core:** Zero-knowledge cryptographic token generation and signing happen securely within an isolated WebAssembly enclave, keeping sensitive keys out of the main Node.js thread.
- **🔌 Framework-Agnostic:** Designed to plug seamlessly into **Next.js (App Router)**, **Express**, and **Fastify** using clean, modular adapters.
- **🗄️ Universal Database Support:** Native database bindings via `DrizzleAdapter` (PostgreSQL/MySQL) and `MongooseAdapter` (MongoDB).
- **🔑 Future-Proof Auth:** Built-in FIDO2 Passkey (WebAuthn) support, OTP, and Magic Links out of the box.

---

## 📦 Installation

Install the package alongside your preferred database ORM adapter:

```bash
npm install @navojit/auth
```

*(Note: Ensure you have `drizzle-orm` or `mongoose` installed depending on your adapter choice).*

---

## 🚀 Usage Examples

### 1. Next.js (App Router) Integration
Using our zero-config Next.js adapter in your API route (`app/api/auth/route.ts`):

```typescript
import { NavojitAuth, DrizzleAdapter, createNextAuthHandler } from "@navojit/auth";

// 1. Initialize the Hub Engine
const authEngine = new NavojitAuth({
  adapter: new DrizzleAdapter(),
  secret: process.env.AUTH_SECRET || "super-secret-key",
});

// 2. Wrap it with the Next.js Adapter
const handler = createNextAuthHandler(authEngine);

// 3. Export standard Web API Handlers
export const POST = handler.POST;
```

### 2. Express Integration
Integrating into an existing Express.js server:

```typescript
import express from "express";
import { NavojitAuth, MongooseAdapter, createExpressAuthRouter } from "@navojit/auth";

const app = express();
app.use(express.json());

const authEngine = new NavojitAuth({
  adapter: new MongooseAdapter(User), // Your Mongoose User Model
  secret: process.env.AUTH_SECRET || "super-secret-key",
});

// Attach the auto-configured router to a prefix path
app.use("/api/auth", createExpressAuthRouter(authEngine));

app.listen(3000, () => console.log("Server live on port 3000"));
```

---

## 🏗️ Architecture: The Hub & Spoke Model

The `@navojit/auth` package employs a powerful **Hub and Spoke** architecture:

1. **The Hub (Core Engine):** All cryptographic logic—such as hashing, token payload structuring, and signature verification—resides in a pure Rust codebase compiled down to `navojit_auth_bg.wasm`. 
2. **The Spokes (Adapters):** The pure TypeScript `NavojitAuth` class interfaces with this WASM binary. We then provide lightweight framework "adapters" (`express.ts`, `nextjs.ts`, `fastify.ts`) that handle the HTTP transport layer (`Request`/`Response`) and feed raw data into the core logic. 

This ensures that regardless of whether you migrate from Express to Next.js, your security protocols and authentication logic remain identical and mathematically proven by the Rust core.

---

*Built with ❤️ by [Navojit Technologies](https://navojit.com)*
