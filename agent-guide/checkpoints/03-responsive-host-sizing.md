# Checkpoint 3: Responsive Size Owned by the Host

## Theory to teach first

Explain that the iframe element belongs to the host document, so the host controls its place and outer dimensions. The widget controls only the document rendered inside that rectangle.

An iframe is a replaced element. `width: 100%` makes its outer box follow the width of the host container. A fixed height or `aspect-ratio` can define the other dimension. Content-driven height is a separate problem that will be introduced later, when the course has established cross-origin messaging.

Prediction: ask what should happen to the iframe width when the browser window becomes narrower.

## Scoped change

- Move iframe presentation into a clear host CSS class.
- Make the iframe `display: block`, `width: 100%`, with a sensible fixed height and no border.
- Use the existing host container and a narrow viewport to demonstrate host-owned responsive width.

Do not change widget content or implement automatic height messaging.

## Evidence

- Resize the host viewport and watch iframe width follow the parent.
- Inspect the iframe's computed size from the host document.

## Understanding questions

1. What does `width: 100%` measure the iframe against?

Commit after approval: `feat: make iframe container responsive`.

Next: [Checkpoint 4](04-first-postmessage.md)
