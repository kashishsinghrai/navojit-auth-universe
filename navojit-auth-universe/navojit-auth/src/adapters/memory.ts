 // src/adapters/memory.ts
import { AuthAdapter, User } from "../core/types";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export class MemoryAdapter implements AuthAdapter {
  private users: User[] = [];

  async seedDummyData() {
    const hash = await argon2.hash("Navojit@123");
    await this.createUser({
      email: "admin@school.com",
      passwordHash: hash,
      tenantId: "school-1",
      role: "Super-Admin",
    });
    console.log("Mock Database Seeded: admin@school.com / Navojit@123");
  }

  async getUserByEmail(email: string, tenantId: string): Promise<User | null> {
    return (
      this.users.find((u) => u.email === email && u.tenantId === tenantId) ||
      null
    );
  }

  async createUser(data: Omit<User, "id">): Promise<User> {
    // Math.random ki jagah asli UUID use karte hain
    const newUser = { ...data, id: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }
}
