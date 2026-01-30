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
  household: "2",
  devices: "6-10",
  usage: ["Video streaming", "Emails & browsing"]
};

const usageDetails: Record<string, string> = {
  "Video calls": "stable upload speeds for clear calls",
  "Emails & browsing": "quick page loads on multiple devices",
  Gaming: "low-latency performance",
  "Video streaming": "smooth HD streaming",
  "Large file downloads": "consistent download bursts",
  "Phone calls": "reliable VoIP quality"
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
    const keyNeeds = usageList.slice(0, 3).map((item) => usageDetails[item]).filter(Boolean);
    const usagePhrase = usageList.length > 1
      ? `${usageList.slice(0, -1).join(", ")} and ${usageList[usageList.length - 1]}`
      : usageList[0];

    return `With ${answers.household} people and ${answers.devices} devices, Fibre Plus balances speed and value for ${usagePhrase}. The plan focuses on ${keyNeeds.join(", ")}, so your household stays connected without slowdowns.`;
  }, [answers]);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 py-6">
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
            Your best match
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Fibre Plus</h1>
          <p className="mt-1 text-slate-500">
            Designed for households with 2-3 users streaming in HD and browsing simultaneously
          </p>
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
                Most popular
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
          <h3 className="text-lg font-bold text-slate-900">Why this plan fits</h3>
          <p className="mt-2 text-sm text-slate-600">{dynamicCopy}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {answers.household} people
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {answers.devices} devices
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
          className="mt-auto"
        >
          <Link href="/" className="button-primary">
            Continue to checkout
          </Link>
          <p className="mt-3 text-center text-xs text-slate-400">
            You can review plan details before confirming.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
