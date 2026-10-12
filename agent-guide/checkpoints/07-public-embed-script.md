# Checkpoint 7: Create the Public Embed Script

## Theory to teach first

A raw iframe snippet makes every customer responsible for markup, configuration, message handling, and future migrations. A provider-owned embed script creates one stable integration surface: the customer adds a mount element and script; your code creates and manages the iframe.

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
- In Elements, prove the iframe was created at runtime.
- View page source and distinguish original HTML from the live DOM.

## Understanding questions

1. What responsibility moved from the customer snippet into `embed.js`?
2. Why is the embed script a public API even if it is “just JavaScript”?
3. Why should instance state not live in one shared global variable?

Commit after approval: `feat: create widget embed script`.

Next: [Checkpoint 8](08-widget-configuration.md)

