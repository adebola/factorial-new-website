"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          company_website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean }
        | null;
      if (res.ok && data?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <p className="kicker text-[color:var(--color-mint)] mb-4">
          Message received
        </p>
        <h3 className="font-display text-2xl text-white mb-3 tracking-tight">
          Thanks — we&apos;ll reply within one business day.
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          If it&apos;s urgent, email{" "}
          <a
            href="mailto:info@factorialsystems.io"
            className="text-[color:var(--color-mint)] underline underline-offset-4"
          >
            info@factorialsystems.io
          </a>{" "}
          or call the numbers listed.
        </p>
      </div>
    );
  }

  const disabled = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
    >
      <p className="kicker text-white/50 mb-5">Start a conversation</p>

      <div className="space-y-4">
        <Field
          label="Your name"
          id="name"
          value={name}
          onChange={setName}
          required
          disabled={disabled}
          autoComplete="name"
        />
        <Field
          label="Work email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          disabled={disabled}
          autoComplete="email"
        />
        <Field
          label="Company"
          id="company"
          value={company}
          onChange={setCompany}
          disabled={disabled}
          autoComplete="organization"
        />
        <Field
          label="What are you looking to build?"
          id="message"
          value={message}
          onChange={setMessage}
          required
          disabled={disabled}
          textarea
        />
      </div>

      {/* Honeypot — hidden from real users, tempting to bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="mt-5 text-sm text-[#FCA5A5] leading-relaxed">
          Something went wrong on our end. Email{" "}
          <a
            href="mailto:info@factorialsystems.io"
            className="underline underline-offset-4"
          >
            info@factorialsystems.io
          </a>{" "}
          and we&apos;ll pick it up.
        </p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full bg-[color:var(--color-mint)] hover:bg-[#4fc8a6] disabled:opacity-60 disabled:cursor-not-allowed text-[color:var(--color-ink)] font-medium px-5 py-3 rounded-md transition-colors"
      >
        {disabled ? "Sending…" : "Send →"}
      </button>
      <p className="mt-3 text-xs text-white/40 leading-relaxed">
        We reply within one business day. No sales funnel, no drip sequence.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  textarea = false,
  required = false,
  disabled = false,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}) {
  const base =
    "w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[color:var(--color-mint)] disabled:opacity-60 transition-colors";
  return (
    <div>
      <label htmlFor={id} className="kicker text-white/50 mb-2 block">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
}
