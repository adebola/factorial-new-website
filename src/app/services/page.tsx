import Button from "@/components/Button";

export const metadata = {
  title: "Services — Conversational AI, workflow automation, integration, ops",
  description:
    "Four disciplines Factorial delivers: conversational AI, workflow automation, integration engineering, and platform operations. How we engage, what we charge, and what you can expect.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] orb-blue opacity-40 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
          <div className="rise-0 flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[color:var(--color-factorial-500)]" />
            <span className="kicker text-[color:var(--color-factorial-600)]">
              Services · Four disciplines
            </span>
          </div>
          <h1 className="rise-1 font-display text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-4xl">
            We design, build, integrate, and operate — the full implementation arc.
          </h1>
          <p className="rise-2 mt-8 text-lg md:text-xl text-[color:var(--color-slate)] max-w-2xl leading-relaxed">
            Most engagements touch at least two of the four disciplines below.
            We scope them as a combined shipping plan, not a menu of line items.
          </p>
        </div>
      </section>

      {/* ===== SERVICE DETAILS ===== */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-20">
          {DETAILED_SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="grid md:grid-cols-12 gap-10 border-t border-hair pt-16"
            >
              <div className="md:col-span-5">
                <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                  /{s.num}
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
                  {s.title}
                </h2>
                <p className="mt-5 text-lg text-[color:var(--color-slate)] leading-relaxed">
                  {s.lead}
                </p>
              </div>

              <div className="md:col-span-7 space-y-8">
                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-4">
                    What we deliver
                  </p>
                  <ul className="space-y-3">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-[color:var(--color-ink)]"
                      >
                        <span className="text-[color:var(--color-factorial-500)] mt-1 text-lg leading-none">
                          →
                        </span>
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-4">
                    Stack signatures
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-1.5 rounded-md bg-[color:var(--color-fog)] text-[color:var(--color-slate)] border border-hair"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[color:var(--color-fog-soft)] border border-hair rounded-xl p-5">
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-2">
                    Typical engagement
                  </p>
                  <p className="text-[color:var(--color-ink)] leading-relaxed">
                    {s.engagement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW WE ENGAGE ===== */}
      <section className="py-24 md:py-32 bg-[color:var(--color-fog-soft)] border-y border-hair mt-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-14">
            <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
              Engagement model
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              How an engagement actually runs.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {PHASES.map((p, i) => (
              <div
                key={p.name}
                className="bg-white border border-hair rounded-2xl p-6 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-[color:var(--color-slate-soft)]">
                    /0{i + 1}
                  </span>
                  <span className="kicker text-[color:var(--color-slate-soft)]">
                    {p.duration}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] mb-3 tracking-tight">
                  {p.name}
                </h3>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-[400px] h-[400px] orb-azure opacity-30 pointer-events-none" />
        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
            Have a system you need
            <br />
            to actually get live?
          </h2>
          <p className="mt-6 text-lg text-[color:var(--color-slate)] max-w-xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you honestly
            whether it&apos;s a one-week ChatCraft deployment or a six-month
            platform build — or neither.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/about#contact">Start a conversation →</Button>
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const DETAILED_SERVICES = [
  {
    num: "01",
    title: "Conversational AI.",
    lead: "From customer-facing assistants to internal agent copilots — built on ChatCraft or from scratch where the fit demands it.",
    deliverables: [
      "Solution design with conversation flow and handoff map",
      "Retrieval layer over your data — vector, keyword, or hybrid",
      "Guardrails, PII handling, and compliance review packaging",
      "Channel wiring — web, voice, WhatsApp, or internal Slack",
      "Analytics dashboards and evaluation harnesses",
    ],
    stack: [
      "ChatCraft",
      "LangChain",
      "LangChain4j",
      "Ollama",
      "Pinecone",
      "pgvector",
      "Anthropic · OpenAI",
    ],
    engagement:
      "6–10 weeks for a scoped production deployment, including guardrail review. Most clients continue with us on a managed-ops retainer afterwards.",
  },
  {
    num: "02",
    title: "Workflow automation.",
    lead: "Process orchestration that replaces manual handoffs — document review, approvals, data reconciliation, operational reporting.",
    deliverables: [
      "Process mapping and AI-in-the-loop design",
      "Event-driven services on Spring Boot, FastAPI, or Node",
      "Document pipelines — extraction, classification, routing",
      "Human-in-the-loop approval surfaces",
      "Observability and audit trail instrumentation",
    ],
    stack: [
      "Spring Boot",
      "FastAPI",
      "Kafka",
      "Temporal",
      "PostgreSQL",
      "MinIO",
      "Keycloak",
    ],
    engagement:
      "8–16 weeks depending on process complexity and integration count. We start with the noisiest handoff in your ops org and build outward from there.",
  },
  {
    num: "03",
    title: "Integration engineering.",
    lead: "Wiring AI and automation into the systems you already run — core banking, ERP, CRM, legacy mainframes, NIBSS, and public-sector APIs.",
    deliverables: [
      "Integration architecture with versioning and contract testing",
      "API gateway patterns and tenant isolation",
      "Auth flows — OAuth2, JWT, Keycloak, SSO",
      "Event streams, webhooks, and data sync",
      "Deployment on-prem, hybrid, or in your cloud of choice",
    ],
    stack: [
      "APISIX",
      "Spring Security",
      "OAuth2 · JWT",
      "Kafka",
      "gRPC · REST",
      "NIBSS · BVN",
      "GKE · AWS",
    ],
    engagement:
      "Scoped per system. We've integrated with NIBSS, core banking platforms, Odoo, ERPNext, Frappe, and several government identity services.",
  },
  {
    num: "04",
    title: "Platform operations.",
    lead: "We don't deploy and disappear. Managed hosting, monitoring, tuning, and ongoing optimization for production AI systems.",
    deliverables: [
      "SRE-grade monitoring, alerts, and incident response",
      "Model evaluation harnesses and prompt regression testing",
      "Cost and latency observability across providers",
      "Quarterly architecture reviews with engineering leadership",
      "On-call rotation covering West and East African business hours",
    ],
    stack: [
      "Prometheus · Grafana",
      "OpenTelemetry",
      "Sentry",
      "Docker · Kubernetes",
      "Terraform",
      "LangSmith",
    ],
    engagement:
      "Monthly retainer. Scales with the surface area of what's in production. Most clients start here three months after a delivery engagement ends.",
  },
];

const PHASES = [
  {
    name: "Discovery",
    duration: "1–2 weeks",
    desc: "Workflow mapping, data access review, success metrics, and an honest buy-vs-build assessment. Ends with a scoped proposal.",
  },
  {
    name: "Design",
    duration: "2–3 weeks",
    desc: "Solution architecture, integration contracts, security and compliance review, operational cost model. Deliverable is an ADR-backed plan.",
  },
  {
    name: "Build",
    duration: "6–16 weeks",
    desc: "Iterative delivery against fortnightly milestones. Your stakeholders are in the standups. No surprises at UAT.",
  },
  {
    name: "Operate",
    duration: "Ongoing",
    desc: "Managed ops, incident response, and quarterly tuning. We operate it until you're ready to take it fully in-house.",
  },
];
