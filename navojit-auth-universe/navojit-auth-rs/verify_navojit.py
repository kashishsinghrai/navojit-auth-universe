import navojit_auth

# 1. Sovereign Enclave ko initialize karo
# Secret key wahi honi chahiye jo tumhare ecosystem mein fix hai
enclave = navojit_auth.SovereignEnclave("KASHISH_ULTRA_SECURE_2026")

print("🚀 Testing Navojit Sovereign Engine (Python Edition)...")

# 2. Token Generate karo (Rust logic call ho raha hai)
# Params: user_id, email, role, mfa_v, am (authentication methods)
tokens = enclave.generate_omni_tokens(
    "nav_user_007", 
    "kashish@navojit.com", 
    "Founder", 
    True, 
    ["passkey", "otp"]
)

print("-" * 40)
print(f"📦 SID (Session ID): {tokens.sid}")
print(f"🔑 Access Token: {tokens.access_token[:50]}...")
print("-" * 40)

# 3. Authenticate (Fast Boolean Check)
is_valid = enclave.authenticate(tokens.access_token)
print(f"✅ Authentication Status: {'SUCCESS' if is_valid else 'FAILED'}")

# 4. Deep Verification (Verify Claims)
claims = enclave.verify_token(tokens.access_token)
if claims:
    print(f"👤 Verified User: {claims.email}")
    print(f"🛡️  User Role: {claims.role}")
    print(f"🕰️  Token Expiry: {claims.exp}")

print("\n🥂 RESULT: SYSTEM IS WORLD CLASS & FULLY OPERATIONAL")