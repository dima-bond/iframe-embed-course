# Checkpoint 12: Reject Tampered and Expired Tokens

## Theory to teach first

Security behavior is incomplete until failure paths are observable. Signature verification checks integrity; claim validation checks whether an otherwise authentic token is acceptable now and for this use.

Explain important claims:

- `exp`: the token is not accepted forever.
- audience or purpose: a token for one API/action is not silently reused elsewhere.
- allowed parent origin: the issued embed context matches the request context.
- client identity: taken only from verified claims.

Prediction: ask whether a correctly signed but expired token should be accepted.

## Scoped change

- Add explicit verification outcomes for malformed, invalid-signature, expired, wrong-audience, and wrong-origin tokens.
- Return generic public `401`/`403` responses while keeping useful development server logs.
- Add a controlled course-only way to issue a very short-lived token for expiry testing.
- Remove the intentionally insecure identity path from Checkpoint 10.

## Evidence

- Change one payload character and receive `401`.
- Wait for the short token to expire and receive `401`.
- Use a mismatched allowed origin and receive `403`.
- Obtain a fresh valid token and recover without restarting services.

## Understanding questions

1. What different problems do signature verification and expiry validation solve?
2. Why should the public error avoid revealing cryptographic details?
3. Why remove the insecure fallback rather than keep it “for compatibility”?

Commit after approval: `fix: reject invalid embed tokens`.

Next: [Checkpoint 13](13-frame-ancestors.md)

