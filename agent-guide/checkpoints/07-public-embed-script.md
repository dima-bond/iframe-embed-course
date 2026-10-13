# Checkpoint 7: Create the Public Embed Script

## Theory to teach first

A raw iframe snippet makes every customer responsible for markup, configuration, message handling, and future migrations. A provider-owned embed script creates one stable integration surface: the customer adds a mount element and script; your code creates and manages the iframe.

Explain immediately that this convenience changes the trust boundary.

With a raw iframe:

```html
<iframe src="http://localhost:4000"></iframe>
```

the widget code executes inside the cross-origin iframe. Same-Origin Policy isolates that document from the host DOM.

With a provider script:

```html
<script src="http://localhost:4000/embed.js"></script>
```

the browser downloads `embed.js` from the provider, but executes it as part of the host document and with the host page's JavaScript privileges. The script can potentially:

- read and change the host DOM;
- read the host's `localStorage`;
- read host cookies available to JavaScript, but not `HttpOnly` cookies;
- make same-origin requests as host code;
- register listeners or load additional scripts.

The iframe created by `embed.js` remains a cross-origin document with its existing isolation. The two pieces therefore have different security properties:

```text
embed.js → trusted third-party code running with host-page privileges
iframe   → cross-origin document isolated from the host DOM
```

Make clear that a later iframe `sandbox` applies to the iframe document, not to `embed.js`. Moving iframe construction into a script therefore expands the host's trust boundary. Keep the bootstrap script small and auditable; its stable URL, versioning, delivery security, and ability to change over time are security decisions, not only deployment details.

Explain `document.currentScript`: while a classic external script executes, it can find the exact `<script>` element that loaded it and read `data-*` attributes. Explain why relying on one hard-coded global ID would prevent multiple widget instances.

Prediction: ask what happens to existing customers if the provider changes iframe markup but their sites contain a provider-owned script URL.

## Scoped change

- Serve a new `embed.js` from the widget origin.
- Replace the host's handwritten iframe with a mount element and external script tag.
- Let `embed.js` read its own configuration, create the iframe, apply the current sizing behavior, and attach the existing safe message handling.
- Scope each listener to its own iframe instance.
- Keep one clear public configuration vocabulary; do not add aliases.

## Evidence

- In Network, identify the host document, cross-origin `embed.js`, and iframe document requests.
- From inside `embed.js`, inspect `window.location.origin` and prove that its execution origin is the host origin even though the script file was downloaded from port `4000`.
- In Elements, prove the iframe was created at runtime.
- View page source and distinguish original HTML from the live DOM.

## Understanding questions

1. What responsibility moved from the customer snippet into `embed.js`?
2. Why does `embed.js` receive host-page privileges while the iframe document remains cross-origin and isolated?
3. Why should instance state not live in one shared global variable?

Commit after approval: `feat: create widget embed script`.

Next: [Checkpoint 8](08-widget-configuration.md)
