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

