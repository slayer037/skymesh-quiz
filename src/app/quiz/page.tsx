"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const steps = [
  {
    id: "household",
    title: "How crowded is your WiFi?",
    subtitle: "Bandwidth wars at 7pm? We'll size your connection right.",
    options: ["Solo — just me", "Duo — 2 of us", "Busy — 3-4 people", "Chaos — 5+"]
  },
  {
    id: "devices",
    title: "Count everything that connects",
    subtitle: "Phones. Laptops. That TV. The tablet no one admits to using in bed.",
    options: ["1-5 devices", "6-10 devices", "11-15 devices", "16+ (basically a hotel)"]
  },
  {
    id: "usage",
    title: "What actually matters to you?",
    subtitle: "Pick your non-negotiables. We'll make sure they never buffer.",
    options: [
      { label: "Video calls", icon: "🎥", hint: "Zoom, Teams, FaceTime" },
      { label: "Browsing & email", icon: "📧", hint: "News, shopping, work stuff" },
      { label: "Gaming", icon: "🎮", hint: "PlayStation, Xbox, PC online" },
      { label: "Streaming", icon: "📺", hint: "Netflix, YouTube, Stan, Binge" },
      { label: "Big downloads", icon: "📥", hint: "Game installs, 4K movies, OS updates" },
      { label: "Home phone", icon: "☎️", hint: "VoIP using your landline number" }
    ]
  }
];

const storageKey = "skymeshQuiz";

export default function QuizPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const questionRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({
    household: "",
    devices: "",
    usage: [] as string[]
  });

  const current = steps[stepIndex];

  // Scroll to question area on step change (mobile UX)
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stepIndex]);

  const variants = useMemo(
    () => ({
      enter: (d: number) => (shouldReduceMotion ? { opacity: 0 } : { x: d > 0 ? 60 : -60, opacity: 0 }),
      center: { x: 0, opacity: 1 },
      exit: (d: number) => (shouldReduceMotion ? { opacity: 0 } : { x: d > 0 ? -60 : 60, opacity: 0 })
    }),
    [shouldReduceMotion]
  );

  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex]
  );

  const isStepValid = () => {
    if (current.id === "household") return answers.household.length > 0;
    if (current.id === "devices") return answers.devices.length > 0;
    return answers.usage.length > 0;
  };

  const goToStep = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= steps.length) return;
    setDirection(nextIndex > stepIndex ? 1 : -1);
    setStepIndex(nextIndex);
  };

  const handleFinish = () => {
    if (!isStepValid()) return;
    localStorage.setItem(storageKey, JSON.stringify(answers));
    router.push("/analyzing");
  };

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
          <div className="trust-badge">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Personalised fit
          </div>
        </header>

        <div className="mb-6 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-card backdrop-blur">
          <div className="progress-bar">
            <div
              className="progress-fill bg-gradient-to-r from-skymesh-orange via-orange-500 to-amber-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Step {stepIndex + 1} of {steps.length}</span>
            <span>{progress}% complete</span>
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-white/70 bg-gradient-to-r from-white/80 via-amber-50/40 to-white/80 p-5 shadow-card backdrop-blur">
          <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < stepIndex;
            const isActive = index === stepIndex;
            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${
                    isCompleted
                      ? "border-skymesh-orange bg-gradient-to-br from-skymesh-orange via-orange-500 to-amber-400 text-white shadow-glow"
                      : isActive
                        ? "border-skymesh-orange/70 bg-white/90 shadow-luxe ring-4 ring-skymesh-orange/10"
                        : "border-white/80 bg-white/70 shadow-input"
                  }`}
                  aria-label={`Step ${index + 1}`}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className={`text-sm font-semibold ${isActive ? "text-skymesh-orange" : "text-slate-400"}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${isCompleted ? "bg-gradient-to-r from-skymesh-orange/80 to-amber-400/80" : "bg-slate-200/80"}`}
                  />
                )}
              </div>
            );
          })}
          </div>
        </div>

        <div className="relative flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={current.id}
              custom={direction}
              variants={variants}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit="exit"
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
              className="flex min-h-full flex-col"
            >
              <div ref={questionRef} className="mb-7 scroll-mt-4">
                <h1 className="text-3xl font-display text-slate-900">{current.title}</h1>
                <p className="mt-2 text-base text-slate-600">{current.subtitle}</p>
              </div>

              {current.id !== "usage" && (
                <div className="space-y-3">
                  {(current.options as string[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          [current.id]: option
                        }));
                        // Auto-advance after brief delay for visual feedback
                        setTimeout(() => goToStep(stepIndex + 1), 200);
                      }}
                      className={`selection-card quiz-card ${
                        (current.id === "household" && answers.household === option) ||
                        (current.id === "devices" && answers.devices === option)
                          ? "selected"
                          : ""
                      }`}
                      aria-pressed={
                        (current.id === "household" && answers.household === option) ||
                        (current.id === "devices" && answers.devices === option)
                      }
                    >
                      <div className="radio-indicator" />
                      <p className="text-base font-semibold text-slate-900">{option}</p>
                    </button>
                  ))}
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      className="mt-2 text-center text-sm font-medium text-slate-500 hover:text-slate-700 transition py-2 w-full"
                      onClick={() => goToStep(stepIndex - 1)}
                    >
                      ← Back
                    </button>
                  )}
                </div>
              )}

              {current.id === "usage" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {(current.options as { label: string; icon: string; hint: string }[]).map((option) => {
                    const isSelected = answers.usage.includes(option.label);
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            usage: isSelected
                              ? prev.usage.filter((item) => item !== option.label)
                              : [...prev.usage, option.label]
                          }))
                        }
                        className={`selection-card quiz-card ${isSelected ? "selected" : ""}`}
                        aria-pressed={isSelected}
                      >
                        <div className={`checkbox ${isSelected ? "checked" : ""}`}>
                          {isSelected && (
                            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl" aria-hidden="true">{option.icon}</span>
                          <div>
                            <p className="text-base font-semibold text-slate-900">{option.label}</p>
                            <p className="text-sm text-slate-500">{option.hint}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {current.id === "usage" ? (
                  <>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => goToStep(stepIndex - 1)}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleFinish}
                        disabled={!isStepValid()}
                      >
                        Find my plan
                      </button>
                    </div>
                    <p className="text-center text-xs text-slate-400">
                      This isn't a data grab. It's how we stop recommending the wrong plan.
                    </p>
                  </>
                ) : (
                  <p className="text-center text-sm text-slate-400">
                    Tap an option to continue
                  </p>
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
