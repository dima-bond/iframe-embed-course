# Checkpoint 9: Call a Cross-Origin API

## Theory to teach first

The widget script runs with the widget origin, even when displayed on the host page. A fetch from `localhost:4000` to `localhost:5000` is therefore cross-origin.

Same-Origin Policy prevents JavaScript from reading an unauthorized cross-origin response. CORS is the API's HTTP-level permission for selected caller origins. It does not authenticate the caller, grant iframe DOM access, or protect against all request sending.

Explain simple requests and preflight at a high level: some method/header combinations make the browser send `OPTIONS` first to ask permission.

Prediction: ask which origin the API sees as the browser caller: host `3000` or widget `4000`.

## Scoped change

- Add a small recommendation endpoint to the API.
- Fetch it from the widget after terrain selection.
- First observe the browser CORS failure with no permission header.
- Then allow only the widget origin and make the request readable.
- Keep API error handling explicit: network rejection differs from an HTTP error response.

## Evidence

- Inspect the request `Origin` and response CORS headers.
- Show the initial blocked result and the corrected result.
- Make the API return one non-2xx case and handle `response.ok` explicitly.

## Understanding questions

1. Why is the request origin `4000` rather than `3000`?
2. What permission does CORS grant, and what does it not grant?
3. Why does `fetch()` not reject automatically for every HTTP 4xx/5xx response?

Commit after approval: `feat: connect widget to api`.

Next: [Checkpoint 10](10-break-naive-client-identity.md)
