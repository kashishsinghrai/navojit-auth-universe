import "@fastify/jwt";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  orgId: string;
  role: string;
}

export interface AuthAdapter {
  getUserByEmail(email: string, orgId: string): Promise<User | null>;
  createUser(data: Omit<User, "id">): Promise<User>;
}

export interface AuthProvider {
  id: string;
  name: string;
  handle(body: any): Promise<User | null>;
  handleAction?(action: string, body: any): Promise<any>;
  getRedirectUrl?(): string; // Social Auth ke liye zaroori
}

export interface NavojitAuthConfig {
  adapter: AuthAdapter;
  jwtSecret: string;
  providers: AuthProvider[];
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; role: string; orgId: string };
    user: { sub: string; role: string; orgId: string };
  }
}
