import { AuthAdapter, User } from "../core/types";
import { db } from "../db";
import { users } from "../db/schema";
import { eq, and } from "drizzle-orm";

export class DrizzleAdapter implements AuthAdapter {
  async getUserByEmail(email: string, orgId: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.orgId, orgId)))
      .limit(1);
    return (result[0] as User) || null;
  }

  async createUser(data: Omit<User, "id">): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
        orgId: data.orgId,
        role: data.role as any,
      })
      .returning();
    return newUser as User;
  }
}
