# Checkpoint 14: Restrict What the Iframe May Do

## Theory to teach first

The parent can add `sandbox` to remove iframe capabilities. An empty sandbox is highly restrictive; individual tokens restore specific abilities such as scripts or forms.

This is a capability boundary, not a replacement for trusted code, message validation, CSP, or API authorization. Warn about the dangerous combination of `allow-scripts` and `allow-same-origin` for same-origin content controlled by the framed page: under some setups it can undermine sandbox intent.

Prediction: ask what an empty `sandbox` should do to the widget's interactive JavaScript.

## Scoped change

- Let `embed.js` add an initially restrictive sandbox.
- Observe which current widget behavior breaks.
- Restore only the tokens required by the current feature set, with a comment explaining each token.
- Add one harmless capability experiment, such as a form or attempted popup, and prove the ungranted behavior is blocked.
- Remove the experiment after the lesson unless it remains useful as a named test fixture.

## Evidence

- Compare console behavior before and after the needed sandbox token.
- List current tokens and map each to a real feature requirement.
- Prove an unneeded capability remains unavailable.

## Understanding questions

1. Does `sandbox="allow-scripts"` mean all normal browser capabilities are restored?
2. Should the provider or customer add permissions “just in case”?
3. How is sandbox different from the API's token verification?

Commit after approval: `feat: sandbox embedded widget`.

Next: [Checkpoint 15](15-embed-lifecycle.md)

