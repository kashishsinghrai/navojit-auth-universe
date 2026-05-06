// src/middleware/rbac.ts
import { FastifyReply, FastifyRequest } from "fastify";

export const authorize = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Pehle JWT verify karein (Already attached by fastify-jwt)
      await request.jwtVerify();

      const user = request.user as { sub: string; role: string; orgId: string };

      // 2. Role check karein
      if (!allowedRoles.includes(user.role)) {
        return reply.code(403).send({
          error: "Forbidden",
          message: `Your role (${user.role}) does not have permission to access this resource.`,
        });
      }

      // 3. Org isolation check (Security Hardening)
      // Hum ensure karte hain ki user apne hi Org ka data mang raha hai
      // (Iska use hum actual business logic routes mein karenge)
    } catch (err) {
      return reply
        .code(401)
        .send({ error: "Unauthorized", message: "Invalid or expired token" });
    }
  };
};
