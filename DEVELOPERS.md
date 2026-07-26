# Navojit Auth - Developer Journey & Evolution 🚀

Welcome to the **Navojit Auth Universe** open-source project! 
This document outlines every step taken to build this platform from scratch—tracing its evolution from a simple Fastify plugin to a high-performance, language-agnostic cryptographic identity engine.

If you are a new contributor, reading this will help you understand our architectural decisions and how we arrived at our current state.

---

## 🌍 The Grand Vision
**Our Goal:** To build a "Universal, Cross-Language Hub and Spoke Identity Platform". 

We believe that authentication and cryptography should be written *once* in a highly secure, memory-safe language, and executed flawlessly everywhere. We have designed a central "Sovereign Core" that acts as the hub, and we are actively building native spokes for:
- **Node.js / Next.js / Express** (via WebAssembly)
- **Flutter / Dart** (via native FFI bindings)
- **Python** (via PyO3 / Maturin bindings)

---

## 🛠️ Updated Tech Stack

Our stack has grown massively to support this universal vision:

*   **The Hub (Core Cryptography):** Rust 🦀
*   **WASM Compilation:** `wasm-pack`
*   **The Node.js Spoke:** TypeScript
*   **Supported Frameworks:** Next.js (App Router), Express.js, Fastify
*   **Database/ORM:** Drizzle ORM (PostgreSQL), Mongoose (MongoDB)
*   **Security Standards:** Argon2 (Hashing), WebAuthn/FIDO2 (Passkeys), JWT

---

## 🏗️ Phase 1: The Fastify Origins

*This phase represents the foundational steps where we first built a lightning-fast Node.js auth system, originally tightly coupled to Fastify.*

### Step 1: Project Initialization
We started by initializing the Node environment:
1. `npm init -y` to create `package.json`.
2. Installed core high-performance dependencies: `fastify`, `@fastify/jwt`, `drizzle-orm`, etc.
3. Configured strict TypeScript targets (ES2022, CommonJS).

### Step 2: Scaffolding the Architecture
We set up a clean, modular directory structure:
* `/src/routes` - Fastify route definitions.
* `/src/db` - Database connection and schemas.
* `/src/utils` - Helper functions.
* `src/server.ts` - The main entry point.

### Step 3: Core Server & Routing
We wired up `server.ts` to register Fastify plugins and set up our first extremely fast schema-validated login route in `src/routes/auth.ts`.

### Step 4: Database Schema Design (Drizzle ORM)
We integrated Drizzle ORM for type-safe, blazing-fast database queries. 
* Created a multi-tenant architecture with isolated `tenants` and `users` tables.
* Implemented strict RBAC (`Super-Admin`, `Institution-Admin`, `Instructor`, `End-User`).

### Step 5: Drizzle Migrations Configuration
To keep our database in sync with our TypeScript schemas, we configured Drizzle Kit (`db:generate` and `db:push`).

### Step 6: The Adapter Pattern (Database Agnosticism)
To make Navojit Auth work with *any* database, we implemented the Adapter Pattern:
* Created strict `AuthAdapter` interfaces in `src/core/types.ts`.
* Built `MemoryAdapter`, `DrizzleAdapter`, and `MongooseAdapter`.

### Step 7: JWT Verification & Protected Routes
We implemented secure endpoints by adding `server.authenticate` decorators using `@fastify/jwt` to verify incoming Bearer tokens.

### Step 8: Library Export & NPM Package Architecture
We restructured the app to be a global, installable NPM package (`npm i @navojit/auth`), exposing the central `NavojitAuth` class.

### Step 9: TypeScript Build & Ready for NPM
We generated type declarations (`.d.ts`) and compiled JavaScript into the `dist/` directory using `npm run build` (now powered by `tsup`).

### Step 10: Production-Ready UUIDs & Database Persistence
Integrated the `uuid` library for secure IDs and successfully connected the system to a live PostgreSQL database for real user persistence.

### Step 11: Refresh Token Rotation & Multi-Token Auth
Implemented Refresh Token strategy to balance security (short-lived access) and UX (long-lived refresh), achieving sub-100ms response times for database-backed authentications.

---

## 🛡️ Phase 2: The Sovereign Core & WebAssembly

As the platform scaled, we realized that handling intense cryptographic tasks (like complex token generation and multi-factor validation) directly inside Node.js could block the main event loop, severely degrading performance.

**The Solution:**
1. We extracted all cryptographic token generation and signing logic into a brand new Rust crate (`navojit-auth-rs`).
2. We created the `SovereignEnclave` in Rust—a zero-knowledge environment where secrets are held securely.
3. Using `wasm-pack`, we compiled this Rust core into a highly optimized WebAssembly (`.wasm`) binary. 
4. The Node.js application now simply acts as a lightweight wrapper, passing data to the WASM enclave which executes the heavy lifting at near-native speeds without blocking the main JavaScript thread.

---

## 🔌 Phase 3: Framework Agnosticism & Adapters

With our backend logic completely decoupled via WASM, the next bottleneck was that our TypeScript wrapper was tightly coupled to Fastify's specific `req` and `reply` objects. Developers couldn't easily use the engine in Next.js or Express.

**The Solution:**
1. **Pure Core Logic:** We stripped all HTTP transport objects out of the main `NavojitAuth` class. Methods like `verifyOtpCore()` now take raw strings (like `email` and `otp`) and return standard JavaScript result objects.
2. **Framework Adapters:** We introduced a modular adapter pattern for the transport layer:
   * **Next.js:** Built `createNextAuthHandler` leveraging standard Web API `Request` and `NextResponse`.
   * **Express:** Built `createExpressAuthRouter` utilizing standard Express middleware.
   * **Fastify:** Built `attachFastifyAuth` to maintain high-performance backward compatibility.

Developers can now import exactly what they need for their specific stack!

---

## 🔮 Future Roadmap

The universe is expanding. The next major milestones involve pushing our "Hub and Spoke" model beyond Node.js:
- **Flutter Client SDK (`navojit_auth_flutter`):** Finalizing native Rust FFI bindings via `flutter_rust_bridge` to bring zero-cost cryptographic security directly to mobile devices (bypassing WASM entirely).
- **Python Backend SDK (`navojit-auth-py`):** Implementing PyO3 and Maturin bindings to allow Python environments (like Django or FastAPI) to utilize the exact same Rust core.

Welcome aboard the Sovereign Core. Let's build a safer, faster web together.