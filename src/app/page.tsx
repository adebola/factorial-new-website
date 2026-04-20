import Link from "next/link";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[color:var(--color-paper)]">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        {/* Gradient orbs for atmosphere */}
        <div className="absolute top-20 -right-32 w-[480px] h-[480px] orb-azure pointer-events-none" />
        <div className="absolute top-40 -left-20 w-[300px] h-[300px] orb-mint opacity-60 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-24 md:pb-36">
          <div className="max-w-4xl">
            <div className="rise-0 flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[color:var(--color-factorial-500)]" />
              <span className="kicker text-[color:var(--color-factorial-600)]">
                Conversational AI · Workflow automation · Lagos
              </span>
            </div>

            <h1 className="rise-1 font-display text-5xl md:text-7xl lg:text-[88px] font-medium leading-[1.02] tracking-[-0.03em] text-[color:var(--color-ink)]">
              Enterprise AI,
              <br />
              <span className="relative inline-block">
                shipped
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: "0.3em" }}
                >
                  <path
                    d="M2 8 Q 55 2, 110 6 T 218 4"
                    stroke="url(#heroUnderline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="heroUnderline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#5DD3B3" />
                      <stop offset="100%" stopColor="#2BA5DE" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              — not pitched.
            </h1>

            <p className="rise-2 mt-8 text-lg md:text-xl text-[color:var(--color-slate)] max-w-2xl leading-relaxed">
              Conversational AI that plugs into your systems, automates
              workflows, and completes real business operations — anchored by{" "}
              <Link
                href="/chatcraft"
                className="text-[color:var(--color-factorial-500)] underline decoration-[color:var(--color-factorial-200)] underline-offset-4 hover:decoration-[color:var(--color-factorial-500)]"
              >
                ChatCraft
              </Link>
              , our conversational AI platform.
            </p>

            <div className="rise-3 mt-10 flex flex-wrap items-center gap-3">
              <Button href="/about#contact">Book a demo →</Button>
              <Button href="/chatcraft" variant="secondary">
                Explore ChatCraft
              </Button>
            </div>

            <div className="rise-4 mt-14 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[color:var(--color-mint)] shimmer" />
                <span className="kicker text-[color:var(--color-slate)]">
                  System online · ChatCraft v2.0
                </span>
              </div>
              <span className="text-[color:var(--color-slate-soft)]/40">|</span>
              <span className="kicker text-[color:var(--color-slate-soft)]">
                15+ years of engineering DNA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICE PILLARS ============ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /01 — What we do
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-[color:var(--color-ink)]">
                Four disciplines. One shipping mindset.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-10">
              <p className="text-lg text-[color:var(--color-slate)] leading-relaxed">
                We don&apos;t do decks. We design systems, write the code, deploy
                into your infrastructure, and stay to operate them. The four
                disciplines below usually ship together.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="group relative bg-white border border-hair rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-[color:var(--color-factorial-200)] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs text-[color:var(--color-slate-soft)]">
                    /{s.num}
                  </span>
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: s.swatch }}
                  >
                    <span className="w-3 h-3 rounded-sm bg-white/80" />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium text-[color:var(--color-ink)] mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-[color:var(--color-slate)] leading-relaxed">
                  {s.desc}
                </p>
                <ul className="mt-6 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-baseline gap-2 text-sm text-[color:var(--color-slate-soft)]"
                    >
                      <span className="text-[color:var(--color-factorial-500)]">
                        ·
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-factorial-500)] hover:text-[color:var(--color-factorial-700)]"
            >
              See full services breakdown
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FROM CONVERSATION TO ACTION ============ */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-fog-soft)] border-y border-hair overflow-hidden">
        <div className="absolute top-20 -right-10 w-[380px] h-[380px] orb-mint opacity-40 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 md:sticky md:top-28">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /02 — From conversation to action
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] leading-[1.05] text-[color:var(--color-ink)]">
                Chat isn&apos;t the product.
                <br />
                The outcome is.
              </h2>
              <p className="mt-6 text-lg text-[color:var(--color-slate)] leading-relaxed">
                A customer asks a question. Our systems retrieve the right
                data, evaluate against policy, execute the operation, and
                report back — in one exchange. Here&apos;s the shape of a real
                flow.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="bg-white border border-hair rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-hair">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-mint)]" />
                    <span className="kicker text-[color:var(--color-slate)]">
                      chatcraft · banking · loan-top-up
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[color:var(--color-slate-soft)]">
                    trace: fs-tx-8842
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex justify-end mb-6">
                    <div className="max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed bg-[color:var(--color-factorial-500)] text-white">
                      Am I eligible for a top-up loan?
                    </div>
                  </div>

                  <ol className="space-y-5">
                    {FLOW_STEPS.map((step) => (
                      <li key={step.num} className="flex gap-4">
                        <span className="font-mono text-xs text-[color:var(--color-slate-soft)] pt-1 shrink-0 w-8">
                          /{step.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[color:var(--color-ink)]">
                            {step.label}
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-[color:var(--color-slate)] break-all">
                            {step.call}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8 pt-6 border-t border-hair flex justify-start">
                    <div className="max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed bg-[color:var(--color-fog)] text-[color:var(--color-ink)] border border-hair">
                      You&apos;re pre-approved for ₦250k over 12 months.
                      I&apos;ve queued the application — ops will confirm
                      within 1 business day.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POWERED BY CHATCRAFT ============ */}
      <section className="relative bg-[color:var(--color-ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
        <div className="absolute top-10 right-10 w-[500px] h-[500px] orb-azure opacity-50 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] orb-mint opacity-30 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 md:sticky md:top-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[color:var(--color-mint)]" />
                <span className="kicker text-[color:var(--color-mint)]">
                  /03 — Powered by ChatCraft
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em]">
                ChatCraft: the engine behind every deployment.
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                Our conversational AI platform — with retrieval, guardrails,
                human handoff, and integrations as first-class primitives, not
                demo features. It&apos;s what turns a conversation into a
                completed operation: premium deferral, receipt resend, loan
                application, ticket resolution.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/chatcraft">
                  ChatCraft overview →
                </Button>
                <Button
                  href="https://chatcraft.cc"
                  variant="secondary"
                  external
                  className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10"
                >
                  Visit chatcraft.cc ↗
                </Button>
              </div>
            </div>

            {/* Mock conversation UI */}
            <div className="md:col-span-7">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-mint)]" />
                    <span className="kicker text-white/60">
                      chatcraft · support · live
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40">
                    v2.0.1
                  </span>
                </div>
                <div className="p-6 md:p-8 space-y-5">
                  <ConvoLine role="user">
                    Can I defer my insurance premium by 30 days? Policy FS-0411.
                  </ConvoLine>
                  <ConvoLine role="assistant">
                    Yes — your policy qualifies for a 30-day deferral (premium
                    N18,500, grace period active). I&apos;ve drafted the request;
                    your agent will approve before 15:00.
                    <span className="block mt-3 pt-3 border-t border-white/10 font-mono text-[11px] text-white/50">
                      action: defer_request → route: ops.agent_queue
                    </span>
                  </ConvoLine>
                  <ConvoLine role="user">
                    Also — resend the last receipt to my email.
                  </ConvoLine>
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="flex gap-1">
                      <Dot />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </span>
                    <span className="kicker">Drafting response</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-white/10 text-center">
                  <Stat label="Resolved/day" value="1.4k" />
                  <Stat label="Avg latency" value="820ms" />
                  <Stat label="Accuracy" value="94.2%" last />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /04 — How we work
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-[color:var(--color-ink)]">
                Four phases. No handoff to &ldquo;delivery.&rdquo;
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-10">
              <p className="text-lg text-[color:var(--color-slate)] leading-relaxed">
                Same team from first call to production operations. Each phase
                has a definition of done you can point to — no rolling scope,
                no surprise statements of work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PHASES.map((p) => (
              <div
                key={p.num}
                className="bg-white border border-hair rounded-2xl p-6 md:p-7 transition-colors hover:border-[color:var(--color-factorial-200)]"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-[color:var(--color-slate-soft)]">
                    /{p.num}
                  </span>
                  <span className="font-mono text-[10px] text-[color:var(--color-factorial-600)] bg-[color:var(--color-factorial-50)] px-2 py-0.5 rounded">
                    {p.duration}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-factorial-500)] hover:text-[color:var(--color-factorial-700)]"
            >
              See how engagements run
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITY MARKERS ============ */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CAPABILITIES.map((c) => (
              <div
                key={c.label}
                className="border-t border-[color:var(--color-ink)] pt-5"
              >
                <p className="font-display text-4xl md:text-5xl font-medium text-[color:var(--color-ink)] tracking-tight">
                  {c.value}
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-slate)] leading-snug">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BUILT FOR REGULATED ENVIRONMENTS ============ */}
      <section className="py-24 md:py-32 bg-[color:var(--color-fog-soft)] border-y border-hair">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /05 — Built for regulated environments
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-[color:var(--color-ink)]">
                Why banks and public-sector buyers trust the stack.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-10">
              <p className="text-lg text-[color:var(--color-slate)] leading-relaxed">
                Regulated industries don&apos;t reward AI novelty — they reward
                systems that audit cleanly, isolate tenants, and keep running
                through bad weeks. We engineer for that first.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TRUST_CARDS.map((t) => (
              <div
                key={t.title}
                className="bg-white border border-hair rounded-2xl p-7 md:p-8"
              >
                <p className="kicker text-[color:var(--color-slate-soft)] mb-4">
                  {t.kicker}
                </p>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] mb-3 tracking-tight leading-snug">
                  {t.title}
                </h3>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed mb-5">
                  {t.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-[color:var(--color-fog)] text-[color:var(--color-slate)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASE TEASERS ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="kicker text-[color:var(--color-factorial-500)] mb-3">
                /06 — Selected work
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[color:var(--color-ink)]">
                Systems we&apos;ve shipped.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-factorial-500)]"
            >
              All case studies →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {CASES.map((c) => (
              <Link
                key={c.id}
                href="/work"
                className="group bg-white border border-hair rounded-2xl p-7 transition-all hover:border-[color:var(--color-factorial-300)] hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="kicker text-[color:var(--color-slate-soft)]">
                    {c.sector}
                  </span>
                  <span className="font-mono text-xs text-[color:var(--color-slate-soft)]">
                    {c.id}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed mb-6">
                  {c.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-[color:var(--color-fog)] text-[color:var(--color-slate)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[color:var(--color-ink)] text-white">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none opacity-60" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] orb-azure opacity-40 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] orb-mint opacity-25 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 text-center">
          <p className="kicker text-[color:var(--color-mint)] mb-5">
            /07 — Let&apos;s build
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
            Ready to ship something
            <br />
            that actually runs in production?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
            Book a 30-minute call. We&apos;ll listen first, then tell you
            honestly whether we&apos;re the right team for what you&apos;re
            trying to build.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/about#contact">Book a demo →</Button>
            <Button
              href="mailto:info@factorialsystems.io"
              variant="secondary"
              className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10"
            >
              info@factorialsystems.io
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ========== Supporting bits ========== */

function ConvoLine({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-[color:var(--color-factorial-500)] text-white"
            : "bg-white/[0.06] text-white border border-white/10"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-white/40 shimmer"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function Stat({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div className={`py-5 ${last ? "" : "border-r border-white/10"}`}>
      <p className="font-display text-2xl font-medium text-white tracking-tight">
        {value}
      </p>
      <p className="kicker text-white/40 mt-1">{label}</p>
    </div>
  );
}

/* ========== Content ========== */

const SERVICES = [
  {
    num: "01",
    title: "Conversational AI",
    desc: "Custom AI assistants for customer support, internal knowledge, and agent-operated workflows. Built on ChatCraft or tailored end-to-end.",
    bullets: [
      "Retrieval-augmented generation over your data",
      "Voice and chat channels, including WhatsApp",
      "Guardrails, routing, and human handoff",
    ],
    swatch: "#1F5FC0",
  },
  {
    num: "02",
    title: "Workflow automation",
    desc: "Process orchestration that replaces manual handoffs — document review, approvals, data reconciliation, and operational reporting.",
    bullets: [
      "AI-in-the-loop process design",
      "Event-driven microservices on JVM or Python",
      "Observable, auditable, compliance-ready",
    ],
    swatch: "#2BA5DE",
  },
  {
    num: "03",
    title: "Integration engineering",
    desc: "Wiring AI and automation into the systems you already run — core banking, ERP, CRM, legacy mainframes, NIBSS, public-sector APIs.",
    bullets: [
      "Spring Boot, FastAPI, Node — whatever fits",
      "OAuth2 / JWT / Keycloak, Kafka, MinIO",
      "On-prem, hybrid, or GKE / AWS / Azure",
    ],
    swatch: "#143D80",
  },
  {
    num: "04",
    title: "Platform operations",
    desc: "We don't deploy and disappear. Managed hosting, monitoring, tuning, and ongoing optimization — a long-term operating partner.",
    bullets: [
      "SRE-grade monitoring and on-call",
      "Model tuning and prompt regression tests",
      "Quarterly reviews with engineering leadership",
    ],
    swatch: "#5DD3B3",
  },
];

const FLOW_STEPS = [
  {
    num: "01",
    label: "Retrieve",
    call: "customer.profile · accounts.balance · loans.history",
  },
  {
    num: "02",
    label: "Evaluate",
    call: "credit.score(customer_id) → 712 · policy.check(product=top_up)",
  },
  {
    num: "03",
    label: "Act",
    call: "loans.initiate(amount=250_000, tenor=12) → queued: ops.review",
  },
  {
    num: "04",
    label: "Respond",
    call: "reply(channel=whatsapp) · audit(trace=fs-tx-8842)",
  },
];

const PHASES = [
  {
    num: "01",
    title: "Discover",
    duration: "1–2 wks",
    desc: "Workflow mapping, data access, success metrics, and an honest buy-vs-build call.",
  },
  {
    num: "02",
    title: "Design",
    duration: "2–3 wks",
    desc: "Architecture, API contracts, security review, and a cost model in your currency.",
  },
  {
    num: "03",
    title: "Build",
    duration: "6–16 wks",
    desc: "Iterative delivery, fortnightly milestones, stakeholder standups. No surprise demos.",
  },
  {
    num: "04",
    title: "Operate",
    duration: "ongoing",
    desc: "Managed ops, incident response, model tuning, quarterly engineering reviews.",
  },
];

const TRUST_CARDS = [
  {
    kicker: "Architecture",
    title: "Hybrid, event-driven, auditable.",
    desc: "On-prem, cloud, or split — with the same control plane. Event-driven cores mean every action is observable, replayable, and explainable.",
    tags: ["APISIX", "Spring Boot", "Kafka", "pgvector", "Kubernetes"],
  },
  {
    kicker: "Security",
    title: "Tenant isolation first, not bolted on.",
    desc: "Per-tenant data boundaries, PII redaction, prompt-injection guardrails, and full conversation replay. SSO and on-prem where policy demands.",
    tags: ["GDPR", "OAuth2", "SSO", "PII redaction", "On-prem"],
  },
  {
    kicker: "Industries",
    title: "Regulated sectors are our home ground.",
    desc: "We build where compliance, uptime, and integration complexity are hard requirements — not afterthoughts bolted onto a consumer stack.",
    tags: [
      "Banking",
      "Microfinance",
      "Identity",
      "Insurance",
      "Manufacturing",
      "Public sector",
    ],
  },
];

const CAPABILITIES = [
  { value: "15+", label: "Years of enterprise engineering across the team" },
  { value: "4", label: "Active industries we build in today" },
  { value: "24×7", label: "Operational coverage from Lagos" },
  { value: "100%", label: "Projects delivered end-to-end, never hand-waved" },
];

const CASES = [
  {
    id: "FS-021",
    sector: "Identity infrastructure",
    title: "National identity API gateway — architected for scale.",
    summary:
      "Solutions architecture for the API Gateway subsystem of a national identity management program — hybrid on-prem / GKE deployment, APISIX, full operational cost model in NGN.",
    tags: ["APISIX", "GKE", "Hybrid cloud"],
  },
  {
    id: "FS-018",
    sector: "Banking · microfinance",
    title: "Core banking for rural microfinance operators.",
    summary:
      "Offline-first core banking platform with XGBoost-based credit scoring, NIBSS payment integration, and a branch-agnostic loan workflow — built for operators serving Nigeria's underbanked.",
    tags: ["Spring Boot", "XGBoost", "NIBSS"],
  },
  {
    id: "FS-014",
    sector: "Manufacturing · distribution",
    title: "Cement distributor ERP — Odoo plus custom portal.",
    summary:
      "ERP backbone on Odoo Community paired with a custom React &amp; Spring Boot portal for dealers, payments, and dispatch — cutting order-to-delivery reconciliation time by over 60%.",
    tags: ["Odoo", "React", "Spring Boot"],
  },
];
