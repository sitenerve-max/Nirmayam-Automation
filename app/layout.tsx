import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niramayam Physio × SiteNerve — Automation Proposal",
  description: "Concept proposal with sample data: how Niramayam Physio & Rehabilitation Centre could run with less manual follow-up.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
