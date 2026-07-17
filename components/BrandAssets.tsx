import Image from "next/image";
import Reveal from "./Reveal";
import { DownloadIcon } from "./icons";

// ---- Content ----
// Swap `file`/`preview` paths when the official asset pack arrives. The Abans
// logo is real; the SmartPay and Tiken Tika Pay marks are dummies for now.
const SECTION = {
  eyebrow: "Brand Assets",
  titleLead: "Official Logos & ",
  titleGradient: "Brand Assets",
  intro:
    "Download the official logos in the correct formats, ready to drop straight into your showroom materials.",
};

type Asset = {
  name: string;
  meta: string;
  preview: string;
  file: string;
  downloadName: string;
  /** Dummy SVG previews skip Next's image optimizer (SVG passthrough). */
  unoptimized?: boolean;
  previewWidth: number;
  previewHeight: number;
};

const ASSETS: Asset[] = [
  {
    name: "Abans Logo",
    meta: "PNG · full colour",
    preview: "/images/logo.png",
    file: "/images/logo.png",
    downloadName: "Abans-Logo.png",
    previewWidth: 400,
    previewHeight: 116,
  },
  {
    name: "SmartPay Logo",
    meta: "PNG · full colour",
    preview: "/images/newlogo.png",
    file: "/images/newlogo.png",
    downloadName: "Abans-SmartPay-Logo.png",
    previewWidth: 600,
    previewHeight: 203,
  },
  {
    name: "Tiken Tika Pay Logo",
    meta: "SVG · dummy placeholder",
    preview: "/brand/tiken-tika-pay-logo.svg",
    file: "/brand/tiken-tika-pay-logo.svg",
    downloadName: "Tiken-Tika-Pay-Logo.svg",
    unoptimized: true,
    previewWidth: 400,
    previewHeight: 120,
  },
];

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

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((asset, index) => (
            <Reveal as="li" key={asset.name} delay={(index % 3) * 100}>
              <div className="card-hover flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex h-36 items-center justify-center rounded-xl bg-gray-100 px-6">
                  <Image
                    src={asset.preview}
                    alt={`${asset.name} preview`}
                    width={asset.previewWidth}
                    height={asset.previewHeight}
                    unoptimized={asset.unoptimized}
                    className="max-h-16 w-auto"
                  />
                </div>
                <div className="mt-5 flex flex-1 items-end justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {asset.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500">{asset.meta}</p>
                  </div>
                  <a
                    href={asset.file}
                    download={asset.downloadName}
                    className="btn-secondary btn-md shrink-0"
                    aria-label={`Download ${asset.name}`}
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
