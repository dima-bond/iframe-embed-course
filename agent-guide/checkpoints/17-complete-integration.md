# Checkpoint 17: Integrate the Complete Widget

## Theory to teach first

Review the full request and trust flow without adding a new mechanism:

```text
Customer HTML
→ provider embed.js reads public configuration
→ host backend obtains a short-lived signed token
→ embed.js creates a sandboxed iframe
→ widget and host exchange validated versioned messages
→ widget calls API with the token
→ API verifies claims and derives client identity
```

Separate ownership clearly:

- Customer owns placement and selected public options.
- Embed script owns iframe construction, parent-side messaging, sizing, lifecycle, and fallback UI.
- Widget owns inner UI, self-measurement, and API interaction.
- API owns trust decisions and customer data access.

## Scoped change

- Remove temporary experiment controls, logs, and insecure demo paths that are no longer required.
- Keep a dedicated test/demo path only when its purpose is explicit and it cannot become an authorization fallback.
- Make the customer integration snippet short and copyable.
- Ensure names for message types, claims, origins, and config fields are consistent and searchable.
- Add a concise architecture and manual verification section to README.

## Evidence

Run the complete path from a clean browser load:

1. Host renders without a handwritten iframe.
2. Embed script creates the widget.
3. Widget height follows content.
4. Config is applied.
5. API returns client-specific data only with a valid token.
6. Invalid messages and tokens are rejected.
7. Unauthorized embedding is blocked.
8. Two instances remain independent.

Run `pnpm check`, `git diff --check`, and any course tests added during the lessons.

## Understanding questions

1. Trace one user click from the host page to the trusted API response.
2. Where does each security decision live, and why there?
3. Which part is the stable public API for customers?

Commit after approval: `feat: complete secure iframe integration`.

Next: [Checkpoint 18](18-final-knowledge-check.md)

