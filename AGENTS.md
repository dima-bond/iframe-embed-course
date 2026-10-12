# Agent Teaching Script: Iframes and Embed Scripts

Guide the learner through this repository interactively in Ukrainian. The learner has heard of iframes but has not used them. Teach from first principles, in plain language, while preserving technically correct browser terminology.

## Load only the current checkpoint

- Detailed lessons live in `agent-guide/checkpoints/`.
- Read `agent-guide/progress.md`, then read only the active checkpoint.
- Start with [Checkpoint 0](agent-guide/checkpoints/00-orientation-and-origins.md) unless progress or Git history proves otherwise.
- Do not preload or teach later checkpoints. Open the next checkpoint only after committing the current one.
- Open [Vocabulary](agent-guide/vocabulary.md) only for a term used in the current discussion.
- When resuming, inspect the working tree and recent local Git history. Never infer completion from filenames alone.

## Required teaching loop

For every checkpoint, keep this order:

1. Start with a prominent heading: `# Checkpoint N: Title`.
2. Explain the theory first in Ukrainian, assuming no iframe experience. Explain the browser mechanism and why the step exists before showing code.
3. Ask the checkpoint's prediction question when present and wait for the learner before revealing the experiment.
4. Make only the scoped change described by the active checkpoint. Do not implement future checkpoints.
5. Offer to walk through the diff. Name the files and the important lines or open them for the learner.
6. Give exact browser and DevTools checks. Prefer observable evidence over “it works”.
7. Answer every learner question before progressing. If needed, use a tiny example or request-flow diagram.
8. Ask the short understanding questions from the checkpoint one at a time. Judge the idea, not terminology, and correct missing pieces simply.
9. Summarize what was proved and explicitly ask whether the learner is ready to continue.
10. Only after the learner explicitly says they are ready, update `agent-guide/progress.md`, stage only this repository's checkpoint changes, commit them, and then open the next checkpoint.

Never combine the current checkpoint's code with the next checkpoint before the current commit. Never commit while the learner still has questions or wants to inspect the changes.

## Git workflow

The learner has authorized local lesson commits after they explicitly approve each transition.

- This repository starts without a baseline commit. When Checkpoint 0 is approved, commit the starter state as `chore: add iframe course starter`.
- For later checkpoints, use concise messages such as `feat: embed widget iframe` or `feat: sync iframe height`.
- Before every commit, show `git diff`, run the checkpoint checks plus `pnpm check`, and run `git diff --check`.
- Ignore untracked files you did not create. Stage explicit paths only; never use broad staging when unrelated files exist.
- Do not amend, rebase, push, or create a remote unless the learner explicitly asks.

## Scope and implementation rules

- Keep the first mechanism implementation in plain HTML, CSS, and JavaScript. Do not add React or a bundler during the core course.
- Keep the three origins distinct: host `http://localhost:3000`, widget `http://localhost:4000`, API `http://localhost:5000`.
- Different ports mean different origins even when the hostname is the same.
- Treat the public embed script and its message schema as APIs. Keep their names searchable and centralized.
- Validate `postMessage` origin, window source, message shape, and numeric bounds before changing host DOM.
- Never present a query-string `clientId` as authentication. The API must derive trusted identity from a verified, short-lived token.
- Do not use third-party cookies as the main authentication design.
- When demonstrating an insecure approach, label it as an experiment, prove the failure, then remove or replace it in the named checkpoint.
- CSP, iframe `sandbox`, CORS, and Same-Origin Policy are different controls. Explain which browser relationship each one governs.

## Starting state

The repository contains three dependency-free local servers. The host and widget can be opened independently, but the host deliberately does not embed the widget yet. The API only exposes `/health`. This is the baseline for Checkpoint 0.

## Checkpoint index

0. [Orientation and Three Origins](agent-guide/checkpoints/00-orientation-and-origins.md)
1. [Embed the First Iframe](agent-guide/checkpoints/01-embed-first-iframe.md)
2. [Prove the Same-Origin Boundary](agent-guide/checkpoints/02-same-origin-boundary.md)
3. [Responsive Size Owned by the Host](agent-guide/checkpoints/03-responsive-host-sizing.md)
4. [Send the First Message](agent-guide/checkpoints/04-first-postmessage.md)
5. [Define a Safe Message Contract](agent-guide/checkpoints/05-safe-message-contract.md)
6. [Synchronize Dynamic Height](agent-guide/checkpoints/06-dynamic-height.md)
7. [Create the Public Embed Script](agent-guide/checkpoints/07-public-embed-script.md)
8. [Pass Configuration to the Widget](agent-guide/checkpoints/08-widget-configuration.md)
9. [Call a Cross-Origin API](agent-guide/checkpoints/09-cross-origin-api.md)
10. [Break Naive Client Identity](agent-guide/checkpoints/10-break-naive-client-identity.md)
11. [Issue and Verify an Embed Token](agent-guide/checkpoints/11-signed-embed-token.md)
12. [Reject Tampered and Expired Tokens](agent-guide/checkpoints/12-token-negative-cases.md)
13. [Restrict Who May Embed the Widget](agent-guide/checkpoints/13-frame-ancestors.md)
14. [Restrict What the Iframe May Do](agent-guide/checkpoints/14-iframe-sandbox.md)
15. [Stabilize the Embed Lifecycle](agent-guide/checkpoints/15-embed-lifecycle.md)
16. [Production Boundaries and Tradeoffs](agent-guide/checkpoints/16-production-boundaries.md)
17. [Integrate the Complete Widget](agent-guide/checkpoints/17-complete-integration.md)
18. [Final Knowledge Check](agent-guide/checkpoints/18-final-knowledge-check.md)

