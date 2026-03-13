# Implementation Plan: Outlook Email Integration System

## 1. Roadmap & Architecture
This system is an automated Outlook email handler using Microsoft Graph API, consisting of:
- **`backend/`**: Express.js server handling OAuth 2.0 (MSAL), email polling/webhooks, and dispatch.
- **`frontend/`**: Angular dashboard for monitoring and manual intervention.

## 2. Test-First Roadmap
For each module, we will define unit/integration tests before writing implementation code.

### Phase A: Auth Service (Priority 1)
*   **Goal**: Secure, cached token access via MSAL.
*   **Tests**: 
    *   Verify token acquisition with valid/expired state.
    *   Test token caching mechanism to minimize API calls.

### Phase B: Email Dispatch Service
*   **Goal**: Securely send emails via Microsoft Graph `POST /sendMail`.
*   **Tests**:
    *   Verify JSON payload structure.
    *   Test successful vs. failed send (e.g., rate limit hit, invalid recipient).

### Phase C: Email Retrieval Service
*   **Goal**: Efficiently poll/subscribe to inbox changes.
*   **Tests**:
    *   Verify Delta Query pagination follows `@odata.nextLink`.
    *   Validate metadata extraction (Sender, Body, Subject).

## 3. Security & Privacy Audit Checklist
- [ ] **Secrets Management**: No secrets (`.env`) checked into Git. Use environment variables. In production, utilize Azure Key Vault or similar managed secrets storage.
- [ ] **Least Privilege**: Request only necessary Graph permissions (`Mail.Read`, `Mail.Send`).
- [ ] **PII Protection**: All logging must implement redaction for sensitive fields (e.g., PII, email bodies, sender addresses) before writing to persistent storage.
- [ ] **Rate Limiting**: Exponential backoff active for HTTP 429; implement standard rate-limiting middleware (e.g., `express-rate-limit`) on the backend API.
- [ ] **Frontend Security**: Implement authentication/authorization for the Angular dashboard to restrict access to authorized users only.
- [ ] **Dependency Audit**: Regularly run `npm audit` to check for vulnerable dependencies.
- [ ] **Commit Policy**: All commits signed with `Originally-committed-by: Sunny <sunny@agents.tienminhvy.com>`.

## 4. Operational Requirements
- **Logging**: Action-based logging only; strict redaction of PII.
- **Error Handling**: Every API interaction must handle 429 (Too Many Requests) using the `Retry-After` header.
- **Middleware**: Use `helmet` in Express for standard HTTP security headers.
