"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const steps = [
  {
    id: "name",
    title: "Let's confirm your details",
    subtitle: "We grabbed these from your address check"
  },
  {
    id: "email",
    title: "Where should we send updates?",
    subtitle: "Order confirmations and service updates go here"
  },
  {
    id: "phone",
    title: "Best number to reach you?",
    subtitle: "We'll only call if there's something urgent"
  },
  {
    id: "dob",
    title: "When's your birthday?",
    subtitle: "Required for account verification"
  },
  {
    id: "address",
    title: "Installation address confirmed",
    subtitle: "This is where we'll connect your service"
  },
  {
    id: "avc",
    title: "Already with another provider?",
    subtitle: "Your AVC ID helps us switch you faster (optional)"
  },
  {
    id: "router",
    title: "Choose your router",
    subtitle: "Or bring your own — we're flexible"
  },
  {
    id: "review",
    title: "Review your order",
    subtitle: "Make sure everything looks right"
  },
  {
    id: "payment",
    title: "Secure payment",
    subtitle: "256-bit SSL encryption protects your details"
  }
];

const routerOptions = [
  { 
    id: "tenda",
    name: "Tenda AC1200", 
    price: 139.99, 
    desc: "Perfect for apartments & small homes",
    features: ["Dual-band WiFi", "Up to 80m² coverage", "Easy plug-n-play setup"]
  },
  { 
    id: "mesh",
    name: "NF20 Mesh System", 
    price: 244.99, 
    desc: "Whole-home coverage for larger spaces",
    features: ["Mesh technology", "Up to 200m² coverage", "Seamless roaming"]
  },
  { 
    id: "voip",
    name: "Grandstream HT801", 
    price: 89.99, 
    desc: "VoIP adapter for your existing phone",
    features: ["Keep your landline number", "Crystal clear calls", "Simple setup"]
  },
  { 
    id: "byo",
    name: "BYO Router", 
    price: 0, 
    desc: "Use your own compatible router",
    features: ["nbn® compatible required", "Limited support", "Advanced users"]
  }
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    address: "3A Cadle Court, Bayswater VIC 3153",
    addressAlternateName: false,
    addressAltName: "",
    avc: "",
    postalDifferent: false,
    postalAddress1: "",
    postalCity: "",
    postalState: "",
    postalPostcode: "",
    router: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex]
  );

  const selectedRouter = routerOptions.find(r => r.id === form.router);
  const routerPrice = selectedRouter?.price ?? 0;

  const goToStep = (nextIndex: number) => {
    setDirection(nextIndex > stepIndex ? 1 : -1);
    setStepIndex(nextIndex);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const current = steps[stepIndex];

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
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 py-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
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
            Secure checkout
          </div>
        </header>

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
              {current.id === "name" && (
                <div className="space-y-4">
                  <div className="card-highlight">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-skymesh-orange/10">
                        <span className="text-xl">👋</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{form.firstName} {form.lastName}</p>
                        <p className="text-sm text-slate-500">Details from your address check</p>
                      </div>
                    </div>
                  </div>
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
                </div>
              )}

              {current.id === "email" && (
                <div className="space-y-4">
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
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    We never share your email with third parties
                  </p>
                </div>
              )}

              {current.id === "phone" && (
                <div className="space-y-4">
                  <div className="card-highlight">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-skymesh-orange/10">
                        <span className="text-lg">📱</span>
                      </div>
                      <p className="font-medium text-slate-700">{form.phone}</p>
                    </div>
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
                </div>
              )}

              {current.id === "dob" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="label" htmlFor="dob-day">Day</label>
                      <input
                        id="dob-day"
                        className="input mt-2 text-center"
                        placeholder="DD"
                        maxLength={2}
                        value={form.dobDay}
                        onChange={(e) => handleChange("dobDay", e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="dob-month">Month</label>
                      <select
                        id="dob-month"
                        className="input mt-2"
                        value={form.dobMonth}
                        onChange={(e) => handleChange("dobMonth", e.target.value)}
                      >
                        <option value="">Month</option>
                        {months.map((m, i) => (
                          <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="dob-year">Year</label>
                      <input
                        id="dob-year"
                        className="input mt-2 text-center"
                        placeholder="YYYY"
                        maxLength={4}
                        value={form.dobYear}
                        onChange={(e) => handleChange("dobYear", e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                  </div>
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

              {current.id === "avc" && (
                <div className="space-y-4">
                  <div className="card bg-slate-50 border-slate-100">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <p className="font-medium text-slate-900">What's an AVC ID?</p>
                        <p className="mt-1 text-sm text-slate-600">Your Access Virtual Circuit ID is on your current provider's bill. It helps us transfer your service faster.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="avc-id">AVC ID (optional)</label>
                    <input
                      id="avc-id"
                      className="input mt-2 font-mono"
                      placeholder="e.g. AVC123456789"
                      spellCheck={false}
                      value={form.avc}
                      onChange={(e) => handleChange("avc", e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
              )}

              {current.id === "router" && (
                <div className="space-y-3">
                  {routerOptions.map((opt) => (
                    <div
                      key={opt.id}
                      className={`selection-card ${form.router === opt.id ? "selected" : ""}`}
                      onClick={() => handleChange("router", opt.id)}
                    >
                      <div className="radio-indicator" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
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
                    </div>
                  ))}
                </div>
              )}

              {current.id === "review" && (
                <div className="space-y-4">
                  {[
                    { label: "Name", value: `${form.firstName} ${form.lastName}`, step: 0 },
                    { label: "Email", value: form.email, step: 1 },
                    { label: "Phone", value: form.phone, step: 2 },
                    { label: "Date of birth", value: form.dobDay && form.dobMonth && form.dobYear ? `${form.dobDay}/${form.dobMonth}/${form.dobYear}` : "Not provided", step: 3 },
                    { label: "Address", value: form.address, step: 4 },
                    { label: "Router", value: selectedRouter?.name || "Not selected", step: 6 }
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm text-slate-500">{row.label}</p>
                        <p className="font-medium text-slate-900">{row.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => goToStep(row.step)}
                        className="rounded-full px-4 py-1.5 text-sm font-semibold text-skymesh-orange hover:bg-orange-50 transition"
                      >
                        Edit
                      </button>
                    </div>
                  ))}

                  <div className="card-highlight mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Your plan</span>
                      <span className="text-lg font-bold text-slate-900 tabular-nums">nbn® 100/20 — $79/mo</span>
                    </div>
                  </div>
                </div>
              )}

              {current.id === "payment" && (
                <div className="space-y-5">
                  <div className="card-highlight">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Total due today</span>
                      <span className="text-2xl font-bold text-slate-900 tabular-nums">
                        ${routerPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">+ $79/mo plan starting after connection</p>
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
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-3 pb-4 pt-6">
                {current.id === "avc" && (
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => goToStep(stepIndex + 1)}
                  >
                    Skip for now
                  </button>
                )}
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
                      Complete Order
                    </>
                  ) : current.id === "review" ? "Continue to Payment" : 
                   current.id === "name" || current.id === "phone" || current.id === "address" ? "Confirm & Continue" : 
                   "Continue"}
                </button>
                {stepIndex > 0 && (
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
      </div>
    </main>
  );
}
