import Image from "next/image";
import Reveal from "./Reveal";
import whiteLogo from "@/public/images/whitelogo.png";
import { DownloadIcon } from "./icons";

// ---- Content (swap `file` for the real document when it arrives) ----
const GUIDANCE = {
  eyebrow: "Official Reference",
  title: "SmartPay Guidance Document",
  description:
    "Everything your team needs to explain SmartPay to customers, covering how locking and unlocking works, what to say at the counter, and answers to common questions. Keep it on your phone for quick reference.",
  buttonLabel: "Download SmartPay Guidance Document",
  file: {
    // Google Drive direct-download link for the official document.
    href: "https://drive.google.com/uc?export=download&id=1esfSK0Em5ZUG1Uh3_n7VxGBgWcopDLOt",
  },
};

export default function GuidanceDownload() {
  return (
    <section id="guidance" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-14 sm:px-6 md:pt-4 md:pb-20">
        <Reveal>
          <div className="card-hover flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gray-900 px-6 py-10 text-center shadow-xl shadow-primary-950/30 sm:px-10 md:flex-row md:gap-10 md:text-left">
            <Image
              src={whiteLogo}
              alt=""
              aria-hidden="true"
              className="h-20 w-auto shrink-0 self-center md:h-24"
            />

            <div className="flex-1">
              <p className="text-xs font-bold tracking-widest text-primary-300 uppercase">
                {GUIDANCE.eyebrow}
              </p>
              <h2 className="mt-1.5 text-2xl font-bold text-white sm:text-3xl">
                {GUIDANCE.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                {GUIDANCE.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center md:justify-end">
              <a
                href={GUIDANCE.file.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-spark btn-lg"
              >
                <DownloadIcon className="relative z-10 h-5 w-5" />
                <span className="relative z-10 max-w-52 leading-tight sm:max-w-none">
                  {GUIDANCE.buttonLabel}
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
