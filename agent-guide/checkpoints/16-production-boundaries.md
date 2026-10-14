# Checkpoint 16: Production Boundaries and Tradeoffs

## Theory to teach first

Explain that this checkpoint has two purposes:

1. Record production decisions that affect the architecture but do not require new code in this checkpoint.
2. Add a small set of runtime mechanisms for accessibility, loading, failure handling, compatibility, and observability.

Do not present the changes as one generic “hardening” bundle. Introduce each mechanism through the concrete problem it solves.

### Decisions reviewed without adding a new mechanism

- **Third-party cookies:** browsers increasingly restrict them, so the short-lived token flow from Checkpoints 11–12 remains the primary authentication design. This checkpoint does not add cookie authentication.
- **When not to use an iframe:** isolation and independent deployment are valuable, but an iframe may be the wrong choice when seamless shared routing, DOM-level styling, or tight accessibility integration is more important.

### Public iframe options

The embed script currently chooses iframe attributes internally. Make the supported choices explicit in the public embed API:

- `title` gives assistive technology a useful name for the embedded region.
- `loading="lazy"` can defer an off-screen iframe; `loading="eager"` starts it immediately. This is a performance/initialization decision, not a security permission.
- `referrerPolicy` controls how much parent-page URL information the browser includes when navigating the iframe. It reduces referrer leakage but does not authenticate either side.

Explain that normalization gives every instance a known value and prevents arbitrary options from being copied blindly onto the iframe.

### Readiness and initialization timeout

Creating an iframe element does not prove that the widget's JavaScript initialized successfully. A document can load slowly, fail, or render while its application code never becomes ready.

Add an explicit handshake:

```text
embed.js creates iframe and starts a timer
→ widget JavaScript finishes initialization
→ widget sends widget:ready
→ embed.js validates the message and clears the timer
```

If readiness does not arrive within the bounded time, the host replaces an unexplained blank or frozen area with a visible failure state. The timeout is not primarily an optimization; it is a limit on how long the integration may remain in an unknown state.

### Message protocol version

Host and widget may be deployed at different times. A message type can keep the same name while its payload shape or meaning changes. Add a protocol version to every message so the receiver can reject a schema it does not understand instead of interpreting it incorrectly.

The version is compatibility metadata, not authentication. Origin, source, and payload validation are still required.

### Correlation ID

One user action crosses several boundaries: embed instance, iframe message, widget request, and API log. Without a shared identifier, logs from simultaneous widgets are difficult to connect.

Generate one non-secret correlation ID per widget instance and carry it through the relevant messages, API request header, and development logs. Its job is only to connect records belonging to the same flow.

Make these limits explicit:

- a correlation ID is not a client ID;
- it does not authenticate or authorize anything;
- it must never contain a token or other secret;
- the API may log it as bounded metadata but must not trust it for security decisions.

### Public contract documentation

README should document what an integrator may configure and observe: supported options, defaults, lifecycle result, and failure behavior. It should not force customers to understand internal closures, message handlers, or token implementation details.

## Scoped change

- Add `title`, an intentional `referrerPolicy`, and an explicit loading choice through the embed API.
- Add a bounded initialization timeout and a user-visible failure state.
- Add a protocol version to messages and reject unsupported versions.
- Add a non-secret correlation ID across widget API requests and development logs.
- Document the public embed contract in README without duplicating internal implementation details.

## Explain the implemented code before verification

After editing, walk through the changed code in runtime order. Do not jump directly from a list of files to browser instructions.

Use one widget instance and connect every code block to its purpose:

1. `createWidget()` normalizes `title`, `loading`, and `referrerPolicy`, then applies the supported values to the iframe. Explain the default chosen for each option.
2. The instance creates one correlation ID. Trace exactly how that same value reaches the iframe/widget, the API request header, and the development logs. State again that it is diagnostic metadata, not identity.
3. The host starts an initialization timer when it creates the iframe. Explain which state the UI is in while waiting.
4. After its JavaScript initialization completes, the widget sends `widget:ready` with the expected protocol version.
5. The existing receiver still validates origin, source, and message shape; it now also checks the protocol version. Explain why the new check does not replace the old ones.
6. A valid ready message clears the timer and marks the instance ready. An unsupported version is rejected. No ready message before the deadline produces the visible failure state.
7. README records only the customer-facing contract: accepted options, defaults, and observable lifecycle behavior.

Show the actual changed functions while explaining this sequence. Pause for questions about the code before asking the learner to run the scenarios below.

## Evidence

- Run the normal path first: correlate `instance created`, `instance ready`, the API request header, and the API log using the same correlation ID.
- Inspect the iframe and connect `title`, `loading`, and `referrerpolicy` back to the public options and their stated purposes.
- Simulate an unavailable widget or delayed readiness and observe the host fallback.
- Send a wrong protocol version and show rejection.

## Understanding questions

1. Why do we need an explicit `widget:ready` message and timeout instead of assuming iframe creation means the application is ready?
2. What failure does the protocol version prevent, and which security checks does it not replace?
3. What does a correlation ID help us do, and why must the API never treat it as client identity or authorization?

Commit after approval: `feat: harden widget integration contract`.

Next: [Checkpoint 17](17-complete-integration.md)
