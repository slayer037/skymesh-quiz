"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ThankYou() {
  const shouldReduceMotion = useReducedMotion();
  const [activation, setActivation] = useState({
    avc: ""
  });
  const [activationComplete, setActivationComplete] = useState(false);



  const orderDetails = {
    orderNumber: "SKY-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    name: "Jane Citizen",
    email: "jane@example.com",
    address: "3A Cadle Court, Bayswater VIC 3153",
    plan: "Fibre Plus",
    router: "Tenda AC1200",
    monthlyPrice: "$74.95"
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex max-w-lg flex-col px-5 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skymesh-orange shadow-sm">
            <span className="text-xl font-extrabold text-white">S</span>
          </div>
          <span className="text-lg font-bold text-slate-800">Skymesh</span>
        </header>

        {/* Status Icon */}
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-6"
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            {!activationComplete ? (
              <>
                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-500/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white border-4 border-amber-500 shadow-xl">
                  <span className="text-4xl">⚠️</span>
                </div>
              </>
            ) : (
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-slate-900 leading-tight">
            {!activationComplete ? (
              <>
                Payment Received
                <br />
                Activation Pending
              </>
            ) : "You're all set!"}
          </h1>
          <p className="text-base text-slate-600 px-4">
            {!activationComplete 
              ? "Your order is in the system, but we can't start the connection until you provide your AVC ID below."
              : `Thanks ${orderDetails.name.split(' ')[0]}, your connection is now being processed.`
            }
          </p>
        </motion.div>

        {/* Activation */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.45 }}
          className="mb-6"
        >
          <div className="card space-y-6">
            {!activationComplete ? (
              <div className="space-y-6">
                {/* Video Placeholder */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-skymesh-orange/20 text-skymesh-orange backdrop-blur-sm transition-transform hover:scale-110">
                      <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white">How to find your AVC ID</p>
                    <p className="mt-1 text-xs text-slate-400">Watch this 45-second guide</p>
                  </div>
                  {/* Decorative gradient for the 'video' look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="rounded-2xl border border-skymesh-orange/20 bg-orange-50/50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange text-white">
                      <span className="text-[10px] font-bold">!</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 leading-snug">Mandatory identification</p>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        We can't do anything without your AVC ID. You can find it on your current internet bill. This ensures your swap happens without any downtime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block" htmlFor="activation-avc-id">
                      Enter your AVC ID
                    </label>
                    <input
                      id="activation-avc-id"
                      className="input font-mono text-lg tracking-widest placeholder:tracking-normal placeholder:font-sans"
                      placeholder="e.g. AVC123456789"
                      spellCheck={false}
                      value={activation.avc}
                      onChange={(e) => setActivation((prev) => ({
                        ...prev,
                        avc: e.target.value.toUpperCase()
                      }))}
                    />
                  </div>
                  
                  <button
                    type="button"
                    className="button-primary h-14 text-lg"
                    disabled={activation.avc.length < 5}
                    onClick={() => setActivationComplete(true)}
                  >
                    Submit your AVC
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 rounded-2xl bg-green-50 p-5 text-green-900 ring-1 ring-green-100">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg">AVC Received!</p>
                  <p className="text-sm text-green-800 font-medium">We've got everything we need now. We'll handle the rest.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
          className="card mb-6"
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm font-medium text-slate-500">Order number</span>
            <span className="font-mono text-base font-bold text-skymesh-orange">
              {orderDetails.orderNumber}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan</span>
              <span className="font-medium text-slate-900">{orderDetails.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Router</span>
              <span className="font-medium text-slate-900">{orderDetails.router}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Installation</span>
              <span className="max-w-[180px] text-right font-medium text-slate-900">
                {orderDetails.address}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Monthly plan</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">
                {orderDetails.monthlyPrice}
                <span className="text-sm font-normal text-slate-500">/mo</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Email notice */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
          className="mb-6 flex items-start gap-4 rounded-2xl border border-skymesh-orange/20 bg-orange-50/50 p-4"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange/10">
            <span className="text-lg">📧</span>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Check your inbox</p>
            <p className="text-sm text-slate-600">
              Confirmation sent to <strong>{orderDetails.email}</strong>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Don't see it? Check your spam folder.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="mb-5 text-lg font-bold text-slate-900">What happens next</h2>
          <div className="relative space-y-0">
            {[
              { icon: "📋", title: "Confirming your details", desc: "Usually same-day", active: true },
              { icon: "📦", title: "Router ships", desc: "3-5 business days via AusPost with tracking" },
              { icon: "🌐", title: "Get connected", desc: "Plug in and go — setup guide included" }
            ].map((step, i) => (
              <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Vertical line */}
                {i < 2 && (
                  <div className="absolute left-5 top-10 h-full w-0.5 bg-slate-200" />
                )}
                {/* Icon */}
                <div className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${step.active ? 'bg-skymesh-orange/10 ring-2 ring-skymesh-orange' : 'bg-slate-100'}`}>
                  <span className="text-lg">{step.icon}</span>
                </div>
                {/* Content */}
                <div className="pt-1.5">
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referral */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.55 }}
          className="mb-6 rounded-2xl border border-skymesh-orange/20 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange/10">
              <span className="text-xl">🎁</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Know someone stuck with slow internet?</p>
              <p className="text-sm text-slate-600">
                Send them our way — they'll get $20 off, you'll get $20 credit.
              </p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-skymesh-orange shadow-sm hover:bg-orange-50 transition">
            Share your referral link
          </button>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.65 }}
          className="mb-6 rounded-2xl bg-skymesh-navy p-5 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="font-semibold">Questions? We&apos;re here</p>
              <p className="text-sm text-slate-300">
                7 days a week, 7am–10pm AEST
              </p>
              <a href="tel:1300759637" className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-skymesh-orange hover:underline">
                1300 759 637
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.7 }}
          className="mt-auto"
        >
          <Link href="/" className="button-secondary">
            Track your order
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400"
        >
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            Secure checkout
          </span>
          <span>•</span>
          <span>30-day satisfaction guarantee</span>
        </motion.div>
      </div>
    </main>
  );
}
