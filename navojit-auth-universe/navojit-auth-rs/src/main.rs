use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    email: String,
    role: String,
}

fn main() {
    let secret = "navojit-secret-key-2026";
    
    // place you py tocken here
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsImVtYWlsIjoia2FzaGlzaEBuYXZvaml0LmNvbSIsInJvbGUiOiJmb3VuZGVyIiwib3JnSWQiOm51bGwsInNpZCI6ImI0OTVmNzQxLWZiYzktNGUyNS04MjVmLTNjODBhMmE3OTBkNyIsImlhdCI6MTc3NjAwODE1NSwiZXhwIjoxNzc2NjEyOTU1fQ.CTcVOVppDtFC1oMrYaSrsiBE2EjLRO_nsDzB6fCJuNs"; 

    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = true; // Expiry check karega

    // here we use decoderkey
    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &validation,
    );

    match token_data {
        Ok(data) => {
            println!("\n🦀 Rust Verification Success! (The Engine is Universal)");
            println!("User ID: {}", data.claims.sub);
            println!("Role: {}", data.claims.role);
            println!("Email: {}", data.claims.email);
            println!("====================================\n");
        },
        Err(e) => println!("\n❌ Rust Verification Failed: {:?}", e),
    }
}