"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const plans = [
  {
    name: "Fibre Starter",
    price: "$59.95",
    ongoing: "$69.95",
    download: "25 Mbps",
    upload: "5 Mbps",
    ideal: "One person, light use. Emails, browsing, one stream at a time.",
    tag: null
  },
  {
    name: "Fibre Plus",
    price: "$74.95",
    ongoing: "$89.95",
    download: "48 Mbps",
    upload: "17 Mbps",
    ideal: "The one most people pick. Handles everything without drama.",
    tag: "Your match"
  },
  {
    name: "Fibre Premium",
    price: "$99.95",
    ongoing: "$109.95",
    download: "90 Mbps",
    upload: "35 Mbps",
    ideal: "For households that demand a lot. 4K, gaming, big uploads.",
    tag: null
  }
];

export default function PlansPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="page-shell">
      <div className="page-texture" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col px-5 py-8">
        <header className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-skymesh-orange via-orange-500 to-amber-400 shadow-glow">
              <span className="text-xl font-extrabold text-white">S</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Skymesh</span>
          </div>
          <Link
            href="/recommended"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← Back
          </Link>
        </header>

        <motion.section
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
          className="mb-7"
        >
          <h1 className="text-3xl font-display text-slate-900">Not feeling it? Pick another.</h1>
          <p className="mt-2 text-base text-slate-600">
            All unlimited. All no lock-in. All cancel-whenever-you-want.
          </p>
        </motion.section>

        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
              className={`rounded-3xl border p-6 shadow-card ${
                plan.tag
                  ? "border-skymesh-orange/30 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50"
                  : "border-slate-200/80 bg-white/90"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  {plan.tag && (
                    <span className="mb-2 inline-block rounded-full border border-skymesh-orange/20 bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-skymesh-orange shadow-input">
                      {plan.tag}
                    </span>
                  )}
                  <h2 className="text-2xl font-display text-slate-900">{plan.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{plan.ideal}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-slate-900 tabular-nums">{plan.price}</p>
                  <p className="text-xs text-slate-500">/mo for 6 months</p>
                  <p className="text-xs text-slate-600">Then {plan.ongoing}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-6 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{plan.download}</p>
                  <p className="text-xs text-slate-500">Download</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{plan.upload}</p>
                  <p className="text-xs text-slate-500">Upload</p>
                </div>
              </div>

              <Link
                href="/"
                className={`mt-5 block w-full rounded-2xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.tag
                    ? "bg-gradient-to-r from-skymesh-orange via-orange-500 to-amber-400 text-white shadow-soft hover:shadow-glow"
                    : "bg-white/80 text-slate-700 shadow-input hover:bg-white"
                }`}
              >
                Continue with {plan.name.split(" ")[1]}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Questions? Call 1300 759 637 — real humans, 7 days a week
        </p>
      </div>
    </main>
  );
}
