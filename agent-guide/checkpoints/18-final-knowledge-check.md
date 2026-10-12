# Checkpoint 18: Final Knowledge Check

Purpose: test whether the learner can retrieve and connect the mechanisms without rereading the implementation.

## How to run the check

- Tell the learner there are 15 short questions.
- Ask exactly one question at a time. Do not reveal later questions or expected answers.
- Wait for the answer, then evaluate the idea rather than exact terminology.
- If correct, confirm and add only an important missing nuance.
- If incomplete, name what was correct and explain the missing part simply.
- If incorrect, correct the model directly with a small example.
- Ask at most one follow-up when a central misconception remains.
- After feedback, ask whether the learner is ready for the next question.
- Privately track every initially incomplete, incorrect, or absent topic for the final evaluation.
- Do not use points, percentages, or numeric scoring.

## Questions and expected understanding

### 1. What is an iframe?

Ask: “Is an iframe inserted HTML or a separate document, and what does it keep independently?”

Expected: nested browsing context; separate URL, DOM, JavaScript environment, navigation, and origin.

### 2. What makes an origin?

Ask: “Why are `localhost:3000` and `localhost:4000` different origins?”

Expected: origin is scheme + hostname + port; the ports differ.

### 3. Why can't the host read widget DOM?

Ask: “The host can display the widget, so why can it not read the widget's `<h1>`?”

Expected: embedding is not read permission; Same-Origin Policy blocks cross-origin DOM inspection.

### 4. What does postMessage change?

Ask: “How can host and iframe cooperate without removing the origin boundary?”

Expected: deliberate structured messages between window references; no shared DOM access.

### 5. How is a message validated?

Ask: “Which checks should happen before the host acts on a message?”

Expected: expected `event.origin`, exact `event.source`, object/schema/type, payload types and bounds, protocol version when used.

### 6. Why doesn't height auto work?

Ask: “Why doesn't host CSS `height: auto` fit a cross-origin iframe to its inner content?”

Expected: inner document does not participate in parent layout and the parent cannot measure its cross-origin DOM.

### 7. How does dynamic height work?

Ask: “Trace the resize flow from widget content change to the iframe element changing height.”

Expected: widget observes/measures itself, posts height, host validates/clamps, host changes its own iframe element.

### 8. Why use an embed script?

Ask: “What does provider-owned `embed.js` improve over giving customers a raw iframe?”

Expected: stable integration API; central iframe creation, config, messaging, lifecycle, upgrades; smaller customer snippet.

### 9. What is safe in query parameters?

Ask: “Which configuration belongs in iframe URL parameters, and why is a client ID there untrusted?”

Expected: non-secret startup config such as theme/locale; browser-visible/editable values do not prove identity.

### 10. What does CORS do?

Ask: “What does CORS permit, and which iframe/security problems does it not solve?”

Expected: permits browser JavaScript from named origins to read cross-origin responses; not authentication, DOM access, frame authorization, or complete CSRF protection.

### 11. Why is clientId not authentication?

Ask: “Why can't the API trust `clientId` from HTML, URL, header, or request body?”

Expected: all are controlled/replayable by browser user; identifier has no integrity evidence.

### 12. What does the signed token prove?

Ask: “What stays secret, what reaches the browser, and how does the API determine client identity?”

Expected: server signing/partner secrets remain server-side; short-lived token reaches browser; API verifies signature and claims, then derives identity.

### 13. Why check token claims too?

Ask: “Why is a valid signature insufficient by itself?”

Expected: authentic token may be expired, for wrong audience/purpose/origin; claims constrain reuse and lifetime.

### 14. Compare the browser controls

Ask: “Compare Same-Origin Policy, CORS, `frame-ancestors`, and iframe `sandbox` in one sentence each.”

Expected: SOP limits cross-origin access; CORS authorizes response reading; frame-ancestors controls who may frame; sandbox removes/restores iframe capabilities.

### 15. Trace the complete architecture

Ask: “From the customer's script tag to an authorized API response, who owns each major step?”

Expected: customer provides mount/config; embed script builds and manages iframe; host backend obtains token; widget handles UI/messages/API call; API validates and authorizes.

## Course completion

After Question 15 and its feedback, show this heading exactly once:

# Congratulations! You completed Iframes and Embed Scripts.

Then give an evidence-based evaluation:

```md
**Overall understanding: [Strong / Solid / Developing]**

**Explained confidently:** [two or three concrete mechanisms]

**Worth revisiting:**
- [every initially incomplete, incorrect, or absent topic, consolidated without losing the missing distinction]

**Corrected during the discussion:** [important misconception now clarified; omit if none]
```

Use **Strong understanding** when mechanisms and relationships were independently clear, **Solid understanding** when the main flow was clear but important distinctions needed prompting, and **Developing understanding** when foundational boundaries remain unclear.

Do not add another required checkpoint. Offer only optional next directions: React wrapper design, automated cross-origin browser tests, multi-tenant key rotation, or production deployment behind real domains.
