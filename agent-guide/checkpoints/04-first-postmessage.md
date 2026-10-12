# Checkpoint 4: Send the First Message

## Theory to teach first

Explain that Same-Origin Policy blocks direct inspection, not all cooperation. `window.postMessage()` is an explicit message channel between window objects. The sender chooses a target window and target origin; the receiver gets a `message` event.

Messages are copied as structured data. They are not function calls, shared variables, or automatic trust. Delivery is asynchronous.

Use this flow:

```text
widget window
  postMessage({ type, payload }, expectedParentOrigin)
      ↓
host window receives a MessageEvent
```

Prediction: ask whether posting a message gives the parent permanent access to the child's DOM.

## Scoped change

- Add a widget button that sends a simple `widget:selection` message to `window.parent`.
- Add a host `message` listener that displays the received selection.
- Use exact development origins, not `"*"`.
- At this checkpoint, log `event.origin` and `event.source`; full validation comes next.

## Evidence

- Select terrain inside the widget and show the value appearing in the host.
- Inspect the MessageEvent values in the console.
- Confirm the host still cannot query the widget DOM.

## Understanding questions

1. What does `window.parent` refer to from inside the iframe?
2. Why is `postMessage` cooperation rather than a bypass of Same-Origin Policy?
3. What does `targetOrigin` protect on the sending side?

Commit after approval: `feat: connect iframe with postmessage`.

Next: [Checkpoint 5](05-safe-message-contract.md)

