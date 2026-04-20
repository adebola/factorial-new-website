import type { Metadata } from "next";
import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const bodyFont = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.factorialsystems.io"),
  title: {
    default: "Factorial Systems — Conversational AI & workflow automation for enterprise",
    template: "%s · Factorial Systems",
  },
  description:
    "Factorial designs and deploys conversational AI and workflow automation for regulated industries — anchored by our ChatCraft platform and delivered by a Lagos-based team of engineers.",
  keywords: [
    "Conversational AI",
    "Workflow Automation",
    "ChatCraft",
    "Enterprise AI",
    "Nigeria",
    "Lagos",
    "AI Implementation",
  ],
  openGraph: {
    title: "Factorial Systems",
    description:
      "Conversational AI and workflow automation for enterprise. Anchored by ChatCraft.",
    url: "https://www.factorialsystems.io",
    siteName: "Factorial Systems",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
