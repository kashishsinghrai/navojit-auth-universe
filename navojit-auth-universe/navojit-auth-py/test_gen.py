import asyncio
from navojit_auth import NavojitAuth

# Mock Adapter testing ke liye
class MockAdapter:
    async def find_user_by_email(self, email):
        return {"id": "user_123", "email": email, "role": "admin"}
    async def create_user(self, data):
        return {"id": "new_user", "email": data['email'], "role": "member"}

async def generate():
    secret = "navojit-secret-key-2026"
    auth = NavojitAuth(adapter=MockAdapter(), secret=secret)
    
    # User data manually bhej rahe hain token generate karne ke liye
    user = {"id": "12345", "email": "kashish@navojit.com", "role": "founder"}
    token = auth.generate_token(user)
    
    print(f"\n🐍 Python Generated Token:\n{token}\n")

asyncio.run(generate())