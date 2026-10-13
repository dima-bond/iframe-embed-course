# Checkpoint 0: Orientation and Three Origins

Do not edit application files in this checkpoint.

## Theory to teach first

Explain in simple Ukrainian:

- A normal page is one browser document with its own URL, DOM, JavaScript environment, and navigation history.
- An iframe is an HTML element that asks the browser to load another document inside the current page.
- The iframe is not copied HTML and not a normal `div`; it creates a nested browsing context.
- The parent controls where the iframe box sits. The framed document controls what happens inside that box.
- An origin is `scheme + hostname + port`. The three course URLs therefore represent three origins.
- Separate origins let the course reproduce the real boundary between a customer's website, a hosted widget, and an API.

Use this small model:

```text
Host document :3000
└── later contains an iframe box
    └── Widget document :4000

Widget JavaScript :4000 ──HTTP request──> API :5050
```

## Observation

Start `pnpm dev`. Ask the learner to open all three URLs from the README. In DevTools Console, compare the host and widget `window.location.origin` values. In Network, select the document request for each page.

Do not embed anything yet. The separation must be understood before nesting is introduced.

## Understanding questions

Ask one at a time:

1. Is an iframe merely HTML inserted into the parent's DOM, or a separate document? What practical difference follows?
2. Why are ports `3000` and `4000` enough to make two localhost pages different origins?
3. Which application should own the iframe's position on the page, and which should own the UI inside it?

## Completion gate

Answer questions, summarize the three responsibilities, and ask if the learner is ready. After explicit approval:

1. Update progress to Checkpoint 1.
2. Run `pnpm check` and `git diff --check`.
3. Commit the complete starter state as `chore: add iframe course starter`.
4. Only then open Checkpoint 1.

Next: [Checkpoint 1](01-embed-first-iframe.md)
