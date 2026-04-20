import Button from "@/components/Button";

export const metadata = {
  title: "Work — Selected case studies",
  description:
    "A selection of systems Factorial has designed, built, and operated across identity infrastructure, banking, manufacturing, and public sector.",
};

export default function WorkPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] orb-mint opacity-40 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
          <div className="rise-0 flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[color:var(--color-factorial-500)]" />
            <span className="kicker text-[color:var(--color-factorial-600)]">
              Selected work · 2022–2026
            </span>
          </div>
          <h1 className="rise-1 font-display text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-4xl">
            Systems live in production.
            <br />
            <span className="text-[color:var(--color-slate)]">
              Not slideware.
            </span>
          </h1>
          <p className="rise-2 mt-8 text-lg md:text-xl text-[color:var(--color-slate)] max-w-2xl leading-relaxed">
            A selection of engagements we can talk about publicly. Clients
            anonymized where needed. Happy to walk through more under NDA.
          </p>
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-16">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 space-y-24">
          {CASES.map((c, i) => (
            <article
              key={c.id}
              className="grid md:grid-cols-12 gap-10 border-t border-hair pt-16"
            >
              <div className="md:col-span-4">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[color:var(--color-slate-soft)]">
                      {c.id}
                    </span>
                    <span className="kicker text-[color:var(--color-factorial-500)]">
                      {c.year}
                    </span>
                  </div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-3">
                    {c.sector}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-medium leading-[1.1] tracking-tight text-[color:var(--color-ink)]">
                    {c.title}
                  </h2>
                </div>
              </div>

              <div className="md:col-span-8 space-y-8">
                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-3">
                    Challenge
                  </p>
                  <p className="text-[color:var(--color-ink)] leading-relaxed">
                    {c.challenge}
                  </p>
                </div>

                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-3">
                    Approach
                  </p>
                  <p className="text-[color:var(--color-ink)] leading-relaxed">
                    {c.approach}
                  </p>
                </div>

                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-4">
                    Outcomes
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {c.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="border-t border-[color:var(--color-ink)] pt-3"
                      >
                        <p className="font-display text-2xl font-medium text-[color:var(--color-ink)] tracking-tight">
                          {o.value}
                        </p>
                        <p className="text-xs text-[color:var(--color-slate)] leading-snug mt-1">
                          {o.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="kicker text-[color:var(--color-slate-soft)] mb-3">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {c.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-1.5 rounded-md bg-[color:var(--color-fog)] text-[color:var(--color-slate)] border border-hair"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="absolute top-10 left-10 w-[400px] h-[400px] orb-blue opacity-30 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05] max-w-3xl mx-auto">
            Want to see more?
          </h2>
          <p className="mt-6 text-lg text-[color:var(--color-slate)] max-w-xl mx-auto">
            We can&apos;t publicly share every engagement. Under NDA, we can
            walk you through three more recent builds and a reference call.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/about#contact">Request a walkthrough →</Button>
            <Button href="/services" variant="secondary">
              See services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const CASES = [
  {
    id: "FS-021",
    year: "2024–2026",
    sector: "Identity infrastructure · public sector",
    title: "National identity API gateway, architected for a continent's load.",
    challenge:
      "A national identity management program needed an API gateway subsystem capable of handling verification traffic at population scale — hundreds of millions of citizens, thousands of relying-party integrators, and a mandate to run hybrid across on-prem and GKE.",
    approach:
      "Solutions architecture anchored on Apache APISIX. Hybrid deployment topology with failover between on-prem and GKE. Full operational cost model in NGN covering compute, network egress, and support. Documentation packaged for procurement and compliance review.",
    outcomes: [
      { value: "Hybrid", label: "On-prem + GKE topology" },
      { value: "APISIX", label: "Gateway of record" },
      { value: "100%", label: "Delivery against procurement timeline" },
    ],
    stack: ["APISIX", "GKE", "Spring Boot", "Keycloak", "PostgreSQL", "Redis"],
  },
  {
    id: "FS-018",
    year: "2023–2025",
    sector: "Banking · microfinance",
    title: "Core banking for rural microfinance operators.",
    challenge:
      "A Nigerian microfinance operator serving rural, underbanked communities needed a core banking platform with offline-first branches, local-language onboarding, and credit scoring that didn't require a bureau file — because most of their customers didn't have one.",
    approach:
      "Offline-first architecture with deterministic sync. XGBoost-based credit scoring trained on behavioural features from POS, airtime, and cash-flow patterns. NIBSS payment integration for settlement. Branch agents equipped with tablet-based loan origination flow designed around patchy connectivity.",
    outcomes: [
      { value: "Offline-first", label: "Branches operate without connectivity" },
      { value: "XGBoost", label: "Credit scoring without bureau files" },
      { value: "NIBSS", label: "Settlement integration" },
    ],
    stack: ["Spring Boot", "XGBoost", "NIBSS", "Flutter", "PostgreSQL"],
  },
  {
    id: "FS-014",
    year: "2022–2024",
    sector: "Manufacturing · distribution",
    title: "Cement distributor ERP — Odoo backbone plus custom dealer portal.",
    challenge:
      "A leading Nigerian cement distributor's order-to-delivery reconciliation was a manual mess — dealers on WhatsApp, payments in spreadsheets, dispatch on paper. They needed a unified system, but Odoo alone couldn't handle the dealer-facing experience their network expected.",
    approach:
      "Odoo Community as ERP backbone for stock, finance, and procurement. Custom React & Spring Boot portal for dealers — orders, payment status, dispatch tracking, real-time stock visibility. Dealers never see Odoo; operations staff never leave it.",
    outcomes: [
      { value: "60%+", label: "Reduction in order-to-delivery reconciliation time" },
      { value: "Unified", label: "Dealer experience across channels" },
      { value: "Odoo", label: "Single source of truth for ops" },
    ],
    stack: ["Odoo", "React", "Spring Boot", "PostgreSQL", "nginx"],
  },
  {
    id: "FS-009",
    year: "2024",
    sector: "Internal · platform",
    title: "ChatCraft — our own conversational AI platform, in production.",
    challenge:
      "Every conversational AI engagement we took on had to reinvent the same six things: retrieval, guardrails, routing, channel fan-out, handoff, and audit. We decided to stop rebuilding and started shipping what became ChatCraft.",
    approach:
      "Platform designed for production deployment first — multi-tenant, observable, auditable, with first-class human handoff. BYO model provider. Channel-agnostic conversation fabric. Deployed initially inside our own client engagements; now a standalone product.",
    outcomes: [
      { value: "Live", label: "Deployed across multiple clients" },
      { value: "BYO", label: "Model provider — Anthropic, OpenAI, Ollama" },
      { value: "Multi-tenant", label: "From day one" },
    ],
    stack: ["ChatCraft", "LangChain", "Anthropic", "FastAPI", "pgvector", "Kafka"],
  },
];
