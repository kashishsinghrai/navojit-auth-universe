use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, decode, Header, EncodingKey, DecodingKey, Validation, Algorithm};
use chrono::{Utc, Duration};
use uuid::Uuid;
use anyhow::{Result, anyhow};

// --- Data Structures ---

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OmniTokens {
    pub access_token: String,
    pub refresh_token: String,
    pub sid: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NavojitClaims {
    pub sub: String, 
    pub email: String, 
    pub role: String,
    pub sid: String, 
    pub mfa_v: bool, 
    pub am: Vec<String>, 
    pub typ: String,
    pub iat: i64, 
    pub exp: i64,
}

pub struct SovereignEnclave {
    pub secret: String, 
}

impl SovereignEnclave {
    pub fn new(secret: String) -> Self {
        SovereignEnclave { secret }
    }
}

pub struct NavojitMobileAuth {
    pub inner: SovereignEnclave,
}

impl NavojitMobileAuth {
    pub fn new_instance(secret: String) -> Self {
        Self {
            inner: SovereignEnclave::new(secret),
        }
    }

    // Naya user login karte waqt naya SID banayega
    pub fn generate_tokens(&self, user_id: String, email: String, role: String) -> OmniTokens {
        let sid = Uuid::new_v4().to_string();
        self._generate_with_sid(user_id, email, role, sid)
    }

    // Internal helper taaki refresh ke waqt purana SID use ho sake
    fn _generate_with_sid(&self, user_id: String, email: String, role: String, sid: String) -> OmniTokens {
        let access_token = self._create_token(&user_id, &email, &role, &sid, "access", 15);
        let refresh_token = self._create_token(&user_id, &email, &role, &sid, "refresh", 43200); // 30 Days
        OmniTokens { access_token, refresh_token, sid }
    }

    pub fn verify_token(&self, token: String) -> Result<NavojitClaims> {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.validate_exp = true;
        
        decode::<NavojitClaims>(
            &token, 
            &DecodingKey::from_secret(self.inner.secret.as_ref()), 
            &validation
        )
        .map(|data| data.claims)
        .map_err(|e| anyhow!("Token verification failed: {}", e))
    }

    fn _create_token(&self, user_id: &str, email: &str, role: &str, sid: &str, typ: &str, expiry_mins: i64) -> String {
        let expiration = Utc::now() + Duration::minutes(expiry_mins);
        let claims = NavojitClaims {
            sub: user_id.to_owned(), 
            email: email.to_owned(), 
            role: role.to_owned(),
            sid: sid.to_owned(), 
            mfa_v: true, 
            am: vec!["biometric".to_string()], 
            typ: typ.to_owned(), 
            iat: Utc::now().timestamp(), 
            exp: expiration.timestamp(),
        };
        encode(&Header::default(), &claims, &EncodingKey::from_secret(self.inner.secret.as_ref())).unwrap()
    }

    // ✅ FIXED: Purana SID maintain rahega
    pub async fn refresh_tokens(&self, refresh_token: String) -> Result<OmniTokens> {
        let claims = self.verify_token(refresh_token)?;

        if claims.typ != "refresh" {
            return Err(anyhow!("Invalid token type: Expected refresh token"));
        }

        // Naye tokens generate karo purane SID ke saath
        let new_tokens = self._generate_with_sid(
            claims.sub,
            claims.email,
            claims.role,
            claims.sid // Purana SID pass kiya
        );

        Ok(new_tokens)
    }
}