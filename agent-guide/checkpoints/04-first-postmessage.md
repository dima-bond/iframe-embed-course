# Checkpoint 4: Send the First Message

## Theory to teach first

Explain that Same-Origin Policy blocks direct inspection, not all cooperation. `window.postMessage()` is an explicit message channel between window objects. The sender chooses a target window and target origin; the receiver gets a `message` event.

Messages are copied as structured data. They are not function calls, shared variables, or automatic trust. Delivery is asynchronous.

Explicitly explain the API's easily missed direction: call `postMessage()` on the window that should receive the message, not on the sender's own window.

- From inside the iframe, `window.parent` is a reference to the parent window, so `window.parent.postMessage(...)` sends to the host.
- From the host, `iframe.contentWindow` is a reference to that iframe's window, so `iframe.contentWindow.postMessage(...)` sends to the widget.
- The receiver listens on its own window with `window.addEventListener("message", handler)`.

In other words, the object before `.postMessage(...)` answers “which window should receive this?” The browser then dispatches a `message` event on that target window.

Use this flow:

```text
widget code
  → window.parent.postMessage(message, hostOrigin)
  → browser dispatches "message" on the host window
  → host's window.addEventListener("message", handler) runs
```

Clarify what `targetOrigin` protects. Do not describe the risk as another iframe “intercepting a message in transit.” An unrelated iframe cannot passively listen to a `postMessage` addressed to a specific window. The real risk is that the target window contains a different document from the one the sender expected.

For example, a malicious site can embed the public widget:

```text
https://evil.example
└── iframe containing the Widget
```

Inside that widget, `window.parent` now refers to the malicious parent. This sends the data to whatever document is currently in that parent window:

```js
window.parent.postMessage(secretData, "*");
```

With an exact target origin:

```js
window.parent.postMessage(secretData, "http://localhost:3000");
```

the browser compares the expected origin with the target window's current document:

```text
expected: http://localhost:3000
actual:   https://evil.example
```

The origins do not match, so the browser does not deliver the message.

Explain one more reason for checking the current origin: code may already hold a reference to the intended window, but that window can navigate to another site. The `Window` reference remains usable while the document and its origin change. An exact `targetOrigin` prevents delivery after that navigation.

Finally, distinguish the reverse threat: a malicious window may try to send a forged message to the host. `targetOrigin` does not validate incoming messages. The receiver must check `event.origin`, `event.source`, and message data; Checkpoint 5 adds those receiver-side checks.

Prediction: ask whether posting a message gives the parent permanent access to the child's DOM.

## Scoped change

- Add a widget button that sends a simple `widget:selection` message to `window.parent`.
- Keep the button enabled. If no terrain is selected, do not send a message; show the inline `aria-live` feedback `Choose a terrain before sending.` next to the action instead.
- Clear the validation feedback after the learner selects a terrain and successfully sends it.
- Add a host `message` listener that displays the received selection.
- Use exact development origins, not `"*"`.
- At this checkpoint, log `event.origin` and `event.source`; full validation comes next.

## Evidence

- Select terrain inside the widget and show the value appearing in the host.
- Click the send button without a selection and confirm that the widget explains what is missing while the host receives nothing.
- Inspect the MessageEvent values in the console.
- Confirm the host still cannot query the widget DOM.

## Understanding questions

1. Why does iframe code call `window.parent.postMessage(...)` rather than `window.postMessage(...)`, and which window receives the event?
2. What does `targetOrigin` protect on the sending side?

Commit after approval: `feat: connect iframe with postmessage`.

Next: [Checkpoint 5](05-safe-message-contract.md)
