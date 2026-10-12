# Iframes and Embed Scripts: An Interactive Course

A practical, checkpoint-based course for learning how cross-origin iframes and third-party embed scripts work in the browser.

## Begin the course

Open this repository in your coding agent and ask:

> Start the course from the current checkpoint in `AGENTS.md`. Follow the teaching loop and do not open later checkpoints early.

The course begins with observation only. The host deliberately does not contain an iframe yet; embedding it is the first visible implementation change.

The project starts with three small applications running on separate local origins:

- **Host** — a simulated customer website at `http://localhost:3000`
- **Widget** — an independently hosted embedded application at `http://localhost:4000`
- **API** — a service used by the widget at `http://localhost:5000`

You will gradually connect them while observing each browser mechanism in DevTools. The finished integration includes secure cross-window messaging, content-driven iframe height, public embed configuration, cross-origin API requests, signed client identity, embedding restrictions, and lifecycle cleanup.

## What you will learn

- What an iframe is and how its browsing context differs from the parent page
- How origins and the Same-Origin Policy affect embedded applications
- How a parent page and iframe communicate with `postMessage`
- How to validate message origin, source, shape, and payload
- Why iframe height does not automatically follow cross-origin content
- How `ResizeObserver` and `postMessage` support dynamic height
- How a provider-owned `embed.js` creates a stable integration API
- How to pass themes, locales, and other public configuration
- How CORS differs from iframe security controls
- Why a browser-provided `clientId` is not authentication
- How short-lived signed embed tokens establish trusted client identity
- How CSP `frame-ancestors` and iframe `sandbox` solve different problems
- How to support multiple widget instances and clean up their resources

## Prerequisites

- Node.js 18 or newer
- pnpm
- A Chromium-based browser with DevTools
- An AI coding agent that can follow the repository's `AGENTS.md`

The starter project has no external runtime dependencies, so no package installation is required.

## Start the local applications

```bash
pnpm dev
```

Then open:

- Host: http://localhost:3000
- Widget: http://localhost:4000
- API health check: http://localhost:5000/health

Stop all three servers with `Ctrl+C`.

## How the course works

This is not a completed example application to read from top to bottom. It is a guided sequence of small experiments.

Each checkpoint follows the same learning loop:

1. The agent explains the browser mechanism in plain language.
2. You make a prediction about the expected behavior.
3. The agent applies one narrowly scoped change.
4. You inspect the diff and verify concrete evidence in the browser and DevTools.
5. The agent answers your questions and asks a few short understanding questions.
6. When you explicitly confirm that you are ready, the agent commits the completed checkpoint before opening the next one.

This keeps every mechanism isolated in Git history and prevents later changes from hiding what the current lesson demonstrated.

## Repository structure

```text
iframe-embed-course/
├── AGENTS.md                 # Teaching protocol and checkpoint router
├── agent-guide/
│   ├── checkpoints/          # One instruction file per checkpoint
│   ├── progress.md           # Current checkpoint and durable handoff
│   └── vocabulary.md         # Terms opened only when needed
├── apps/
│   ├── host/                 # Simulated customer website
│   ├── widget/               # Independently hosted iframe application
│   └── api/                  # Widget API and later token verification
├── scripts/
│   └── dev.mjs               # Starts all local services
└── package.json
```

## Course outline

The 19 checkpoints progress from the basic iframe model through cross-origin communication, responsive sizing, embed scripts, API authentication, browser security controls, production tradeoffs, and a final 15-question knowledge check.

Do not read or implement future checkpoints in advance. Their experiments are most useful when the result has not already been revealed.

## Scope

The core course uses plain HTML, CSS, JavaScript, and Node.js so that framework behavior does not hide browser fundamentals. React integration and automated browser testing are natural follow-up exercises after the core course is complete.

This repository is intended for local education. Development credentials, origins, and token flows introduced during later checkpoints must not be copied into production without an environment-specific security review.
