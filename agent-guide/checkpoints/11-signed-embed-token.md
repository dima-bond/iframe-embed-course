# Checkpoint 11: Issue and Verify an Embed Token

## Theory to teach first

Start from the problem proved in Checkpoint 10: the API receives a request from browser code, but every ordinary value supplied by that browser can be edited. The API therefore needs client information created by a party it already trusts and evidence that the information was not changed in transit.

### Why the host backend is involved

Explain the initial trust relationship before showing the full flow:

- The Host backend represents a known partner/customer integration.
- The API recognizes that backend through a long-lived partner credential.
- That credential cannot be placed in `embed.js`, HTML, local storage, or the iframe because anything delivered to the browser can be read and copied.
- The Host backend therefore exchanges its long-lived credential for a short-lived, narrowly scoped embed token that is safe enough to pass through the browser.

The browser remains untrusted. It acts as a courier for the embed token; it does not get the server credential and does not decide the trusted `clientId`.

### What the signed token contains

Describe the course token as two conceptual parts:

```text
encodedPayload.signature
```

The payload contains claims such as `clientId`, allowed parent origin, purpose, issued time, and expiry. Encoding makes those values transportable; it does not hide or protect them.

The API creates the signature from the encoded payload and a server-only signing key:

```text
signature = HMAC(encodedPayload, signingKey)
```

HMAC can be introduced simply as a keyed cryptographic calculation. The same payload and secret key produce the expected signature. Changing even one payload value produces a different expected signature, and someone without the key cannot create a valid replacement.

Do not imply encryption:

- Base64 or Base64url is reversible encoding.
- Encryption hides content.
- A signature protects integrity and proves that a trusted signer created the claims.

The payload may remain readable. If someone changes `clientId`, origin, or expiry while keeping the old signature, verification fails.

### Why this flow is used

Use a realistic local trust flow:

```text
1. Browser asks its Host backend :3000 for embed configuration
2. Host backend uses its partner credential in a server-to-server request
3. API :5050 (or the configured port) validates that credential
4. API creates claims and signs a short-lived embed token
5. Host page passes the token through embed.js to the iframe
6. Widget sends the token to the API as a Bearer token
7. API recomputes and compares the signature, then validates the claims
8. Only then does the API use the verified clientId for authorization
```

Explain why the API signs and later verifies its own token: issuance converts an existing server-to-server trust relationship into a temporary browser-carried credential. Verification lets the API recover trusted claims without trusting new values asserted by browser code on every request.

Also state the limit clearly: signing does not make the token secret. Anyone who steals a valid Bearer token may replay it until it expires, which is why the token must be short-lived, narrowly scoped, sent only over HTTPS in production, and never logged.

Prediction: after explaining the mechanism, ask what the API should do if a user changes `clientId` in the payload but leaves the original signature unchanged, and which comparison should fail.

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

1. Why does the Host backend use its partner credential to obtain a short-lived token instead of putting that credential in `embed.js`?
2. If the payload is readable, what does the HMAC signature protect, and what does it not protect?
3. What must the API verify before it may trust and use the token's `clientId`?

Commit after approval: `feat: authenticate widget with embed token`.

Next: [Checkpoint 12](12-token-negative-cases.md)
