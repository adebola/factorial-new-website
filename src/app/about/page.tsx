import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "About — Factorial Systems, built in Lagos",
  description:
    "Factorial Systems is a Lagos-based implementation team building conversational AI and workflow automation for enterprise. Meet the team and get in touch.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-10 -right-10 w-[480px] h-[480px] orb-azure opacity-40 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <div className="rise-0 flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[color:var(--color-factorial-500)]" />
                <span className="kicker text-[color:var(--color-factorial-600)]">
                  About · Lagos · Est. 2015
                </span>
              </div>
              <h1 className="rise-1 font-display text-5xl md:text-7xl font-medium tracking-[-0.03em] leading-[1.02]">
                Implementation
                <br />
                <span className="text-[color:var(--color-slate)]">
                  is a discipline.
                </span>
              </h1>
              <p className="rise-2 mt-8 text-lg md:text-xl text-[color:var(--color-slate)] max-w-2xl leading-relaxed">
                Factorial is a small, senior engineering team that designs and
                ships production-grade AI systems. We&apos;re not strategy
                consultants and we don&apos;t pretend to be. What we do
                instead: write the code, run the deployment, and stay on call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="py-20 md:py-24 border-y border-hair bg-[color:var(--color-fog-soft)]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
                /01 — How we work
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-[1.1]">
                Engineers in the room. Not salespeople.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-lg text-[color:var(--color-ink)] leading-relaxed">
              <p>
                We built our first enterprise systems over a decade ago, in C
                and C++. We&apos;ve worked on everything from national identity
                infrastructure to core banking for rural microfinance to
                continent-scale ERP integrations. That shipping DNA is what we
                bring to the AI wave.
              </p>
              <p>
                We don&apos;t sell you a transformation. We scope a system,
                build it, deploy it, and stay to operate it. When we say
                &ldquo;shipped — not pitched,&rdquo; that&apos;s the promise.
              </p>
              <p>
                We&apos;re based in Lagos, work primarily with Nigerian and
                West African enterprise and public-sector clients, and travel
                when the project demands it. Most engagements start with a
                30-minute call where we listen first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="mb-14">
            <p className="kicker text-[color:var(--color-factorial-500)] mb-4">
              /02 — The team
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Senior people on every engagement.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="bg-white border border-hair rounded-2xl p-7"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 font-display text-xl font-medium"
                  style={{
                    background: m.tint,
                    color: m.tintText,
                  }}
                >
                  {m.initials}
                </div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] tracking-tight">
                  {m.name}
                </h3>
                <p className="kicker text-[color:var(--color-factorial-500)] mt-1 mb-4">
                  {m.role}
                </p>
                <p className="text-sm text-[color:var(--color-slate)] leading-relaxed">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-[color:var(--color-slate-soft)] max-w-2xl">
            Core team supported by a rotating bench of senior engineers across
            backend (Java · Python · Node), mobile (Flutter), data, and
            infrastructure. We scale the team to the engagement, not the
            other way around.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="relative py-24 md:py-32 bg-[color:var(--color-ink)] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" />
        <div className="absolute top-20 right-10 w-[400px] h-[400px] orb-azure opacity-50 pointer-events-none" />
        <div className="absolute bottom-10 left-20 w-[320px] h-[320px] orb-mint opacity-30 pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-6">
              <p className="kicker text-[color:var(--color-mint)] mb-4">
                /03 — Contact
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05]">
                Tell us what
                <br />
                you&apos;re building.
              </h2>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md">
                The 30-minute call is free. We&apos;ll listen, ask the awkward
                questions, and tell you honestly whether we&apos;re the right
                team.
              </p>

              <div className="mt-10 space-y-5">
                <ContactRow label="Email" value="info@factorialsystems.io" href="mailto:info@factorialsystems.io" />
                <ContactRow label="Phone" value="+234 818 811 1333" mono />
                <ContactRow label="Phone" value="+234 818 222 2236" mono />
                <ContactRow
                  label="Office"
                  value="Chevron Drive, Lekki · Lagos"
                />
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  mono = false,
}: {
  label: string;
  value: string;
  href?: string;
  mono?: boolean;
}) {
  const content = (
    <>
      <span className="kicker text-white/40">{label}</span>
      <span
        className={`block mt-1 text-lg ${
          mono ? "font-mono text-base" : ""
        }`}
      >
        {value}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="block group">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

const TEAM = [
  {
    name: "Abiola Adekunle",
    role: "Founder · CEO",
    initials: "AA",
    bio: "Nearly 20 years building software businesses across Nigeria and West Africa. Sets the commercial direction and scopes most new engagements personally.",
    tint: "#E6EFFB",
    tintText: "#143D80",
  },
  {
    name: "Koyejo Omoboya",
    role: "CTO · Solutions Architect",
    initials: "KO",
    bio: "Senior engineer with deep JVM, Python, and infrastructure DNA. Leads architecture on flagship engagements — identity, banking, and the ChatCraft platform.",
    tint: "#E6F5EF",
    tintText: "#0F6E56",
  },
  {
    name: "Tobi Aguda",
    role: "Legal · Operations",
    initials: "TA",
    bio: "Over a decade operating across technology and legal. Runs commercial, compliance, and contracting so the engineering team can stay focused on shipping.",
    tint: "#F0E6FB",
    tintText: "#3C3489",
  },
];
