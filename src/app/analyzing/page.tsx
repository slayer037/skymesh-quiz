"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Melbourne — switched from Telstra",
    rating: 5,
    text: "Telstra was charging me $120 for speeds that died at 7pm. Skymesh costs $75 and it's actually faster during peak. I'm genuinely annoyed I didn't switch sooner.",
    date: "2 weeks ago"
  },
  {
    name: "James K.",
    location: "Brisbane",
    rating: 5,
    text: "Router turned up Tuesday. Plugged it in Wednesday. Was on a Zoom call by 9am. No technician. No waiting around. No drama.",
    date: "1 month ago"
  },
  {
    name: "Michelle T.",
    location: "Sydney",
    rating: 5,
    text: "First bill: exactly what they said. Second bill: exactly what they said. No mystery charges. No 'service fees'. Just internet. Revolutionary.",
    date: "3 weeks ago"
  },
  {
    name: "David L.",
    location: "Perth",
    rating: 5,
    text: "8pm Sunday. Called support expecting to wait an hour. Human answered in 90 seconds. Fixed my problem while I was still surprised they picked up.",
    date: "1 week ago"
  },
  {
    name: "Emma R.",
    location: "Adelaide",
    rating: 5,
    text: "3 teenagers all streaming different things. Husband gaming. Me on a work call. Not one buffer. Not one complaint. First time ever.",
    date: "2 months ago"
  }
];

const analysisSteps = [
  { text: "Crunching your household size...", duration: 800 },
  { text: "Counting all those devices...", duration: 900 },
  { text: "Finding the speed sweet spot...", duration: 1000 },
  { text: "Picking your plan...", duration: 1200 }
];

export default function AnalyzingPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [currentReview, setCurrentReview] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Progress through analysis steps
  useEffect(() => {
    let totalTime = 0;
    const timeouts: NodeJS.Timeout[] = [];

    analysisSteps.forEach((step, index) => {
      totalTime += step.duration;
      const timeout = setTimeout(() => {
        setAnalysisStep(index + 1);
        setProgress(((index + 1) / analysisSteps.length) * 100);
      }, totalTime);
      timeouts.push(timeout);
    });

    // Navigate after all steps complete
    const finalTimeout = setTimeout(() => {
      router.push("/recommended");
    }, totalTime + 600);
    timeouts.push(finalTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [router]);

  const review = reviews[currentReview];

  return (
    <main className="page-shell">
      <div className="page-texture" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col px-5 py-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-skymesh-orange via-orange-500 to-amber-400 shadow-glow">
              <span className="text-xl font-extrabold text-white">S</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Skymesh</span>
          </div>
        </header>

        {/* Analysis animation */}
        <div className="mb-10 flex flex-col items-center" role="status" aria-live="polite">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-skymesh-orange/15 blur-2xl" />
            <div className="absolute inset-4 rounded-full bg-white/90 shadow-soft" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 2, ease: "linear" }}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white border-t-skymesh-orange"
            aria-hidden="true"
          />
          </div>
          
          <motion.h1
            key={analysisStep}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-center text-2xl font-display text-slate-900"
          >
            {analysisStep < analysisSteps.length 
              ? analysisSteps[analysisStep].text
              : "Perfect match found!"
            }
          </motion.h1>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-56 overflow-hidden rounded-full bg-white/80 shadow-input">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-skymesh-orange via-orange-500 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="sr-only">{`Progress ${Math.round(progress)}%`}</span>
        </div>

        {/* Social proof section */}
        <div className="flex-1">
          <div className="mb-5 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-600">Over 600 five-star reviews</span>
          </div>

          {/* Review carousel */}
          <div className="relative min-h-[12rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
                className="card"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-skymesh-orange/15 to-amber-100 font-bold text-skymesh-orange">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.location}</p>
                    </div>
                  </div>
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
                </div>
                <p className="text-slate-600">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-3 text-xs text-slate-400">{review.date}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Review dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentReview 
                    ? "w-4 bg-gradient-to-r from-skymesh-orange to-amber-400" 
                    : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom trust badges */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            No lock-in contract
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            30-day guarantee
          </span>
        </div>
      </div>
    </main>
  );
}
