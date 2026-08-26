"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import profile from "@content/profile.json";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No email backend is wired up yet — this opens a pre-filled mail client
    // as a working fallback. Swap this for a Resend/EmailJS call when ready;
    // see the README for where to plug in an API route.
    const subject = encodeURIComponent(`Portfolio contact from ${values.name || "a visitor"}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line dark:border-line-dark p-8">
        <CheckCircle2 className="h-6 w-6 text-accent-blue" strokeWidth={1.5} />
        <p className="text-sm text-ink dark:text-ink-dark">
          Your email client should have opened with the message pre-filled. If it didn&apos;t, email{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="meta-label mb-2 block">
            Name
          </label>
          <input
            id="name"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="focus-ring w-full rounded-xl border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-ink-dark"
          />
        </div>
        <div>
          <label htmlFor="email" className="meta-label mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="focus-ring w-full rounded-xl border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-ink-dark"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="meta-label mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="focus-ring w-full rounded-xl border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-ink-dark"
        />
      </div>
      <button
        type="submit"
        className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas dark:bg-ink-dark dark:text-canvas-dark hover:opacity-85"
      >
        Send message <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </form>
  );
}
