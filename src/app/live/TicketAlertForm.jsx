"use client";

import { useState } from "react";

/* Ticket alert signup on the /live poster. Posts to the site's /api/list
   endpoint; `tag` adds an extra Kit tag (allowlisted in the route). */
export function TicketAlertForm({ tag }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), tag }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setState("done");
    } catch (err) {
      setError(err instanceof Error && err.message.startsWith("A valid")
        ? err.message
        : "Something went wrong. Try again in a moment.");
      setState("error");
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
