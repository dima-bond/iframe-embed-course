# Checkpoint 16: Production Boundaries and Tradeoffs

## Theory to teach first

This checkpoint consolidates operational choices rather than adding many features. Cover each boundary with the problem it solves:

- Third-party cookies are increasingly restricted; use an explicit short-lived token flow as the primary embedded authentication mechanism.
- `referrerpolicy` limits referrer information but is not authentication.
- `loading="lazy"` helps off-screen widgets but can delay initialization.
- A meaningful iframe `title` helps screen-reader users understand the embedded region.
- Timeouts and visible error states prevent a failed widget from leaving an unexplained blank box.
- Versioning the message protocol allows host and widget deployments to change safely.
- Observability should use correlation IDs and safe metadata, never secrets or full tokens.

Also discuss when not to use an iframe: when seamless shared routing, DOM-level styling, or tight accessibility integration matters more than isolation and independent deployment.

## Scoped change

- Add `title`, an intentional `referrerPolicy`, and an explicit loading choice through the embed API.
- Add a bounded initialization timeout and a user-visible failure state.
- Add a protocol version to messages and reject unsupported versions.
- Add a non-secret correlation ID across widget API requests and development logs.
- Document the public embed contract in README without duplicating internal implementation details.

## Evidence

- Simulate an unavailable widget or delayed readiness and observe the host fallback.
- Inspect request headers and logs for the correlation ID.
- Send a wrong protocol version and show rejection.

## Understanding questions

1. Why should third-party cookies not be the only authentication plan?
2. What is the practical purpose of a protocol version?
3. Name one case where iframe isolation is valuable and one where it becomes a cost.

Commit after approval: `feat: harden widget integration contract`.

Next: [Checkpoint 17](17-complete-integration.md)

