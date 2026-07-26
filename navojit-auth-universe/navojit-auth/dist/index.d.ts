import { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';
import { FastifyInstance } from 'fastify';

interface AuthAdapter$1 {
    createUser(data: any): Promise<any>;
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: string): Promise<any>;
}
interface AuthConfig {
    adapter: AuthAdapter$1;
    secret: string;
    prefix?: string;
}
type OmniTokens = {
    access_token: string;
    refresh_token: string;
    sid: string;
};
declare class NavojitAuth {
    private config;
    private enclave;
    constructor(config: AuthConfig);
    getConfig(): Required<AuthConfig>;
    generateOmniTokens(user: any, options?: {
        mfa_v?: boolean;
        am?: string[];
    }): OmniTokens;
    verifyToken(token: string): any;
    generatePasskeyOptions(userId: string, userEmail: string, rpID?: string): Promise<PublicKeyCredentialCreationOptionsJSON>;
    verifyPasskey(challenge: string, response: any, origin: string, rpID?: string): Promise<VerifiedRegistrationResponse | {
        verified: false;
        error: string;
    }>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(hash: string, password: string): Promise<boolean>;
    verifyAndFetchUser(email: string, otp: string): Promise<any>;
    verifyOtpCore(email: string, otp: string): Promise<{
        access_token: string;
        refresh_token: string;
        sid: string;
        success: boolean;
    }>;
}

interface User {
    id: string;
    email: string;
    passwordHash: string;
    orgId: string;
    role: string;
}
interface AuthAdapter {
    getUserByEmail(email: string, orgId: string): Promise<User | null>;
    createUser(data: Omit<User, "id">): Promise<User>;
}
interface AuthProvider {
    id: string;
    name: string;
    handle(body: any): Promise<User | null>;
    handleAction?(action: string, body: any): Promise<any>;
    getRedirectUrl?(): string;
}
declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            sub: string;
            role: string;
            orgId: string;
        };
        user: {
            sub: string;
            role: string;
            orgId: string;
        };
    }
}

/**
 * 1. Credentials Provider
 * Standard Email/Password authentication using Argon2 hashing.
 */
declare class CredentialsProvider implements AuthProvider {
    private adapter;
    id: string;
    name: string;
    constructor(adapter: AuthAdapter);
    handle(body: any): Promise<User | null>;
}
/**
 * 2. Google Social Provider
 * Handles One-Click login/registration using Google OAuth2.
 */
declare class GoogleProvider implements AuthProvider {
    private adapter;
    id: string;
    name: string;
    private client;
    constructor(adapter: AuthAdapter);
    handle(body: any): Promise<User | null>;
}
/**
 * 3. OTP Provider
 * Passwordless login with 6-digit codes sent via Real Email (Resend).
 */
declare class OTPProvider implements AuthProvider {
    private adapter;
    id: string;
    name: string;
    private otpStore;
    constructor(adapter: AuthAdapter);
    handleAction(action: string, body: any): Promise<any>;
    handle(body: any): Promise<User | null>;
}

declare function createExpressAuthRouter(authEngine: NavojitAuth): any;

declare function createNextAuthHandler(authEngine: NavojitAuth): {
    POST(req: Request): Promise<any>;
};

declare function attachFastifyAuth(authEngine: NavojitAuth, server: FastifyInstance): void;

declare class DrizzleAdapter implements AuthAdapter {
    getUserByEmail(email: string, orgId: string): Promise<User | null>;
    createUser(data: Omit<User, "id">): Promise<User>;
}

declare class MongooseAdapter {
    private model;
    constructor(model: any);
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: string): Promise<any>;
    createUser(data: any): Promise<any>;
}

export { type AuthAdapter$1 as AuthAdapter, type AuthConfig, CredentialsProvider, DrizzleAdapter, GoogleProvider, MongooseAdapter, NavojitAuth, OTPProvider, type OmniTokens, attachFastifyAuth, createExpressAuthRouter, createNextAuthHandler };
