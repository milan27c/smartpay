import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abans SmartPay — Sell with Confidence",
  description:
    "Internal training hub for Abans showroom teams: how SmartPay protects Tiken Tika Pay instalment smartphone sales.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
