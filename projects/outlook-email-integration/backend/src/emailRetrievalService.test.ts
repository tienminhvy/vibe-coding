// backend/src/emailRetrievalService.test.ts
import { expect } from 'chai';
import { EmailRetrievalService } from './emailRetrievalService';

describe('EmailRetrievalService', () => {
    let emailRetrievalService: EmailRetrievalService;

    beforeEach(() => {
        emailRetrievalService = new EmailRetrievalService();
    });

    it('should parse delta link from response', () => {
        const mockResponse = { "@odata.nextLink": "https://graph.microsoft.com/delta-link" };
        const deltaLink = emailRetrievalService.extractDeltaLink(mockResponse);
        expect(deltaLink).to.equal("https://graph.microsoft.com/delta-link");
    });
});
