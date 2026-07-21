import type { Metadata } from "next";
import { Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

// The SF Pro system stack has no Sinhala glyphs, so Sinhala copy (hero
// headline/description) would otherwise fall back inconsistently per device.
// This is listed last in `--font-sans`, so Latin text still renders in SF Pro
// and only Sinhala characters fall through to this font.
const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`${notoSansSinhala.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
