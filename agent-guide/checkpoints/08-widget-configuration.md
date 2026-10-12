# Checkpoint 8: Pass Configuration to the Widget

## Theory to teach first

Configuration crosses two boundaries:

1. Customer HTML to `embed.js`, commonly through `data-*` attributes.
2. `embed.js` to the iframe document, commonly through URL query parameters or an initialization message.

Query parameters are appropriate for non-secret startup configuration because the iframe receives them during its first navigation. They are visible and editable, so they must never be treated as proof of identity.

Use `URL` and `URLSearchParams`; do not build URLs through string concatenation.

Prediction: ask whether `?theme=dark` and `?clientId=client_123` have any inherent security difference to the browser.

## Scoped change

- Add `data-theme`, `data-locale`, and a clearly labelled untrusted `data-client-id` to the host snippet.
- Let `embed.js` validate supported configuration and create the iframe URL using `URL`.
- Let the widget parse parameters and visibly apply theme/locale/client label.
- Fall back safely for absent or unsupported non-secret configuration.

## Evidence

- Inspect the iframe request URL in Network.
- Change theme and locale in host HTML and observe the widget after reload.
- Edit `clientId` in DevTools and explain why the browser cannot know it is forged.

## Understanding questions

1. Which parameters are presentation configuration, and which one may later influence authorization?
2. Why is URL construction with `URLSearchParams` safer than concatenating strings?
3. Can hiding `clientId` in a `data-*` attribute make it trustworthy?

Commit after approval: `feat: configure embedded widget`.

Next: [Checkpoint 9](09-cross-origin-api.md)

