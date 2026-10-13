# Checkpoint 15: Stabilize the Embed Lifecycle

## Theory to teach first

An embed integration has a lifecycle: discover configuration, create iframe, wait until communication is possible, react to messages, and clean up when removed. A public script must also handle multiple independent instances and repeated loading predictably.

Explain why global listeners that capture one iframe forever can leak memory or route messages to the wrong instance. The deepest useful module owns its instance state and exposes one small API.

Prediction: ask what breaks if two widgets share one global `currentIframe` variable.

## Scoped change

- Refactor `embed.js` around one `createWidget(options)` function or equivalent deep module.
- Return a small controller with only evidenced operations such as `destroy()`.
- Ensure message listeners are attached once per instance and removed on destroy.
- Support two widgets on one host page without cross-talk.
- Define behavior for duplicate script execution and invalid/missing mounts; fail clearly without compatibility aliases.

## Explain the implemented code before testing understanding

After applying the refactor, walk through the diff with the learner before asking any understanding questions. Do not only say that the code is “cleaner” or “supports multiple widgets.” Connect every new structure to the concrete failure it prevents.

Trace one `createWidget(options)` call in runtime order:

1. The function validates the mount and configuration.
2. It creates one iframe and stores that iframe, its options, and its message handler in the function call's own closure.
3. The handler accepts messages only from that instance's `iframe.contentWindow`, preventing another widget instance from controlling it.
4. The function registers the handler and returns a small controller that closes over the same private references.
5. `destroy()` removes the message listener as well as the iframe, so code for a removed widget does not remain active.

Then trace a second `createWidget(options)` call. Explain that it creates a different closure with different references; it does not overwrite a global `currentIframe`. This is why two widgets can resize, receive messages, and be destroyed independently.

Also point out the purpose of each boundary introduced by the refactor:

- **Factory function:** creates repeatable, isolated instances.
- **Closure-owned state:** keeps each iframe and handler paired without exposing them globally.
- **Small controller:** exposes only lifecycle operations the host actually needs.
- **Listener cleanup:** prevents stale behavior and retained references after removal.
- **Explicit mount/duplicate handling:** makes invalid integration fail predictably instead of producing hidden partial state.

Ask whether any changed line or closure relationship is still unclear. Answer those questions before moving to the evidence checks or understanding questions.

## Evidence

- Run two instances with different configuration and resize them independently.
- Destroy one instance and prove the other still works.
- Inspect listener cleanup using an observable course log or DevTools.

## Understanding questions

1. Which state must belong to one widget instance?
2. Why is a small controller API safer than exposing iframe internals?
3. What resource besides the DOM node must `destroy()` release?

Commit after approval: `refactor: isolate widget embed lifecycle`.

Next: [Checkpoint 16](16-production-boundaries.md)
