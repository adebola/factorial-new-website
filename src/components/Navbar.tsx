"use client";

import Logo from "./Logo";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/chatcraft", label: "ChatCraft" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--color-paper)]/85 backdrop-blur-md border-b border-hair">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Logo size={28} />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--color-slate)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/about#contact"
            className="text-sm text-[color:var(--color-slate)] hover:text-[color:var(--color-ink)] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/about#contact"
            className="text-sm font-medium bg-[color:var(--color-factorial-500)] hover:bg-[color:var(--color-factorial-600)] text-white px-4 py-2 rounded-md transition-colors"
          >
            Book a demo
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-hair rounded-md"
        >
          <span
            className={`block h-0.5 w-5 bg-[color:var(--color-ink)] transition-transform ${
              open ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[color:var(--color-ink)] transition-transform ${
              open ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hair bg-[color:var(--color-paper)]">
          <div className="max-w-[1240px] mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-[color:var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about#contact"
              onClick={() => setOpen(false)}
              className="mt-3 text-center text-sm font-medium bg-[color:var(--color-factorial-500)] text-white px-4 py-2.5 rounded-md"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
