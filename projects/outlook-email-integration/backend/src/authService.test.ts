// backend/src/authService.test.ts
import { expect } from 'chai';
import { AuthService } from './authService';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should initialize MSAL ConfidentialClientApplication', () => {
        expect(authService.isInitialized()).to.be.true;
    });

    it('should acquire a token successfully', async () => {
        const token = await authService.getAccessToken();
        expect(token).to.not.be.null;
    });
});
