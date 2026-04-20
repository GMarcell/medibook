import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "MediBook",
    template: "%s | MediBook",
  },
  description:
    "MediBook is a healthcare appointment platform for browsing doctors, booking visits, and managing schedules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
