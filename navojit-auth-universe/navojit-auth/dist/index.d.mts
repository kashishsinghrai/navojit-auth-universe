import { FastifyInstance } from 'fastify';
import { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';

interface AuthAdapter {
    createUser(data: any): Promise<any>;
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: string): Promise<any>;
}
interface AuthConfig {
    adapter: AuthAdapter;
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
    attach(server: FastifyInstance): Promise<void>;
    express(): any;
}
declare class MongooseAdapter implements AuthAdapter {
    private model;
    constructor(model: any);
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: string): Promise<any>;
    createUser(data: any): Promise<any>;
}

export { type AuthAdapter, type AuthConfig, MongooseAdapter, NavojitAuth, type OmniTokens };
