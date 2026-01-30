"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const storageKey = "skymeshQuiz";

type QuizAnswers = {
  household: string;
  devices: string;
  usage: string[];
};

const defaultAnswers: QuizAnswers = {
  household: "Duo — 2 of us",
  devices: "6-10 devices",
  usage: ["Streaming", "Browsing & email"]
};

const usageDetails: Record<string, string> = {
  "Video calls": "Zoom calls where your face doesn't freeze mid-sentence",
  "Browsing & email": "pages that load before you lose interest",
  Gaming: "ping low enough to actually win",
  Streaming: "Netflix without the spinning wheel",
  "Big downloads": "game updates that finish before you give up",
  "Home phone": "calls that don't sound like you're underwater"
};

export default function RecommendedPage() {
  const shouldReduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as QuizAnswers;
        if (parsed?.household && parsed?.devices && Array.isArray(parsed?.usage)) {
          setAnswers({
            household: parsed.household,
            devices: parsed.devices,
            usage: parsed.usage.length ? parsed.usage : defaultAnswers.usage
          });
        }
      } catch {
        setAnswers(defaultAnswers);
      }
    }
  }, []);

  const dynamicCopy = useMemo(() => {
    const usageList = answers.usage.length ? answers.usage : defaultAnswers.usage;
    const keyNeed = usageList.slice(0, 1).map((item) => usageDetails[item]).filter(Boolean)[0];
    
    const householdText = answers.household.includes("Solo") ? "a household of one" : 
      answers.household.includes("Duo") ? "two people" :
      answers.household.includes("Busy") ? "a busy household" :
      "a full house";
    
    const deviceComment = parseInt(answers.devices) > 10 || answers.devices.includes("11") || answers.devices.includes("16")
      ? "That's a lot of devices fighting for bandwidth."
      : "Plenty of headroom for everything to connect.";

    return `${householdText} with ${answers.devices} devices? ${deviceComment} Fibre Plus gives you ${keyNeed || "reliable speed for everything"} — without paying for overkill.`;
  }, [answers]);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-white pb-32">
      <div className="mx-auto max-w-lg px-5 py-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skymesh-orange shadow-sm">
              <span className="text-xl font-extrabold text-white">S</span>
            </div>
            <span className="text-lg font-bold text-slate-800">Skymesh</span>
          </div>
          <div className="trust-badge">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Recommendation ready
          </div>
        </header>

        <motion.section
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-skymesh-orange">
            We found it
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Fibre Plus</h1>
          <p className="mt-1 text-slate-500">
            Fast enough that nobody complains. Priced so you don't overpay. The Goldilocks plan.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-500">Over 600 five-star reviews</span>
          </div>
        </motion.section>

        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="card-highlight mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-skymesh-orange/10 px-3 py-1 text-xs font-semibold text-skymesh-orange">
                <span className="h-2 w-2 rounded-full bg-skymesh-orange" />
                47% of customers choose this
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900">Fibre Plus</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">$74.95</p>
              <p className="text-xs text-slate-500">/month for first 6 months</p>
              <p className="text-sm font-semibold text-slate-700 tabular-nums">Then $89.95 ongoing</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="flex items-center justify-between rounded-xl bg-white/70 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Unlimited data</p>
                <p className="text-xs text-slate-500">No usage caps or overage fees</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-skymesh-orange/10 text-skymesh-orange">
                <span className="text-xl font-bold">∞</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/70 p-4">
              <p className="text-sm font-semibold text-slate-700">Typical evening speeds</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">48 Mbps</p>
                  <p className="text-xs text-slate-500">Download</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">17 Mbps</p>
                  <p className="text-xs text-slate-500">Upload</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-bold text-slate-900">Why this one?</h3>
          <p className="mt-2 text-sm text-slate-600">{dynamicCopy}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {answers.household}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {answers.devices}
            </span>
            {answers.usage.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
          className="rounded-xl bg-amber-50 border border-amber-200/60 px-4 py-3 text-center mb-4"
        >
          <p className="text-sm font-medium text-amber-800">
            🔥 127 people signed up this week
          </p>
        </motion.div>

        <Link
          href="/plans"
          className="mx-auto block w-fit text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-slate-700 hover:decoration-slate-400"
        >
          Compare all plans
        </Link>
      </div>

      {/* Sticky footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-lg">
        <div className="mx-auto max-w-lg">
          <Link href="/" className="button-primary">
            Continue with Fibre Plus
          </Link>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              30-day guarantee
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              No lock-in
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
