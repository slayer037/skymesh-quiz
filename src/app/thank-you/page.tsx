"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function ThankYou() {
  // In a real app, this would come from order state/context
  const orderDetails = {
    orderNumber: "SKY-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    name: "Jane Citizen",
    email: "jane@example.com",
    address: "3A Cadle Court, Bayswater VIC 3153",
    plan: "nbn 100/20",
    router: "Tenda v12",
    monthlyPrice: "$79"
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 py-8">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skymesh-orange">
            <span className="text-xl font-black text-white">S</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Skymesh</span>
        </div>

        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-skymesh-orange to-skymesh-coral shadow-lg"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            You&apos;re all set! 🎉
          </h1>
          <p className="text-lg text-slate-500">
            Your order has been placed successfully.
          </p>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Order Number
            </span>
            <span className="font-mono text-lg font-bold text-skymesh-orange">
              {orderDetails.orderNumber}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan</span>
              <span className="font-semibold text-slate-900">{orderDetails.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Router</span>
              <span className="font-semibold text-slate-900">{orderDetails.router}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Installation address</span>
              <span className="max-w-[200px] text-right font-semibold text-slate-900">
                {orderDetails.address}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Monthly plan</span>
              <span className="font-semibold text-slate-900">{orderDetails.monthlyPrice}/mo</span>
            </div>
          </div>
        </motion.div>

        {/* Confirmation email notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 flex items-start gap-3 rounded-2xl bg-skymesh-orange/10 p-4"
        >
          <span className="text-2xl">📧</span>
          <div>
            <p className="font-semibold text-slate-900">Check your inbox</p>
            <p className="text-sm text-slate-600">
              We&apos;ve sent a confirmation email to <strong>{orderDetails.email}</strong> with all
              the details.
            </p>
          </div>
        </motion.div>

        {/* What's next */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-lg font-bold text-slate-900">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange text-sm font-bold text-white">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">We&apos;ll process your order</p>
                <p className="text-sm text-slate-500">This usually takes 1-2 business days.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange text-sm font-bold text-white">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Your router ships</p>
                <p className="text-sm text-slate-500">
                  Expect delivery in 3-5 business days via Australia Post.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange text-sm font-bold text-white">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Get connected</p>
                <p className="text-sm text-slate-500">
                  Plug in your router and you&apos;re online. Easy setup guide included.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card mb-6 border-skymesh-teal/20 bg-skymesh-teal/5"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold text-slate-900">Need help?</p>
              <p className="text-sm text-slate-600">
                Our support team is available 7am–10pm AEST.{" "}
                <a href="tel:1300759637" className="font-semibold text-skymesh-teal hover:underline">
                  1300 759 637
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-auto"
        >
          <Link href="/" className="button-secondary">
            Back to homepage
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
