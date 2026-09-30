"use client";

import { useRef, useState } from "react";

/* Ticket alert signup on the /live poster. Posts to the giles-engine worker
   (POST /subscribe), which writes the D1 `subscribers` table with
   source "live", the same list as /list. Honeypot plus the worker's rate
   limit; no third-party scripts. The button locks while a request is in
   flight and the worker treats a repeat email as a no-op. */
const SUBSCRIBE_ENDPOINT =
  process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT ??
  "https://giles-engine.gileslamb.workers.dev/subscribe";

export function TicketAlertForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const inFlight = useRef(false);
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (inFlight.current) return;
    setError("");
    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError("A valid email, please.");
      setState("error");
      return;
    }
    inFlight.current = true;
    setState("sending");
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: "live", website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setState("done");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again in a moment.");
      setState("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (state === "done") {
    return (
      <p className="gig-alert-done" role="status">
        Thanks. You&rsquo;ll hear first when tickets go on sale.
      </p>
    );
  }

  return (
    <form className="gig-alert" onSubmit={handleSubmit} noValidate>
      <label htmlFor="gig-alert-email" className="gig-alert-label">
        Be first to hear when tickets go on sale
      </label>
      {/* Honeypot: hidden from people and screen readers, filled by bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="gig-alert-website">Website</label>
        <input
          id="gig-alert-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="gig-alert-row">
        <input
          id="gig-alert-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="gig-alert-input"
        />
        <button
          type="submit"
          className="gig-alert-submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Sending" : "Notify me"}
        </button>
      </div>
      {error && (
        <p className="gig-alert-error" role="alert">
          {error}
        </p>
      )}
      <p className="gig-alert-consent">
        Occasional emails about live dates and new releases. Unsubscribe any time.
      </p>
    </form>
  );
}
