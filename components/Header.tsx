import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/newlogo.png";
import { DownloadIcon } from "./icons";

const NAV = {
  logoAlt: "Abans SmartPay",
  links: [
    { label: "Why SmartPay", href: "#why-smartpay" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "Artworks", href: "#artworks" },
    { label: "Brand Assets", href: "#brand-assets" },
  ],
  cta: { label: "Guidance Doc", href: "#guidance" },
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#top" className="flex items-center">
          <Image src={logo} alt={NAV.logoAlt} className="h-9 w-auto sm:h-10" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href={NAV.cta.href} className="btn-primary btn-md shrink-0">
          <DownloadIcon className="h-4 w-4" />
          {NAV.cta.label}
        </a>
      </div>
    </header>
  );
}
