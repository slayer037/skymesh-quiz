"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const steps = [
  {
    id: "household",
    title: "How many people live in your household?",
    subtitle: "This helps us match the right speed for everyone.",
    options: ["1", "2", "3-4", "5+"]
  },
  {
    id: "devices",
    title: "How many devices connect to your internet?",
    subtitle: "Include phones, TVs, tablets, and smart home gear.",
    options: ["1-5", "6-10", "11-15", "16+"]
  },
  {
    id: "usage",
    title: "How does your household use the internet?",
    subtitle: "Select all that apply.",
    options: [
      { label: "Video calls", icon: "🎥" },
      { label: "Emails & browsing", icon: "📧" },
      { label: "Gaming", icon: "🎮" },
      { label: "Video streaming", icon: "📺" },
      { label: "Large file downloads", icon: "📥" },
      { label: "Phone calls", icon: "☎️" }
    ]
  }
];

const storageKey = "skymeshQuiz";

export default function QuizPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({
    household: "",
    devices: "",
    usage: [] as string[]
  });

  const current = steps[stepIndex];

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
    router.push("/recommended");
  };

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
            Personalised fit
          </div>
        </header>

        <div className="mb-6">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Step {stepIndex + 1} of {steps.length}</span>
            <span>{progress}% complete</span>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < stepIndex;
            const isActive = index === stepIndex;
            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? "border-skymesh-orange bg-skymesh-orange"
                      : isActive
                        ? "border-skymesh-orange bg-white"
                        : "border-slate-200 bg-white"
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
                  <div className={`mx-2 h-0.5 flex-1 ${isCompleted ? "bg-skymesh-orange" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="relative flex-1 overflow-hidden">
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
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">{current.title}</h1>
                <p className="mt-1 text-slate-500">{current.subtitle}</p>
              </div>

              {current.id !== "usage" && (
                <div className="space-y-3">
                  {(current.options as string[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [current.id]: option
                        }))
                      }
                      className={`selection-card ${
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
                      <div>
                        <p className="text-base font-semibold text-slate-900">{option}</p>
                        <p className="text-sm text-slate-500">
                          {current.id === "household"
                            ? "People sharing the connection"
                            : "Connected devices in your home"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {current.id === "usage" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {(current.options as { label: string; icon: string }[]).map((option) => {
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
                        className={`selection-card ${isSelected ? "selected" : ""}`}
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
                            <p className="text-sm text-slate-500">Everyday usage support</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => goToStep(stepIndex - 1)}
                    disabled={stepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() =>
                      stepIndex === steps.length - 1 ? handleFinish() : goToStep(stepIndex + 1)
                    }
                    disabled={!isStepValid()}
                  >
                    {stepIndex === steps.length - 1 ? "See my recommendation" : "Next"}
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400">
                  We only use this to personalise your plan, never for marketing.
                </p>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
