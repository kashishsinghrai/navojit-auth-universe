import { NavojitAuth } from '../core/auth';

export function createExpressAuthRouter(authEngine: NavojitAuth) {
  const { Router } = require("express");
  const router = Router();
  const { prefix } = authEngine.getConfig();

  router.post(`${prefix}/otp/verify`, async (req: any, res: any) => {
    try {
      const result = await authEngine.verifyOtpCore(req.body.email, req.body.otp);
      res.json({
        ...result,
        gateway: "navojit-v4-rust-express",
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
}
