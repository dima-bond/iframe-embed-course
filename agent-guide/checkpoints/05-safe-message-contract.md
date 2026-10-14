# Checkpoint 5: Define a Safe Message Contract

## Theory to teach first

Any window can attempt to send a message to another window it can reference. Therefore a receiver must treat every `message` event as untrusted input.

Explain the four checks:

1. `event.origin`: which origin sent it?
2. `event.source`: was it this exact iframe window?
3. Message shape: is `data` the object and `type` we expect?
4. Payload validation: are values of the expected type and within safe bounds?

The event `origin` is browser-supplied metadata. A string such as `data.origin` is sender-controlled and proves nothing.

Make the expected source symmetric and concrete:

- When Host receives from Widget, require `event.source === iframe.contentWindow`.
- When Widget receives from Host, require `event.source === window.parent`.

The expected origin changes with the direction as well: Host expects the Widget origin, while Widget expects the Host origin.

Prediction: ask whether checking only `event.data.type` is sufficient.

## Scoped change

- Centralize message type names in clearly named constants on both sides.
- Validate origin, source, object shape, type, and selection allowlist in the host.
- Apply the same receiver rule in the Widget for Host → Widget messages: expect the Host origin, require `event.source === window.parent`, and validate the `host:ping` message shape.
- Add rejected-message logs on both receiving sides for the experiment.
- Demonstrate malformed messages in both directions and prove they are ignored.

## Evidence

- A valid widget selection updates the host.
- A valid `host:ping` reaches the targeted Widget.
- Messages with a correct-looking type but wrong origin, source, or payload are rejected by the relevant receiver.
- Explain each early return in both receivers and identify the expected `event.source` for each direction.

## Understanding questions

1. Why are both `origin` and `source` useful?
2. Why should `event.data.origin` never replace `event.origin`?
3. When message structure changes, what two independently deployed pieces must remain compatible?

Commit after approval: `refactor: validate iframe message contract`.

Next: [Checkpoint 6](06-dynamic-height.md)
