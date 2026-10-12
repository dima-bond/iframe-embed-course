# Checkpoint 1: Embed the First Iframe

## Theory to teach first

Explain that `iframe[src]` is a navigation instruction. When the host parser reaches it, the browser creates a nested browsing context and makes a separate document request to the `src` URL. The widget keeps its own HTML, CSS, JavaScript, and origin.

Clarify that `title` names the embedded experience for assistive technology, while `loading="lazy"` can defer an off-screen iframe. Neither changes the security boundary.

Prediction: ask whether the widget's CSS can restyle the host heading merely because the widget is visually inside the host.

## Scoped change

- Replace the placeholder paragraph in `apps/host/index.html` with one iframe pointing to `http://localhost:4000`.
- Give it a descriptive `title`, fixed starter `height`, full `width`, and no decorative border.
- Do not add `postMessage`, query parameters, sandbox, or an embed script yet.

## Evidence

- Reload `http://localhost:3000` and interact with the widget.
- In Elements, show that the host DOM contains one `<iframe>`, not the widget's internal elements.
- In Network, filter by Doc and identify the request to port `4000`.
- Open the frame URL directly and compare it with the embedded version.

## Understanding questions

1. Who downloads and executes the widget's JavaScript: the host script or the browser's nested context?
2. If the widget navigates internally, must the host document also navigate?

Commit after approval: `feat: embed widget iframe`.

Next: [Checkpoint 2](02-same-origin-boundary.md)

