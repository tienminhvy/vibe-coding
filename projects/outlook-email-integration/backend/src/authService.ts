// backend/src/authService.ts
import { ConfidentialClientApplication, Configuration } from '@azure/msal-node';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private msalConfig: Configuration;
    private msalClient: ConfidentialClientApplication;

    constructor() {
        this.msalConfig = {
            auth: {
                clientId: process.env.CLIENT_ID || "",
                authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
                clientSecret: process.env.CLIENT_SECRET || "",
            }
        };
        this.msalClient = new ConfidentialClientApplication(this.msalConfig);
    }

    public isInitialized(): boolean {
        return !!this.msalClient;
    }

    public async getAccessToken(): Promise<string> {
        const tokenRequest = {
            scopes: ["https://graph.microsoft.com/.default"],
        };
        const response = await this.msalClient.acquireTokenByClientCredential(tokenRequest);
        return response?.accessToken || "";
    }
}
