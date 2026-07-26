import { NavojitAuth } from '../core/auth';

export function createNextAuthHandler(authEngine: NavojitAuth) {
  return {
    async POST(req: Request) {
      const { NextResponse } = require('next/server');
      try {
        const body = await req.json();
        if (!body.email || !body.otp) {
           return NextResponse.json({ error: "Missing email or otp" }, { status: 400 });
        }

        const result = await authEngine.verifyOtpCore(body.email, body.otp);
        return NextResponse.json({
          ...result,
          gateway: "navojit-v4-rust-nextjs",
        });
      } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }
    }
  };
}
