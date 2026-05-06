import jwt
import datetime
import uuid
import secrets

class NavojitAuth:
    def __init__(self, secret, access_expiry_mins=15, refresh_expiry_days=30):
        self.secret = secret
        self.access_expiry = access_expiry_mins
        self.refresh_expiry = refresh_expiry_days

    def generate_omni_tokens(self, user_id, email, role="member", mfa_verified=False, auth_methods=None):
        """
        Duniya ka sabse advanced token generator. 
        Ek saath Access aur Refresh token banata hai.
        auth_methods: list of strings (e.g., ["face", "fingerprint", "pwd"])
        """
        sid = str(uuid.uuid4())
        auth_methods = auth_methods or ["pwd"]
        
        # 1. Access Token (Short-lived)
        access_payload = self._build_payload(user_id, email, role, sid, mfa_verified, auth_methods, "access")
        access_token = jwt.encode(access_payload, self.secret, algorithm="HS256")

        # 2. Refresh Token (Long-lived)
        refresh_payload = self._build_payload(user_id, email, role, sid, mfa_verified, auth_methods, "refresh")
        refresh_token = jwt.encode(refresh_payload, self.secret, algorithm="HS256")

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "sid": sid  # Session ID for global logout
        }

    def _build_payload(self, user_id, email, role, sid, mfa_v, am, token_type):
        now = datetime.datetime.utcnow()
        if token_type == "refresh":
            expiry = now + datetime.timedelta(days=self.refresh_expiry)
        else:
            expiry = now + datetime.timedelta(minutes=self.access_expiry)
            
        return {
            "sub": str(user_id),
            "email": email,
            "role": role,
            "sid": sid,
            "mfa_v": mfa_v,  # Multi-Factor Verified Status
            "am": am,        # Auth Methods Used
            "iat": int(now.timestamp()),
            "exp": int(expiry.timestamp()),
            "typ": token_type
        }

    def verify_token(self, token):
        """Universal verification with Expiry and Signature handling"""
        try:
            return jwt.decode(token, self.secret, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return {"error": "Token Expired"}
        except Exception as e:
            return {"error": str(e)}

    def generate_biometric_challenge(self):
        """Passkey / FaceID ke liye Cryptographic Challenge generator"""
        challenge = secrets.token_urlsafe(32)
        return {"challenge": challenge, "status": "ready_for_device_auth"}