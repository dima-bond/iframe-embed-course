# Vocabulary

Open only the entries relevant to the current checkpoint.

## Browsing context

An independent environment in which the browser displays and runs a document. A tab has a top-level browsing context; an iframe creates a nested one.

## Origin

The tuple `scheme + hostname + port`. `http://localhost:3000` and `http://localhost:4000` are different origins because their ports differ.

## Same-Origin Policy

A browser rule that prevents documents from different origins from freely reading or modifying each other's sensitive state, including DOM and storage.

## iframe

An HTML element that embeds another document in a nested browsing context. The iframe document keeps its own URL, DOM, JavaScript runtime, navigation, and origin.

## Embed script

A script distributed by a widget provider for insertion on a customer's page. It usually reads configuration, creates the iframe, and manages communication and lifecycle.

## postMessage

A browser API for deliberately exchanging structured messages between windows, including a parent page and an iframe, even across origins.

## CORS

HTTP response headers that tell a browser whether JavaScript from one origin may read a response from another origin. CORS does not grant DOM access to an iframe.

## CSP frame-ancestors

A response policy sent by the framed application that controls which parent origins are allowed to embed it.

## sandbox

An iframe attribute set by the parent that removes capabilities from the embedded document and selectively restores named capabilities.

## Embed token

A short-lived, signed value that lets the API verify client identity and permitted context without trusting editable query parameters.

## Third-party cookie

A cookie used while its site is embedded under a different top-level site. Browser restrictions make it an unreliable foundation for embedded authentication.

