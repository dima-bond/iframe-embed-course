# Checkpoint 3: Responsive Size Owned by the Host

## Theory to teach first

Separate two problems:

- Responsive container sizing: the host can make the iframe box follow available width or an aspect ratio.
- Content-driven height: the host cannot use CSS `height: auto` to measure a cross-origin document's content.

An iframe is a replaced element. `width: 100%` means 100% of the parent content box, but its internal document does not participate in the parent's normal layout calculation.

Prediction: ask whether `height: auto` should grow when the widget adds another paragraph.

## Scoped change

- Move iframe presentation into a clear host CSS class.
- Make the iframe `display: block`, `width: 100%`, with a sensible fixed/minimum height and no border.
- Use a media query or `clamp()` to demonstrate a host-owned responsive size.
- Add one widget action that appends enough content to overflow the current iframe height.

Do not implement automatic height messaging.

## Evidence

- Resize the host viewport and watch iframe width follow the parent.
- Add widget content and observe the inner scrollbar or clipping while the outer iframe height remains unchanged.
- Inspect the iframe's computed size from the host document.

## Understanding questions

1. Why does `width: 100%` work while `height: auto` does not fit cross-origin content?
2. Which page owns the iframe rectangle in the outer layout?

Commit after approval: `feat: make iframe container responsive`.

Next: [Checkpoint 4](04-first-postmessage.md)

