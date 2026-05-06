const { NavojitAuth } = require("./dist/index");

// 1. Mock Adapter
const mockAdapter = {
  findUserByEmail: async (email) => ({ id: "nav_1", email, role: "admin" }),
  createUser: async (data) => data,
};

// 2. Initialize the beast
const auth = new NavojitAuth({
  adapter: mockAdapter,
  secret: "NAVOJIT_2026_SOVEREIGN_SECRET",
});

async function main() {
  console.log("🛠️  Testing Navojit-Auth v4.0...");

  // Test Rust Token Generation
  const tokens = auth.generateOmniTokens({
    id: "nav_1",
    email: "kashish@navojit.com",
  });
  console.log("📦 Tokens Generated (via Rust WASM):", tokens);

  // Test Rust Verification
  const decoded = auth.verifyToken(tokens.access_token);
  if (decoded && !decoded.error) {
    console.log("✅ Identity Verified! Role:", decoded.role);
    console.log("\n🚀 SYSTEM STATUS: 100% OPERATIONAL & WORLD CLASS");
  } else {
    console.log("❌ Bridge Error: Verification failed.");
  }
}

main();
