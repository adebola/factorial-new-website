import Logo from "./Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-ink)] text-white mt-24 relative overflow-hidden">
      {/* Subtle orb accent */}
      <div className="absolute -top-20 right-10 w-64 h-64 orb-blue opacity-40 pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Logo variant="white" size={32} />
            <p className="mt-5 text-sm text-white/60 max-w-sm leading-relaxed">
              Conversational AI and workflow automation for enterprise — anchored by ChatCraft, built in Lagos.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-mint)] shimmer" />
              <span className="kicker text-white/50">Accepting engagements — Q2 2026</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="kicker text-white/40 mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/chatcraft" className="text-white/80 hover:text-white transition-colors">ChatCraft</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/work" className="text-white/80 hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="kicker text-white/40 mb-4">Services</p>
            <ul className="space-y-2.5 text-sm">
              <li className="text-white/80">Conversational AI</li>
              <li className="text-white/80">Workflow automation</li>
              <li className="text-white/80">Integration engineering</li>
              <li className="text-white/80">Platform operations</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="kicker text-white/40 mb-4">Get in touch</p>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a href="mailto:info@factorialsystems.io" className="hover:text-white transition-colors">
                  info@factorialsystems.io
                </a>
              </li>
              <li className="font-mono text-xs text-white/60">+234 818 811 1333</li>
              <li className="font-mono text-xs text-white/60">+234 818 222 2236</li>
              <li className="pt-2 text-white/60 text-xs leading-relaxed">
                Chevron Drive<br />
                Lekki, Lagos · Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-hair-dark flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Factorial Systems. All rights reserved.
          </p>
          <p className="kicker text-white/30">
            v3.0 — Lagos · 6.4541° N
          </p>
        </div>
      </div>
    </footer>
  );
}
