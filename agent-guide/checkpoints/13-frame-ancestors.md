# Checkpoint 13: Restrict Who May Embed the Widget

## Theory to teach first

`Content-Security-Policy: frame-ancestors ...` is sent by the widget server and tells the browser which parent origins may frame the widget. It answers “who may embed this document?”

Contrast it with:

- CORS: which origins may let JavaScript read API responses.
- Same-Origin Policy: which documents may directly inspect each other.
- iframe `sandbox`: which capabilities the parent grants the framed page.

Explain that `X-Frame-Options` is older and less flexible. Do not set contradictory policies.

Prediction: ask whether a host can override the widget's `frame-ancestors` policy with iframe attributes.

## Scoped change

- Send a `frame-ancestors` CSP header from the widget server allowing the expected host origin.
- Preserve direct top-level development access where needed without weakening the embedding rule.
- Test an unauthorized parent origin using the course's documented localhost/127.0.0.1 variation or a small alternate host route.
- Keep origin formatting exact; no substring matching.

## Evidence

- Inspect the widget document response header.
- Show allowed embedding on the intended host.
- Show the browser refusing the unauthorized embedding and inspect its console message.

## Understanding questions

1. Which server sends `frame-ancestors`?
2. Why is this control different from CORS?
3. Who performs the actual blocking after reading the header?

Commit after approval: `feat: restrict widget frame ancestors`.

Next: [Checkpoint 14](14-iframe-sandbox.md)

