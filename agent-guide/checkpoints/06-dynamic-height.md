# Checkpoint 6: Synchronize Dynamic Height

## Theory to teach first

The widget can measure its own document because it is same-origin with itself. The host can resize the iframe element because that element belongs to the host DOM. Neither side needs forbidden DOM access; they exchange one fact: desired content height.

`ResizeObserver` reports size changes. It can fire repeatedly, so the protocol should send a small message and the host should validate and clamp the number before applying it.

Flow:

```text
widget layout changes
→ ResizeObserver measures
→ widget:resize message
→ host validates
→ host changes iframe.style.height
```

Prediction: ask which side should call `document.documentElement.scrollHeight`.

## Scoped change

- Observe widget document size and send `widget:resize` messages.
- Include an initial measurement after the document is ready.
- Extend the existing safe host receiver with a resize branch.
- Accept only finite numeric heights within an explicit range, then clamp before applying.
- Avoid feedback loops caused by measuring a dimension that the host resize itself continuously changes.

## Evidence

- Add/remove widget content and observe the outer iframe height change without inner scrolling.
- Log the requested and applied height once during investigation.
- Send absurd, negative, string, and `NaN`-like values and prove they are ignored or bounded.

## Understanding questions

1. Why can the widget measure itself but the host cannot measure widget content directly?
2. Why must the host limit the received height even after validating origin?
3. What could cause a resize-message feedback loop?

Commit after approval: `feat: sync iframe height`.

Next: [Checkpoint 7](07-public-embed-script.md)

