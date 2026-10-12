# Checkpoint 10: Break Naive Client Identity

## Theory to teach first

An identifier answers “which record name was supplied?” Authentication answers “what evidence proves the caller may act as that client?” A plain `clientId` in HTML, a URL, request body, or custom header is editable by the person running the browser.

Explain that CORS does not make the ID trustworthy. CORS limits which browser origins may read responses; it does not sign request data or stop a caller outside the browser.

Prediction: ask whether renaming `clientId` to `apiKey` makes the visible value secret.

## Scoped change

- Temporarily include the query-string client ID in the recommendation request.
- Let the API echo which client it thinks made the request.
- Use DevTools to replace `client_123` with another known demo ID and obtain that other client's response.
- Mark the endpoint and UI as intentionally insecure.

Do not patch over the problem with obfuscation, referrer checks, or a permanent secret in frontend JavaScript.

## Evidence

- Capture the original and forged requests in Network.
- Show that valid CORS and a correct-looking ID still do not prove identity.
- Record the security requirement the next checkpoint must satisfy.

## Understanding questions

1. Why can every value shipped to browser JavaScript be discovered and replayed?
2. Why is a client ID useful even though it is not authentication?
3. What must the API verify before trusting the client identity?

Commit after approval: `feat: demonstrate forgeable client identity`.

Next: [Checkpoint 11](11-signed-embed-token.md)

