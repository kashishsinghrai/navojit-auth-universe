import argon2 from "argon2";
import { OAuth2Client } from "google-auth-library";
import { Resend } from "resend";
import { AuthProvider, AuthAdapter, User } from "./types";

// Initialize Resend with API Key from Environment
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 1. Credentials Provider
 * Standard Email/Password authentication using Argon2 hashing.
 */
export class CredentialsProvider implements AuthProvider {
  id = "credentials";
  name = "Email/Password";
  constructor(private adapter: AuthAdapter) {}

  async handle(body: any): Promise<User | null> {
    const { email, password, orgId } = body;
    const user = await this.adapter.getUserByEmail(email, orgId);

    // Verify password hash against the provided password
    if (user && (await argon2.verify(user.passwordHash, password))) {
      return user;
    }
    return null;
  }
}

/**
 * 2. Google Social Provider
 * Handles One-Click login/registration using Google OAuth2.
 */
export class GoogleProvider implements AuthProvider {
  id = "google";
  name = "Google";
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(private adapter: AuthAdapter) {}

  async handle(body: any): Promise<User | null> {
    const { idToken, orgId } = body;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) return null;

      let user = await this.adapter.getUserByEmail(payload.email, orgId);

      // Automatic Onboarding: Agar user nahi hai, toh use register karein
      if (!user) {
        user = await this.adapter.createUser({
          email: payload.email,
          passwordHash: "SOCIAL_AUTH_EXTERNAL", // Placeholder for social users
          orgId: orgId,
          role: "member",
        });
      }
      return user;
    } catch (error) {
      console.error("[AUTH] Google Verification Failed:", error);
      return null;
    }
  }
}

/**
 * 3. OTP Provider
 * Passwordless login with 6-digit codes sent via Real Email (Resend).
 */
export class OTPProvider implements AuthProvider {
  id = "otp";
  name = "OTP";
  private otpStore = new Map<string, { otp: string; expires: number }>();

  constructor(private adapter: AuthAdapter) {}

  async handleAction(action: string, body: any): Promise<any> {
    if (action === "send") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      this.otpStore.set(body.email, { otp, expires: Date.now() + 300000 }); // 5 min expiry

      // Send Real Email if API Key is present
      if (process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: "Navojit Auth <no-reply@navojit.io>", // Apne verified domain se replace karein
            to: body.email,
            subject: "Your Security Code",
            html: `<div style="font-family: sans-serif; padding: 20px;">
                    <h2>Verification Code</h2>
                    <p>Use the following code to sign in to your account:</p>
                    <h1 style="color: #4F46E5;">${otp}</h1>
                    <p>This code expires in 5 minutes.</p>
                   </div>`,
          });
        } catch (error) {
          console.error("[AUTH] Email Delivery Failed:", error);
        }
      }

      // Fallback for development logging
      console.log(`[AUTH] OTP for ${body.email}: ${otp}`);
      return { success: true, message: "OTP sent successfully" };
    }
    return { success: false, message: "Invalid action" };
  }

  async handle(body: any): Promise<User | null> {
    const { email, otp, orgId } = body;
    const record = this.otpStore.get(email);

    // Verify OTP and check expiry
    if (record && record.otp === otp && record.expires > Date.now()) {
      this.otpStore.delete(email); // Token use hone ke baad delete karein
      return await this.adapter.getUserByEmail(email, orgId);
    }
    return null;
  }
}
