# Checkpoint 2: Prove the Same-Origin Boundary

## Theory to teach first

Explain Same-Origin Policy as a browser confidentiality boundary: one site must not freely read another site's DOM, cookies, or storage merely because it can open or embed it. Being able to display a document is not permission to inspect it.

The host may hold an iframe element reference, and `iframe.contentWindow` identifies the child window, but cross-origin code cannot traverse into `contentWindow.document`.

Prediction: ask what should happen if the host tries to read the widget's `<h1>`.

## Scoped change

- Add a host-side “Try DOM access” button.
- On click, deliberately attempt to read the widget document inside `try/catch`.
- Render the resulting browser error name/message in the host and keep a short console record.
- Label this as a deliberate experiment, not production behavior.

Do not solve the boundary yet.

## Evidence

- Confirm the browser reports a cross-origin access error.
- Change only the iframe URL's port mentally and identify which origin component differs.
- Explain that CORS headers would not grant parent-to-iframe DOM access.

## Understanding questions

1. Why is “the iframe is visible” different from “the parent may read the iframe DOM”?
2. Would adding an API CORS header make `iframe.contentWindow.document` readable?
3. What browser feature will we need for intentional cross-origin communication?

Commit after approval: `feat: demonstrate iframe origin boundary`.

Next: [Checkpoint 3](03-responsive-host-sizing.md)

