"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CheckIcon, HelpIcon } from "./icons";

// ---- Content ----
const INTRO = {
  eyebrow: "Sell More with Confidence",
  // Heading rendered as segments so a keyword can carry the animated gradient.
  headline: [
    { text: "No need to " },
    { text: "hesitate", gradient: true },
    { text: " anymore" },
  ],
  bodyBefore: "Offer easy instalment plans and help more customers take home the smartphones they need. With ",
  bodyBold: "Abans Tiken Tika Pay",
  bodyAfter: ", grow your showroom sales confidently.",
};

// Before/after toggle states (mindset shift from the campaign brief).
const TOGGLE = {
  caption: "The showroom floor, before and after",
  options: [
    { key: "without", label: "Without SmartPay" },
    { key: "with", label: "With SmartPay" },
  ],
  states: {
    without: {
      tone: "worry" as const,
      title: "“What if the customer misses a payment?”",
      sub: "The hesitation every sales rep feels.",
    },
    with: {
      tone: "confidence" as const,
      title: "“We can sell with confidence.”",
      sub: "SmartPay has your showroom covered.",
    },
  },
};

const SOLUTION = {
  eyebrow: "Abans SmartPay",
  title: "Now, SmartPay Is Here for You",
  body: "Abans SmartPay gives your showroom greater protection and better control over instalment smartphone sales.",
  points: [
    "Reduces risk of missed payments",
    "Encourages customers to pay on time",
    "Gives your sales team confidence to promote Tiken Tika Pay actively",
  ],
};

type ToggleKey = "without" | "with";

export default function WhySmartPay() {
  return (
    <section id="why-smartpay" className="scroll-mt-16 bg-gray-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:gap-14 md:py-24 lg:grid-cols-2">
        {/* ---- Left column: intro + before/after toggle ---- */}
        <Reveal className="text-center lg:text-left">
          <Eyebrow>{INTRO.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {INTRO.headline.map((part, i) =>
              part.gradient ? (
                <span key={i} className="gradient-text">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            {INTRO.bodyBefore}
            <span className="font-bold text-gray-900">{INTRO.bodyBold}</span>
            {INTRO.bodyAfter}
          </p>

          <div className="mt-8 text-left">
            <BeforeAfterToggle />
          </div>
        </Reveal>

        {/* ---- Right column: SmartPay card ---- */}
        <Reveal delay={150}>
          <div className="card-hover relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-lg shadow-primary-950/5 sm:p-9 lg:text-left">
            {/* Animated gradient top border */}
            <span
              aria-hidden="true"
              className="gradient-bar absolute inset-x-0 top-0 h-1.5"
            />

            <Eyebrow>{SOLUTION.eyebrow}</Eyebrow>
            <h3 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {SOLUTION.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              {SOLUTION.body}
            </p>

            <ul className="mt-6 space-y-4 text-left">
              {SOLUTION.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-good-100 text-good-700">
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-gray-800 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
      {children}
    </p>
  );
}

function BeforeAfterToggle() {
  const [active, setActive] = useState<ToggleKey>("with");
  const state = TOGGLE.states[active];
  const isWorry = state.tone === "worry";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-primary-950/5 sm:p-6">
      <p className="text-[11px] font-bold tracking-[0.18em] text-gray-500 uppercase">
        {TOGGLE.caption}
      </p>

      {/* Sliding segmented control */}
      <div className="relative mt-4 flex rounded-full bg-primary-100 text-sm font-semibold">
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1/2 rounded-full bg-primary-800 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active === "with" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        {TOGGLE.options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setActive(option.key as ToggleKey)}
            className={`relative z-10 flex-1 cursor-pointer rounded-full py-3 transition-colors duration-300 ${
              active === option.key ? "text-white" : "text-primary-800"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Swappable result box */}
      <div
        key={active}
        className={`swap-in mt-5 flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 ${
          isWorry ? "bg-alert-50" : "bg-good-50"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${
            isWorry ? "bg-alert-600" : "bg-good-600"
          }`}
        >
          {isWorry ? (
            <HelpIcon className="h-5 w-5" />
          ) : (
            <CheckIcon className="h-5 w-5" strokeWidth={3} />
          )}
        </span>
        <div>
          <p
            className={`text-base font-bold ${
              isWorry ? "text-alert-700" : "text-good-700"
            }`}
          >
            {state.title}
          </p>
          <p className="mt-0.5 text-sm text-gray-600">{state.sub}</p>
        </div>
      </div>
    </div>
  );
}
