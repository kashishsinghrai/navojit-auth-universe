
```markdown
# Navojit Sovereign Core (Node.js/TypeScript) 

The World's Smartest Universal Sovereign Auth Engine. Powered by Rust, serving JavaScript.

A high-performance, WebAssembly (WASM) powered authentication engine for the TypeScript/Node.js ecosystem. Built with a Rust core, this package delivers enterprise-grade security, zero-knowledge architecture, and seamless integration for modern web applications.

## 🚀 Why Navojit Sovereign Auth?

- **Rust-Powered Security:** Heavy cryptographic operations are safely executed in a compiled WASM environment, ensuring memory safety and preventing JS-thread blocking.
- **TypeScript Native:** First-class TS support with strict type definitions out of the box.
- **Database Agnostic (Drizzle Ready):** Built-in adapters and models optimized for modern ORMs like Drizzle.
- **Universal Support:** Works seamlessly with Fastify, Express, and Node.js microservices.

## 📦 Installation
```bash
npm install @navojit/auth
```

## ⚡ Quick Start

```typescript
import { NavojitAuth } from '@navojit/auth';

async function bootstrap() {
  // 1. Initialize the Rust-WASM Bridge
  await NavojitAuth.init();
  console.log("🛡️ Sovereign Engine Booted Successfully.");

  // 2. Issue a Secure Identity
  const identity = await NavojitAuth.issueNewIdentity({
    userId: "usr_998x",
    email: "admin@navojit.com",
    role: "admin"
  });

  console.log("Access Token:", identity.accessToken);
}

bootstrap();
```

## 🏗️ Architecture Flow

The JS wrapper securely communicates with the WASM-compiled Rust engine, offloading cryptographic signing and validation without exposing private keys directly to the V8 engine heap.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. Copyright (c) 2026 Navojit Technologies.
```
