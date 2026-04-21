import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, company: 200, message: 4000 };

type Body = Partial<{
  name: string;
  email: string;
  company: string;
  message: string;
  company_website: string;
}>;

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Silent honeypot — return 200 so bots don't learn.
  if (clean(body.company_website, 500).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const {
    BREVO_API_KEY,
    CONTACT_TO,
    CONTACT_CC,
    CONTACT_FROM_EMAIL,
    CONTACT_FROM_NAME,
  } = process.env;

  if (
    !BREVO_API_KEY ||
    !CONTACT_TO ||
    !CONTACT_CC ||
    !CONTACT_FROM_EMAIL ||
    !CONTACT_FROM_NAME
  ) {
    console.error("[contact] missing required env vars");
    return NextResponse.json(
      { ok: false, error: "config" },
      { status: 500 },
    );
  }

  const timestamp = new Date().toISOString();
  const subjectCompany = company ? ` · ${company}` : "";
  const subject = `New contact form — ${name}${subjectCompany}`;

  const textContent = [
    `New submission from factorialsystems.io/about#contact`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company || "—"}`,
    ``,
    `Message:`,
    message,
    ``,
    `—`,
    `Submitted: ${timestamp}`,
    `Source:    /about#contact`,
  ].join("\n");

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; color: #0B1220;">
      <p style="color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px;">
        New submission — factorialsystems.io
      </p>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 24px;">
        <tr><td style="padding: 6px 0; color: #64748B; width: 100px;">Name</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #64748B;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #1F5FC0;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #64748B;">Company</td><td style="padding: 6px 0;">${escapeHtml(company || "—")}</td></tr>
      </table>
      <p style="color: #64748B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
      <div style="white-space: pre-wrap; line-height: 1.6; border-left: 3px solid #1F5FC0; padding: 4px 0 4px 16px; margin: 0 0 24px;">${escapeHtml(message)}</div>
      <p style="color: #94A3B8; font-size: 11px; margin: 0;">
        Submitted ${escapeHtml(timestamp)} · Source /about#contact
      </p>
    </div>
  `.trim();

  let res: Response;
  try {
    res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: CONTACT_FROM_EMAIL, name: CONTACT_FROM_NAME },
        to: [{ email: CONTACT_TO }],
        cc: [{ email: CONTACT_CC }],
        replyTo: { email, name },
        subject,
        htmlContent,
        textContent,
      }),
    });
  } catch (err) {
    console.error("[contact] brevo fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }

  if (!res.ok) {
    const snippet = await res.text().catch(() => "");
    console.error(
      `[contact] brevo non-2xx: ${res.status} ${res.statusText} — ${snippet.slice(0, 500)}`,
    );
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }

  const data = (await res.json().catch(() => null)) as
    | { messageId?: string }
    | null;
  if (data?.messageId) {
    console.log(`[contact] sent messageId=${data.messageId}`);
  }

  return NextResponse.json({ ok: true });
}
