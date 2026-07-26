import { NavojitAuth } from '../core/auth';
import type { FastifyInstance } from 'fastify';

export function attachFastifyAuth(authEngine: NavojitAuth, server: FastifyInstance) {
  const { prefix } = authEngine.getConfig();

  server.post(`${prefix}/otp/verify`, async (req: any, reply: any) => {
    try {
      const result = await authEngine.verifyOtpCore(req.body.email, req.body.otp);
      return { ...result, gateway: "navojit-v4-rust-fastify" };
    } catch (e: any) {
      return reply.code(400).send({ error: e.message });
    }
  });

  server.addHook("preHandler", async (req: any, reply: any) => {
    if (req.url?.startsWith(`${prefix}/profile`)) {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return reply.code(401).send({ error: "Missing Token" });
      const decoded = authEngine.verifyToken(token);
      if (decoded.error) return reply.code(401).send({ error: decoded.error });
      req.user = decoded;
    }
  });
}
