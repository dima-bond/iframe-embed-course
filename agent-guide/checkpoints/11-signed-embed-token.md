# Checkpoint 11: Issue and Verify an Embed Token

## Theory to teach first

Introduce a signed token as a sealed claim. The payload may remain readable; integrity comes from the server-only signing key. If someone changes `clientId`, origin, or expiry without that key, signature verification fails.

Use a realistic local trust flow:

```text
Host backend :3000 owns a demo partner credential
→ asks API :5000 for a short-lived embed token
→ host page gives token to embed.js
→ iframe sends token to API
→ API verifies signature and derives clientId from verified claims
```

The browser must never receive the partner credential or signing key. The embed token is intentionally short-lived and narrowly scoped.

Prediction: ask whether Base64-encoding the client ID would provide the same guarantee as signing it.

## Scoped change

- Add a server-side host endpoint that requests a token from an internal API endpoint using a development-only partner credential.
- Issue a short-lived HMAC-signed token with `clientId`, allowed parent origin, audience/purpose, issued time, and expiry.
- Pass the embed token to the widget without exposing server credentials.
- Send it as a Bearer token to the API.
- Verify signature and claims before deriving client identity. Ignore any caller-supplied `clientId` for authorization.

Use Node's built-in crypto APIs; do not add a JWT dependency merely to hide the mechanism.

## Evidence

- Decode the readable payload and distinguish encoding from verification.
- Trace issuance and API use in Network without printing secrets.
- Show the API response uses the verified client claim.

## Understanding questions

1. Which secret stays on servers, and which short-lived value reaches the browser?
2. Why may a signed token payload be readable without becoming forgeable?
3. Who should derive the trusted `clientId`: browser code or API verification?

Commit after approval: `feat: authenticate widget with embed token`.

Next: [Checkpoint 12](12-token-negative-cases.md)

