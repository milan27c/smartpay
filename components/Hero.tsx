import Image from "next/image";
import Reveal from "./Reveal";
import ScrollScale from "./ScrollScale";
import heroImage from "@/public/images/hero.jpg";
import { PlayIcon } from "./icons";

// ---- Content (edit copy/media here, not in the JSX below) ----
const HERO = {
  headline: {
    // Rendered as two lines: a lead, then the animated-gradient payoff.
    lead: "Smartphones ටිකෙන් ටික ගෙවන්න දෙන්න දැන් බය වෙන්න එපා.",
    gradient: "Abans SmartPay දැන් ඔබේ සහායට.",
  },
  description:
    "SmartPay වැඩ කරන විදිහ දැනගන්න, SmartPay Guidance Video එක බලන්න.",
  // Placeholder visual — the real intro video swaps into this same media
  // frame later (see HeroMedia below); no layout changes needed.
  media: {
    image: heroImage,
    alt: "Customer completing a payment at a showroom counter",
    note: "SmartPay intro video coming soon",
  },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Aurora backdrop: drifting purple/pink/blue glows over a faint grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-a -top-32 left-[8%] h-96 w-96 bg-primary-400/25" />
        <div className="aurora-blob aurora-b top-10 right-[-6%] h-[28rem] w-[28rem] bg-pink-400/20" />
        <div className="aurora-blob aurora-c top-56 left-[-10%] h-[26rem] w-[26rem] bg-blue-400/20" />
        <div className="hero-grid absolute inset-0" />
      </div>

      {/* Text column — centered; wide enough on desktop to keep the lead to
          two lines and the gradient line to one. */}
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20 md:max-w-4xl md:pt-24 lg:max-w-5xl">
        <Reveal>
          <h1 className="text-3xl leading-snug font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl md:leading-snug">
            <span className="block font-semibold">{HERO.headline.lead}</span>
            <span className="gradient-text mt-2 block">
              {HERO.headline.gradient}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {HERO.description}
          </p>
        </Reveal>
      </div>

      {/* Media — full-bleed within page margins; grows toward full width on scroll */}
      <Reveal delay={200} className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <HeroMedia />
      </Reveal>
    </section>
  );
}

/**
 * Media frame that grows as it scrolls toward the viewport center: it starts
 * noticeably smaller and expands to fill the page width (minus side margins).
 * When the real intro video arrives, replace the <Image> with an
 * <iframe>/<video> — the 16:9 frame, scroll effect, and layout stay identical.
 */
function HeroMedia() {
  return (
    <ScrollScale className="mx-auto max-w-[70rem]" from={0.7}>
      <figure className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary-950/25 ring-1 ring-primary-950/10">
        <div className="relative aspect-video">
          <Image
            src={HERO.media.image}
            alt={HERO.media.alt}
            fill
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
            placeholder="blur"
            priority
          />
          {/* Soft brand tint + play affordance for the future video */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-primary-950/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow-lg transition-transform duration-300 ease-out hover:scale-110 sm:h-16 sm:w-16">
              <PlayIcon className="h-6 w-6 translate-x-0.5 sm:h-7 sm:w-7" />
            </span>
          </div>
          <figcaption className="absolute inset-x-0 bottom-4 text-center text-sm font-semibold text-white/90">
            {HERO.media.note}
          </figcaption>
        </div>
      </figure>
    </ScrollScale>
  );
}
