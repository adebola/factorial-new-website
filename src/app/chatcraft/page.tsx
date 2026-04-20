import Link from "next/link";
import Button from "@/components/Button";

export const metadata = {
  title: "ChatCraft — Our conversational AI platform",
  description:
    "ChatCraft is Factorial's conversational AI platform — production-grade retrieval, routing, guardrails, and agent handoff, deployed into your infrastructure.",
};

export default function ChatCraftPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] orb-mint opacity-50 pointer-events-none" />
        <div className="absolute top-60 -left-20 w-[360px] h-[360px] orb-azure opacity-40 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="rise-0 flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[color:var(--color-mint)]" />
                <span className="kicker text-[color:var(--color-factorial-600)]">
                  Product · Conversational AI platform
                </span>
              </div>
              <h1 className="rise-1 font-display text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-[color:var(--color-ink)]">
                ChatCraft.
                <br />
                <span className="text-[color:var(--color-slate)]">
                  Conversational AI,
                </span>
                <br />
                <span className="text-[color:var(--color-factorial-500)]">
                  built to stay in production.
                </span>
              </h1>
              <p className="rise-2 mt-8 text-lg md:text-xl text-[color:var(--color-slate)] max-w-2xl leading-relaxed">
                Most conversational AI demos die in the handoff from prototype
                to production. ChatCraft was built for the other side of that
                line — retrieval, routing, guardrails, and agent handoff as
                first-class primitives, not afterthoughts.
              </p>
              <div className="rise-3 mt-10 flex flex-wrap gap-3">
                <Button href="https://chatcraft.cc" external>
                  Try ChatCraft ↗
                </Button>
                <Button href="/about#contact" variant="secondary">
                  Book an implementation call
                </Button>
              </div>
            </div>

            <div className="rise-4 md:col-span-4 md:pb-4">
              <div className="bg-white border border-hair rounded-2xl p-6">
                <p className="kicker text-[color:var(--color-slate-soft)] mb-4">
                  Deployment profile
                </p>
                <dl className="space-y-3 text-sm">
                  <DeployRow label="Channels" value="Chat · Voice · WhatsApp" />
                  <DeployRow label="Hosting" value="Cloud · On-prem · Hybrid" />
                  <DeployRow label="Compliance" value="NDPR · Tenant isolation" />
                  <DeployRow label="Integrations" value="REST · Kafka · Core banking" />
                  <DeployRow label="SLA" value="99.5% · 24×7 support" last />
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 md:py-32 bg-[color:var(--color-fog-soft)] border-y border-hair">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
              /01 — Capabilities
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-[color:var(--color-ink)]">
              What ChatCraft does, out of the box.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-hair rounded-2xl p-7 hover:border-[color:var(--color-factorial-200)] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: `${f.color}15` }}
                >
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ background: f.color }}
                  />
                </div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /02 — Use cases
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Where it earns its keep.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-6">
              <p className="text-lg text-[color:var(--color-slate)] leading-relaxed">
                ChatCraft is not a chatbot toy. It replaces the Tier-1 of your
                operations org, routes everything else to humans with context,
                and leaves audit trails your compliance team can actually sign.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {USE_CASES.map((u, i) => (
              <div
                key={u.title}
                className="group grid md:grid-cols-12 gap-6 border-t border-hair py-8 hover:bg-[color:var(--color-fog-soft)] transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-[color:var(--color-slate-soft)]">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl font-medium text-[color:var(--color-ink)] tracking-tight">
                    {u.title}
                  </h3>
                  <p className="mt-1 kicker text-[color:var(--color-slate-soft)]">
                    {u.sector}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[color:var(--color-slate)] leading-relaxed">
                    {u.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <section className="relative py-24 md:py-32 bg-[color:var(--color-ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
        <div className="absolute top-20 right-10 w-[400px] h-[400px] orb-blue opacity-50 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <p className="kicker text-[color:var(--color-mint)] mb-4">
              /03 — Architecture
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Designed for the stack you already run.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
            {LAYERS.map((l, i) => (
              <div
                key={l.layer}
                className={`p-6 md:p-8 ${
                  i < LAYERS.length - 1 ? "md:border-r border-white/10" : ""
                } ${i < LAYERS.length - 1 ? "border-b md:border-b-0" : ""}`}
              >
                <p className="kicker text-[color:var(--color-mint)] mb-4">
                  Layer /0{i + 1}
                </p>
                <h3 className="font-display text-xl font-medium mb-3 tracking-tight">
                  {l.layer}
                </h3>
                <ul className="space-y-2 text-sm text-white/60">
                  {l.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-2">
                      <span className="text-[color:var(--color-mint)]">·</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/50 max-w-3xl leading-relaxed">
            Deploy into your VPC. BYO model provider (Anthropic, OpenAI, local
            Ollama). Integrate with the systems you already run — not the ones
            we wish you did.
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-[400px] h-[400px] orb-mint opacity-30 pointer-events-none" />
        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
            Ship a conversational AI system
            <br />
            your ops team actually wants.
          </h2>
          <p className="mt-6 text-lg text-[color:var(--color-slate)] max-w-xl mx-auto">
            30-minute call. We&apos;ll look at your workflows, tell you what
            ChatCraft can handle, and what needs custom work.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/about#contact">Book a call →</Button>
            <Button
              href="https://chatcraft.cc"
              external
              variant="secondary"
            >
              Visit chatcraft.cc ↗
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function DeployRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 pb-3 ${
        last ? "" : "border-b border-hair"
      }`}
    >
      <dt className="kicker text-[color:var(--color-slate-soft)]">{label}</dt>
      <dd className="text-sm text-[color:var(--color-ink)] text-right font-medium">
        {value}
      </dd>
    </div>
  );
}

const FEATURES = [
  {
    title: "Retrieval over your data",
    desc: "Hybrid vector + keyword retrieval across policies, knowledge bases, CRM history, and operational data. Fresh results, citations included.",
    color: "#1F5FC0",
  },
  {
    title: "Guardrails that hold",
    desc: "Topic boundaries, PII redaction, prompt-injection resistance, and regulated-industry constraints enforced at the orchestration layer.",
    color: "#2BA5DE",
  },
  {
    title: "Human handoff, designed",
    desc: "Not a fallback — a first-class flow. Hand to an agent with full context, draft responses, and SLA routing. Ops teams actually like it.",
    color: "#5DD3B3",
  },
  {
    title: "Multi-channel",
    desc: "One conversation fabric across web chat, voice, WhatsApp, and internal Slack — with channel-aware tone and compliance.",
    color: "#143D80",
  },
  {
    title: "Audit and observability",
    desc: "Every conversation, every tool call, every decision is logged, traced, and replayable. Your compliance team will approve.",
    color: "#1F5FC0",
  },
  {
    title: "BYO model provider",
    desc: "Anthropic, OpenAI, or locally-hosted Ollama. Swap providers per workload, with cost and latency visibility built-in.",
    color: "#2BA5DE",
  },
];

const USE_CASES = [
  {
    title: "Tier-1 customer support",
    sector: "Banking · Insurance · Telco",
    desc: "Deflect 40–70% of repetitive tickets — balance enquiries, policy changes, status lookups — with guardrailed retrieval over your own systems. Hand to a human the moment it's out of scope.",
  },
  {
    title: "Agent copilot",
    sector: "Contact centers",
    desc: "Sit beside your agents. Draft responses, summarise history, surface the right policy clause, auto-fill after-call notes. Agents stay in control; ChatCraft handles the grind.",
  },
  {
    title: "Internal knowledge",
    sector: "Operations · HR · Legal",
    desc: "A single retrieval layer across SOPs, contracts, and institutional knowledge. Employees ask in natural language; ChatCraft answers with citations to the source document.",
  },
  {
    title: "Regulated intake",
    sector: "Public sector · Healthcare",
    desc: "Structured intake with dynamic follow-up — ChatCraft asks only what's needed, validates in real time, and routes completed files into your case management system.",
  },
];

const LAYERS = [
  {
    layer: "Conversation",
    items: ["Chat · voice · WhatsApp", "Session management", "Tone & persona"],
  },
  {
    layer: "Orchestration",
    items: ["Guardrails", "Tool routing", "Human handoff logic"],
  },
  {
    layer: "Retrieval",
    items: ["Vector + keyword", "Freshness policy", "Per-tenant isolation"],
  },
  {
    layer: "Integrations",
    items: ["REST · GraphQL · Kafka", "Core banking / ERP", "NIBSS · BVN · SSO"],
  },
];
