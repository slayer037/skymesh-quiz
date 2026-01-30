"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const steps = [
  {
    id: "contact",
    title: "Let's get your details",
    subtitle: "We grabbed some of this from your address check"
  },
  {
    id: "address",
    title: "This is where we're connecting you",
    subtitle: "The good news: nbn® is ready to go here"
  },
  {
    id: "router",
    title: "How do you want to WiFi?",
    subtitle: "Pick one, or use what you've already got"
  },
  {
    id: "review",
    title: "Quick sanity check",
    subtitle: "Make sure we got everything right"
  },
  {
    id: "payment",
    title: "Almost done",
    subtitle: "One more click and you're in"
  }
];

const routerOptions = [
  { 
    id: "tenda",
    name: "Tenda AC1200", 
    price: 139.99, 
    desc: "Handles apartments and small homes. Most people pick this.",
    features: ["Dual-band WiFi", "80m² coverage", "Zero setup drama"],
    tag: "Most picked"
  },
  { 
    id: "mesh",
    name: "NF20 Mesh System", 
    price: 244.99, 
    desc: "Kills dead spots. For bigger homes or thick walls.",
    features: ["Mesh network", "200m² coverage", "Works between floors"],
    tag: null
  },
  { 
    id: "voip",
    name: "Grandstream HT801", 
    price: 89.99, 
    desc: "Plug in your existing landline phone. Keep your number.",
    features: ["Uses your old phone", "Crystal clear calls", "5-min setup"],
    tag: null
  },
  { 
    id: "byo",
    name: "Bring Your Own", 
    price: 0, 
    desc: "Already have one? Skip the hardware cost.",
    features: ["Must be nbn® compatible", "DIY setup", "We're still here if you get stuck"],
    tag: null
  }
];

const planOptions = [
  {
    id: "fibre-plus",
    name: "Fibre Plus",
    price: 74.95,
    desc: "Balanced speed for everyday streaming and work."
  },
  {
    id: "fibre-max",
    name: "Fibre Max",
    price: 89.95,
    desc: "Extra speed for busy households and gamers."
  }
];

export default function Home() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  
  const [form, setForm] = useState({
    firstName: "Jane",
    lastName: "Citizen",
    email: "",
    phone: "0412 345 678",
    address: "3A Cadle Court, Bayswater VIC 3153",
    addressAlternateName: false,
    addressAltName: "",
    postalDifferent: false,
    postalAddress1: "",
    postalCity: "",
    postalState: "",
    postalPostcode: "",
    router: "",
    plan: "fibre-plus",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  const [editModal, setEditModal] = useState<null | "contact" | "address" | "router" | "plan">(null);
  const [modalDraft, setModalDraft] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    router: "",
    plan: ""
  });

  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex]
  );

  const selectedRouter = routerOptions.find(r => r.id === form.router);
  const routerPrice = selectedRouter?.price ?? 0;
  const selectedPlan = planOptions.find(p => p.id === form.plan) ?? planOptions[0];

  const goToStep = (nextIndex: number) => {
    setDirection(nextIndex > stepIndex ? 1 : -1);
    setStepIndex(nextIndex);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openEditModal = (type: "contact" | "address" | "router" | "plan") => {
    setModalDraft({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      router: form.router,
      plan: form.plan
    });
    setEditModal(type);
  };

  const handleModalSave = () => {
    setForm((prev) => ({
      ...prev,
      firstName: modalDraft.firstName,
      lastName: modalDraft.lastName,
      email: modalDraft.email,
      phone: modalDraft.phone,
      address: modalDraft.address,
      router: modalDraft.router,
      plan: modalDraft.plan
    }));
    setEditModal(null);
  };

  const current = steps[stepIndex];

  useEffect(() => {
    if (current?.id === "router" && !form.router) {
      setForm((prev) => ({ ...prev, router: "tenda" }));
    }
  }, [current?.id, form.router]);

  const variants = useMemo(
    () => ({
      enter: (d: number) => (shouldReduceMotion ? { opacity: 0 } : { x: d > 0 ? 60 : -60, opacity: 0 }),
      center: { x: 0, opacity: 1 },
      exit: (d: number) => (shouldReduceMotion ? { opacity: 0 } : { x: d > 0 ? -60 : 60, opacity: 0 })
    }),
    [shouldReduceMotion]
  );

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex max-w-lg flex-col px-5 py-6">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skymesh-orange shadow-sm">
              <span className="text-xl font-extrabold text-white">S</span>
            </div>
            <span className="text-lg font-bold text-slate-800">Skymesh</span>
          </div>
          <div className="trust-badge">
            <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Secure signup
          </div>
        </header>

        {/* Plan summary */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Your plan:</span>
            <span className="text-sm font-bold text-slate-900">{selectedPlan.name}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">${selectedPlan.price.toFixed(2)}<span className="font-normal text-slate-500">/mo</span></span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
            <span>Step {stepIndex + 1} of {steps.length}</span>
            <span>{progress}% complete</span>
          </div>
        </div>

        {/* Content */}
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
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">{current.title}</h1>
                <p className="mt-1 text-slate-500">{current.subtitle}</p>
              </div>

              {/* Step content */}
              {current.id === "contact" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="first-name">First name</label>
                      <input
                        id="first-name"
                        className="input mt-2"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="last-name">Last name</label>
                      <input
                        id="last-name"
                        className="input mt-2"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="email-address">Email address</label>
                    <input
                      id="email-address"
                      type="email"
                      className="input mt-2"
                      placeholder="jane@example.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="mobile-number">Mobile number</label>
                    <input
                      id="mobile-number"
                      type="tel"
                      className="input mt-2"
                      placeholder="0412 345 678"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    No spam. No third parties. Just your connection updates.
                  </p>
                </div>
              )}

              {current.id === "address" && (
                <div className="space-y-4">
                  <div className="card-highlight">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-skymesh-orange/10">
                        <span className="text-lg">📍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{form.address}</p>
                        <p className="text-sm text-slate-500">nbn® Fixed Line available</p>
                      </div>
                    </div>
                  </div>

                  <input
                    id="address-alternate-name"
                    type="checkbox"
                    className="sr-only"
                    checked={form.addressAlternateName}
                    onChange={(e) => handleChange("addressAlternateName", e.target.checked)}
                  />
                  <label className="checkbox-container" htmlFor="address-alternate-name">
                    <div className={`checkbox ${form.addressAlternateName ? 'checked' : ''}`}>
                      {form.addressAlternateName && (
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-slate-700">My property is known by another name</span>
                  </label>

                  {form.addressAlternateName && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                    >
                      <input
                        className="input"
                        placeholder="Property or lot name"
                        value={form.addressAltName}
                        onChange={(e) => handleChange("addressAltName", e.target.value)}
                      />
                    </motion.div>
                  )}

                  <input
                    id="postal-different"
                    type="checkbox"
                    className="sr-only"
                    checked={form.postalDifferent}
                    onChange={(e) => handleChange("postalDifferent", e.target.checked)}
                  />
                  <label className="checkbox-container" htmlFor="postal-different">
                    <div className={`checkbox ${form.postalDifferent ? 'checked' : ''}`}>
                      {form.postalDifferent && (
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-slate-700">Send mail to a different address</span>
                  </label>

                  {form.postalDifferent && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      <input
                        className="input"
                        placeholder="Street address"
                        value={form.postalAddress1}
                        onChange={(e) => handleChange("postalAddress1", e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className="input"
                          placeholder="City"
                          value={form.postalCity}
                          onChange={(e) => handleChange("postalCity", e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            className="input"
                            placeholder="State"
                            value={form.postalState}
                            onChange={(e) => handleChange("postalState", e.target.value)}
                          />
                          <input
                            className="input"
                            placeholder="Postcode"
                            value={form.postalPostcode}
                            onChange={(e) => handleChange("postalPostcode", e.target.value)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {current.id === "router" && (
                <div className="space-y-3">
                  {routerOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`selection-card w-full text-left ${form.router === opt.id ? "selected" : ""}`}
                      onClick={() => handleChange("router", opt.id)}
                      aria-pressed={form.router === opt.id}
                    >
                      <div className="radio-indicator" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            {opt.tag && (
                              <span className="mb-1 inline-block rounded-full bg-skymesh-orange/10 px-2 py-0.5 text-xs font-semibold text-skymesh-orange">
                                {opt.tag}
                              </span>
                            )}
                            <p className="font-semibold text-slate-900">{opt.name}</p>
                            <p className="text-sm text-slate-500">{opt.desc}</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900 tabular-nums">
                            {opt.price === 0 ? "Free" : `$${opt.price.toFixed(2)}`}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {opt.features.map((f) => (
                            <span key={f} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {current.id === "review" && (
                <div className="space-y-4">
                  {[
                    { label: "Name", value: `${form.firstName} ${form.lastName}`, modal: "contact" },
                    { label: "Email", value: form.email, modal: "contact" },
                    { label: "Phone", value: form.phone, modal: "contact" },
                    { label: "Address", value: form.address, modal: "address" },
                    { label: "Router", value: selectedRouter?.name || "Not selected", modal: "router" }
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm text-slate-500">{row.label}</p>
                        <p className="font-medium text-slate-900">{row.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openEditModal(row.modal as "contact" | "address" | "router")}
                        className="rounded-full px-4 py-1.5 text-sm font-semibold text-skymesh-orange hover:bg-orange-50 transition"
                      >
                        Edit
                      </button>
                    </div>
                  ))}

                  <div className="card-highlight mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Your plan</span>
                      <button
                        type="button"
                        onClick={() => openEditModal("plan")}
                        className="rounded-full px-3 py-1 text-xs font-semibold text-skymesh-orange hover:bg-orange-50 transition"
                      >
                        Edit plan
                      </button>
                    </div>
                    <div className="mt-2 text-lg font-bold text-slate-900 tabular-nums">
                      {selectedPlan.name} — ${selectedPlan.price.toFixed(2)}/mo
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-medium text-green-600">$0 today — only billed once connected</span>
                    </div>
                  </div>
                </div>
              )}

              {current.id === "payment" && (
                <div className="space-y-5">
                  <div className="card-highlight">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Due today</span>
                      <span className="text-2xl font-bold text-slate-900 tabular-nums">
                        {routerPrice === 0 ? (
                          <span className="text-green-600">$0</span>
                        ) : (
                          `$${routerPrice.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {routerPrice === 0 ? "Router included" : "Router only"} — ${selectedPlan.price.toFixed(2)}/mo plan starts once you're connected
                    </p>
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm">
                      <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-medium text-green-700">No monthly charges until we connect you</span>
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="card-name">Name on card</label>
                    <input
                      id="card-name"
                      className="input mt-2"
                      placeholder="Jane Citizen"
                      value={form.cardName}
                      onChange={(e) => handleChange("cardName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="card-number">Card number</label>
                    <input
                      id="card-number"
                      className="input mt-2 font-mono tracking-wider"
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="card-expiry">Expiry</label>
                      <input
                        id="card-expiry"
                        className="input mt-2"
                        placeholder="MM / YY"
                        value={form.cardExpiry}
                        onChange={(e) => handleChange("cardExpiry", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="card-cvc">CVC</label>
                      <input
                        id="card-cvc"
                        className="input mt-2"
                        placeholder="123"
                        value={form.cardCvc}
                        onChange={(e) => handleChange("cardCvc", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className="text-xs text-slate-400">We accept</span>
                    <div className="flex gap-2">
                      <div className="flex h-7 w-11 items-center justify-center rounded bg-white border border-slate-200 text-[10px] font-bold text-[#1A1F71]">VISA</div>
                      <div className="flex h-7 w-11 items-center justify-center rounded bg-white border border-slate-200">
                        <div className="flex">
                          <div className="h-4 w-4 rounded-full bg-[#EB001B] -mr-1.5"></div>
                          <div className="h-4 w-4 rounded-full bg-[#F79E1B]"></div>
                        </div>
                      </div>
                      <div className="flex h-7 w-11 items-center justify-center rounded bg-white border border-slate-200 text-[8px] font-bold text-[#006FCF]">AMEX</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-3 pb-4 pt-6">
                <button
                  type="button"
                  className="button-primary"
                  aria-label={current.id === "payment" ? "Complete order" : undefined}
                  onClick={() => {
                    if (current.id === "payment") {
                      router.push("/thank-you");
                    } else {
                      goToStep(stepIndex + 1);
                    }
                  }}
                >
                  {current.id === "payment" ? (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Start my connection
                    </>
                  ) : current.id === "review" ? "Get connected" : 
                   current.id === "contact" || current.id === "address" ? "Confirm & Continue" : 
                   "Continue"}
                </button>
                {stepIndex > 0 && current.id !== "review" && (
                  <button
                    type="button"
                    className="text-center text-sm font-medium text-slate-500 hover:text-slate-700 transition py-2"
                    onClick={() => goToStep(stepIndex - 1)}
                  >
                    ← Back
                  </button>
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        {editModal && current.id === "review" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  {editModal === "contact" && "Edit contact details"}
                  {editModal === "address" && "Edit address"}
                  {editModal === "router" && "Edit router"}
                  {editModal === "plan" && "Edit plan"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="rounded-full px-2 py-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
                >
                  Close
                </button>
              </div>

              {editModal === "contact" && (
                <div className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className="input"
                      placeholder="First name"
                      value={modalDraft.firstName}
                      onChange={(e) => setModalDraft((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                    <input
                      className="input"
                      placeholder="Last name"
                      value={modalDraft.lastName}
                      onChange={(e) => setModalDraft((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={modalDraft.email}
                    onChange={(e) => setModalDraft((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <input
                    className="input"
                    type="tel"
                    placeholder="Mobile"
                    value={modalDraft.phone}
                    onChange={(e) => setModalDraft((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              )}

              {editModal === "address" && (
                <div className="mt-4 space-y-3">
                  <input
                    className="input"
                    placeholder="Street address"
                    value={modalDraft.address}
                    onChange={(e) => setModalDraft((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              )}

              {editModal === "router" && (
                <div className="mt-4 space-y-3">
                  {routerOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`selection-card w-full text-left ${modalDraft.router === opt.id ? "selected" : ""}`}
                      onClick={() => setModalDraft((prev) => ({ ...prev, router: opt.id }))}
                      aria-pressed={modalDraft.router === opt.id}
                    >
                      <div className="radio-indicator" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            {opt.tag && (
                              <span className="mb-1 inline-block rounded-full bg-skymesh-orange/10 px-2 py-0.5 text-xs font-semibold text-skymesh-orange">
                                {opt.tag}
                              </span>
                            )}
                            <p className="font-semibold text-slate-900">{opt.name}</p>
                            <p className="text-sm text-slate-500">{opt.desc}</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900 tabular-nums">
                            {opt.price === 0 ? "Free" : `$${opt.price.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {editModal === "plan" && (
                <div className="mt-4 space-y-3">
                  {planOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`selection-card w-full text-left ${modalDraft.plan === opt.id ? "selected" : ""}`}
                      onClick={() => setModalDraft((prev) => ({ ...prev, plan: opt.id }))}
                      aria-pressed={modalDraft.plan === opt.id}
                    >
                      <div className="radio-indicator" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{opt.name}</p>
                            <p className="text-sm text-slate-500">{opt.desc}</p>
                          </div>
                          <p className="text-lg font-bold text-slate-900 tabular-nums">
                            ${opt.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleModalSave}
                  className="button-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
