import navojit_auth

# 1. Initialize Enclave
enclave = navojit_auth.SovereignEnclave("KASHISH_PYTHON_SECRET_2026")

# 2. Generate Tokens
# Yaad hai? Rust mein humne user_id, email, role, mfa_v, am maange the
tokens = enclave.generate_omni_tokens(
    "nav_123", 
    "kashish@navojit.com", 
    "founder", 
    True, 
    ["pwd", "otp"]
)

print(f"🔥 Python Tokens Generated!")
print(f"Access Token: {tokens.access_token[:30]}...")
print(f"Session ID (SID): {tokens.sid}")

# 3. Verify Token
is_valid = enclave.authenticate(tokens.access_token)
print(f"✅ Status: {'World Class Authenticated' if is_valid else 'Failed'}")