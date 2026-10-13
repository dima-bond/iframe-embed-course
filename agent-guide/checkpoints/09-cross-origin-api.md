# Checkpoint 9: Call a Cross-Origin API

## Theory to teach first

The widget script runs with the widget origin, even when displayed on the host page. A fetch from `localhost:4000` to the default API at `localhost:5050` is therefore cross-origin.

The port number is configuration, not the lesson. Before editing, confirm which API URL the running server printed. If the default port was occupied, use the selected `COURSE_API_PORT` consistently in one clearly named widget-side API origin constant. Do not ask the learner to disable an unrelated operating-system service merely to preserve port `5050`.

Same-Origin Policy prevents JavaScript from reading an unauthorized cross-origin response. CORS is the API's HTTP-level permission for selected caller origins. It does not authenticate the caller, grant iframe DOM access, or protect against all request sending.

Explain simple requests and preflight at a high level: some method/header combinations make the browser send `OPTIONS` first to ask permission.

Prediction: ask which origin the API sees as the browser caller: host `3000` or widget `4000`.

## Scoped change

- Add a small recommendation endpoint to the API.
- Define the widget's API origin once and use the actual running API port rather than scattering a numeric port through request code.
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
