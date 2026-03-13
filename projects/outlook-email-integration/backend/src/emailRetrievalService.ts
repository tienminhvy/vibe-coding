// backend/src/emailRetrievalService.ts
export class EmailRetrievalService {
    public extractDeltaLink(response: any): string {
        return response["@odata.nextLink"] || "";
    }

    public async pollNewEmails(accessToken: string): Promise<any[]> {
        // Placeholder for GET /delta query
        return [];
    }
}
