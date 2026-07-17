import Image from "next/image";
import Reveal from "./Reveal";
import newLogo from "@/public/images/newlogo.png";
import { DownloadIcon } from "./icons";

// ---- Content ----
const SECTION = {
  eyebrow: "Brand Assets",
  titleLead: "Official Logos & ",
  titleGradient: "Brand Assets",
  intro:
    "Download the official Abans SmartPay logo and brand assets, ready to drop straight into your showroom materials.",
};

const ASSET = {
  logoAlt: "Abans SmartPay logo",
  heading: "Abans SmartPay Logo & Assets",
  meta: "Official logos and brand files",
  buttonLabel: "Download Brand Assets",
  // Google Drive folder with the approved logo and brand assets.
  href: "https://drive.google.com/drive/folders/1uPonVF35CzGMeVR6-Tzx03rWnuT5w_7K",
};

export default function BrandAssets() {
  return (
    <section id="brand-assets" className="scroll-mt-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            {SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {SECTION.titleLead}
            <span className="gradient-text">{SECTION.titleGradient}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            {SECTION.intro}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <div className="card-hover flex flex-col items-center gap-8 rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8 md:flex-row md:gap-10 md:text-left">
            {/* Logo preview */}
            <div className="flex w-full items-center justify-center rounded-2xl bg-gray-100 px-8 py-10 md:w-1/2 md:py-14">
              <Image
                src={newLogo}
                alt={ASSET.logoAlt}
                sizes="(min-width: 768px) 40vw, 80vw"
                className="h-auto w-full max-w-xs"
              />
            </div>

            {/* Text + download */}
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {ASSET.heading}
              </h3>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                {ASSET.meta}
              </p>
              <a
                href={ASSET.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-lg mt-6"
              >
                <DownloadIcon className="h-5 w-5" />
                {ASSET.buttonLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
