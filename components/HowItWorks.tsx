"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Reveal from "./Reveal";
import {
  LoaderIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UnlockIcon,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

// How long each step stays active before auto-advancing (ms).
const STEP_MS = 3800;

// ---- Content ----
const SECTION = {
  eyebrow: "What Is SmartPay?",
  titleLead: "How SmartPay works, ",
  titleGradient: "step by step",
  intro:
    "A simple, automatic cycle. No chasing payments, no awkward calls. The phone itself keeps the plan on track.",
};

type Tone = "brand" | "locked" | "unlocked";
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type Step = {
  n: number;
  stepTitle: string;
  stepDesc: string;
  tone: Tone;
  icon: IconType;
  spin?: boolean;
  screen:
    | {
        variant: "status";
        eyebrow: string;
        title: string;
        desc: string;
        badge: string;
      }
    | { variant: "home"; eyebrow: string; caption: string; badge: string };
};

const STEPS: Step[] = [
  {
    n: 1,
    stepTitle: "SmartPay is installed",
    stepDesc: "SmartPay is installed on the customer's phone at purchase.",
    tone: "brand",
    icon: ShieldCheckIcon,
    screen: {
      variant: "status",
      eyebrow: "Setup",
      title: "SmartPay installed",
      desc: "This device is now protected under an Abans Tiken Tika Pay instalment plan.",
      badge: "Protected",
    },
  },
  {
    n: 2,
    stepTitle: "Customer uses the phone",
    stepDesc: "The customer uses the phone while making monthly payments.",
    tone: "brand",
    icon: SmartphoneIcon,
    screen: {
      variant: "home",
      eyebrow: "Home screen",
      caption: "Instalment 2 of 6 · next payment in 12 days",
      badge: "In use",
    },
  },
  {
    n: 3,
    stepTitle: "Missed payment? Phone locks",
    stepDesc: "If a payment is missed, the phone locks automatically.",
    tone: "locked",
    icon: LockIcon,
    screen: {
      variant: "status",
      eyebrow: "Payment overdue",
      title: "Phone locked",
      desc: "A payment was missed. Settle the outstanding balance to unlock this device.",
      badge: "Locked",
    },
  },
  {
    n: 4,
    stepTitle: "Customer settles the balance",
    stepDesc: "The customer settles the outstanding amount.",
    tone: "brand",
    icon: LoaderIcon,
    spin: true,
    screen: {
      variant: "status",
      eyebrow: "Settling balance",
      title: "Processing payment",
      desc: "The customer is settling the outstanding amount to restore access.",
      badge: "Processing",
    },
  },
  {
    n: 5,
    stepTitle: "Payment confirmed? Phone unlocks",
    stepDesc: "Once payment is confirmed, the phone unlocks.",
    tone: "unlocked",
    icon: UnlockIcon,
    screen: {
      variant: "status",
      eyebrow: "Payment confirmed",
      title: "Phone unlocked",
      desc: "Payment confirmed. Full access to the device has been restored.",
      badge: "Unlocked",
    },
  },
];

const TONE: Record<
  Tone,
  { numActive: string; iconText: string; circle: string; badge: string; dot: string }
> = {
  brand: {
    numActive: "bg-primary-700 text-white",
    iconText: "text-primary-600",
    circle: "bg-primary-100 text-primary-700",
    badge: "bg-primary-100 text-primary-700",
    dot: "bg-primary-500",
  },
  locked: {
    numActive: "bg-alert-600 text-white",
    iconText: "text-alert-600",
    circle: "bg-alert-100 text-alert-600",
    badge: "bg-alert-100 text-alert-700",
    dot: "bg-alert-600",
  },
  unlocked: {
    numActive: "bg-good-600 text-white",
    iconText: "text-good-600",
    circle: "bg-good-100 text-good-700",
    badge: "bg-good-100 text-good-700",
    dot: "bg-good-600",
  },
};

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  // Auto-advance through the steps, looping. Skipped when the user prefers
  // reduced motion (they can still click a step to jump to it).
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STEPS.length),
      STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section id="how-it-works" className="scroll-mt-16 bg-white">
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

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
          {/* Left: step list. On mobile every step reads as active (the device
              plays below); on desktop only the playing step is highlighted. */}
          <ol className="space-y-2">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const tone = TONE[step.tone];
              // Inactive-on-desktop overrides; mobile always shows active look.
              const dim = isActive
                ? ""
                : "md:bg-transparent md:opacity-60 md:shadow-none md:ring-0 md:hover:bg-gray-50/60 md:hover:opacity-100";
              return (
                <Reveal as="li" key={step.stepTitle} delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`flex w-full cursor-pointer items-start gap-4 rounded-2xl bg-gray-50 p-4 text-left shadow-md shadow-primary-950/5 ring-1 ring-gray-100 transition-all duration-300 ${dim}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${tone.numActive} ${isActive ? "" : "md:bg-gray-100 md:text-gray-500"}`}
                    >
                      {step.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <step.icon
                          className={`h-4.5 w-4.5 shrink-0 ${tone.iconText} ${isActive ? "" : "md:text-gray-400"}`}
                        />
                        <span
                          className={`text-base font-bold text-gray-900 sm:text-lg ${isActive ? "" : "md:text-gray-700"}`}
                        >
                          {step.stepTitle}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-gray-500 sm:text-base">
                        {step.stepDesc}
                      </span>
                      {isActive && !reduced && (
                        <span className="mt-3 hidden h-1 w-full overflow-hidden rounded-full bg-gray-200 md:block">
                          <span
                            key={active}
                            className="step-progress block h-full rounded-full bg-primary-500"
                            style={{ animationDuration: `${STEP_MS}ms` }}
                          />
                        </span>
                      )}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ol>

          {/* Right: phone mockup reflecting the active step (matches the
              steps' height on desktop, stacks below them on mobile). */}
          <Reveal delay={200} className="flex justify-center md:h-full">
            <PhoneMockup step={STEPS[active]} activeKey={active} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ step, activeKey }: { step: Step; activeKey: number }) {
  return (
    <div className="relative aspect-[9/19] w-full max-w-[290px] overflow-hidden rounded-[2.75rem] border-[11px] border-primary-950 bg-white shadow-2xl shadow-primary-950/25 md:aspect-auto md:h-full">
      {/* Notch */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-primary-950"
      />
      <div key={activeKey} className="swap-in absolute inset-0">
        <PhoneScreen step={step} />
      </div>
    </div>
  );
}

function PhoneScreen({ step }: { step: Step }) {
  const tone = TONE[step.tone];
  const badge = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider uppercase ${tone.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
      {step.screen.badge}
    </span>
  );
  const eyebrow = (
    <p className="text-center font-mono text-[11px] font-semibold tracking-[0.15em] text-primary-600 uppercase">
      {step.screen.eyebrow}
    </p>
  );

  if (step.screen.variant === "home") {
    return (
      <div className="flex h-full flex-col px-6 pt-12 pb-8">
        {eyebrow}
        <div className="mt-8 grid grid-cols-4 gap-3" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="aspect-square rounded-xl bg-primary-100" />
          ))}
        </div>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-primary-100">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-700 to-primary-500" />
        </div>
        <p className="mt-2.5 text-sm text-gray-500">{step.screen.caption}</p>
        <div className="mt-auto flex justify-center pt-8">{badge}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center px-6 pt-12 pb-8 text-center">
      {eyebrow}
      <div
        className={`mt-8 flex h-20 w-20 items-center justify-center rounded-full ${tone.circle}`}
      >
        <step.icon
          className={`h-9 w-9 ${step.spin ? "motion-safe:animate-spin" : ""}`}
        />
      </div>
      <h4 className="mt-6 text-xl font-bold text-gray-900">
        {step.screen.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        {step.screen.desc}
      </p>
      <div className="mt-auto pt-8">{badge}</div>
    </div>
  );
}
