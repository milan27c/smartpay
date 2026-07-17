import Reveal from "./Reveal";
import {
  CalendarCheckIcon,
  HeartHandsIcon,
  ShieldCheckIcon,
  SlidersIcon,
  TrendingUpIcon,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

// ---- Content ----
const SECTION = {
  eyebrow: "What SmartPay Means for You",
  titleLead: "Six reasons your",
  titleGradient: "showroom wins",
};

const CLOSING = {
  headlineLead: "More Protection. More Confidence.",
  headlineGradient: "More Sales.",
  body: "SmartPay protects your business, supports timely payments, and helps you sell more.",
};

const BENEFITS: {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "Sell with Greater Confidence",
    description: "Offer instalment plans without worrying about missed payments.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Encourage On-Time Payments",
    description: "The locking feature keeps customers disciplined.",
    icon: CalendarCheckIcon,
  },
  {
    title: "Reduce Payment Risk",
    description: "Extra protection for your showroom.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Maintain Better Control",
    description: "Clear and secure management of instalment sales.",
    icon: SlidersIcon,
  },
  {
    title: "Increase Smartphone Sales",
    description: "Promote Tiken Tika Pay more actively.",
    icon: TrendingUpIcon,
  },
  {
    title: "Give Your Team Peace of Mind",
    description: "Focus on selling with confidence.",
    icon: HeartHandsIcon,
  },
];

export default function BenefitsGrid() {
  return (
    <section id="benefits" className="scroll-mt-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            {SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {SECTION.titleLead}{" "}
            <span className="gradient-text">{SECTION.titleGradient}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} delay={(index % 3) * 100}>
              <div className="card-hover h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                  <benefit.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mx-auto mt-16 w-full md:mt-20 md:w-[70%]">
          <div className="relative overflow-hidden rounded-3xl bg-primary-950 px-8 py-12 text-center shadow-xl shadow-primary-950/30 ring-1 ring-white/10 sm:px-12 sm:py-14">
            {/* Animated colorful gaussian-blur background */}
            <div aria-hidden="true" className="absolute inset-0">
              <div className="aurora-blob aurora-a -top-16 -left-10 h-56 w-56 bg-fuchsia-500/50" />
              <div className="aurora-blob aurora-b -right-12 -bottom-16 h-64 w-64 bg-blue-500/45" />
              <div className="aurora-blob aurora-c top-1/4 left-1/3 h-48 w-48 bg-pink-500/45" />
              <div className="aurora-blob aurora-a -top-10 right-1/4 h-44 w-44 bg-violet-500/40" />
            </div>

            <div className="relative">
              <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                {CLOSING.headlineLead} {CLOSING.headlineGradient}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                {CLOSING.body}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
