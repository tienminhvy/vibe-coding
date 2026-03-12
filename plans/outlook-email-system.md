# Microsoft Outlook Integration System via Microsoft Graph API

## 1. Overview
A lightweight, robust integration system designed to securely retrieve, parse, and send emails using Microsoft Outlook via the Microsoft Graph API. The system focuses on modularity, security, and scalability, allowing automated or programmatic interactions with Microsoft 365 (M365) mailboxes.

## 2. Core Architecture

### 2.1. Authentication & Authorization (Auth Service)
- **Mechanism:** OAuth 2.0 utilizing Microsoft Authentication Library (MSAL).
- **Flow Types:** 
  - *Client Credentials Flow:* For daemon applications requiring background access to mailboxes (App-only).
  - *Authorization Code Flow:* For delegated user access where explicit user consent is required.
- **Token Management:** The Auth Service requests access tokens from Microsoft Entra ID (Azure AD), handles token caching, and performs seamless token refreshes before expiration.

### 2.2. Email Retrieval Service (Ingestion)
- **Polling vs. Webhooks:** 
  - *Delta Queries:* Polling `GET /users/{id}/mailFolders/inbox/messages/delta` ensures only new or modified emails are fetched, reducing bandwidth and processing overhead.
  - *Graph Subscriptions (Webhooks):* Subscribes to `/users/{id}/messages` to receive push notifications for real-time processing of new incoming mail.
- **Data Parsing:** Processes the JSON response to extract critical metadata (Sender, Recipients, Subject, Body (HTML/Text), Date) and downloads attachments using the `/attachments` endpoint.
- **Pagination Handling:** Automatically follows `@odata.nextLink` properties to retrieve large volumes of email seamlessly.

### 2.3. Email Dispatch Service (Egress)
- **Message Construction:** Builds structured JSON payloads representing the `message` object, including support for file attachments and rich HTML bodies.
- **Sending Mechanism:** Uses `POST /users/{id}/sendMail` endpoint to dispatch outgoing communications.
- **Drafts Management:** Can optionally create and update drafts via `POST /users/{id}/messages` before final dispatch, allowing for human review workflows if needed.

## 3. Operational Features

### 3.1. Rate Limiting & Error Handling
- Implements comprehensive error handling to parse Microsoft Graph API error codes.
- Follows the `Retry-After` header specifications for HTTP 429 (Too Many Requests) using exponential backoff to ensure high availability and compliance with Microsoft's throttling limits.

### 3.2. Security & Compliance
- **Least Privilege Access:** Requests only the minimum required Microsoft Graph permissions (e.g., `Mail.Read`, `Mail.Send`, or `Mail.ReadWrite`).
- **Secret Management:** Relies on secure secret injection (e.g., Azure Key Vault, AWS Secrets Manager, or HashiCorp Vault) to protect Client IDs and Client Secrets. No hardcoded credentials.

## 4. Typical Integration Flow
1. **Initialize:** The Auth Service retrieves an access token.
2. **Listen/Poll:** The Ingestion Service checks for new mail and passes the payload to internal processing queues.
3. **Process:** Business logic is executed on the retrieved email data.
4. **Respond:** The Dispatch Service formats a reply and pushes the outbound request to the Microsoft Graph API.