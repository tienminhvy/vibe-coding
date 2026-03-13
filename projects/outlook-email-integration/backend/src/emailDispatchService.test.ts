// backend/src/emailDispatchService.test.ts
import { expect } from 'chai';
import { EmailDispatchService } from './emailDispatchService';

describe('EmailDispatchService', () => {
    let emailDispatchService: EmailDispatchService;

    beforeEach(() => {
        emailDispatchService = new EmailDispatchService();
    });

    it('should construct a valid JSON payload for sending an email', () => {
        const payload = emailDispatchService.constructMessage("recipient@example.com", "Test Subject", "Test Body");
        expect(payload).to.have.property('message');
        expect(payload.message.toRecipients[0].emailAddress.address).to.equal("recipient@example.com");
    });
});
