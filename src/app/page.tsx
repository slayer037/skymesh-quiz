"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const steps = [
  {
    id: "name",
    title: "Hey there! Just confirming — is this you?",
    subtitle: "We grabbed your details from the address check."
  },
  {
    id: "email",
    title: "Where can we send the good news?",
    subtitle: "We'll only use this for your order updates."
  },
  {
    id: "phone",
    title: "Is this still the best number to reach you?",
    subtitle: "Just double-checking before we continue."
  },
  {
    id: "dob",
    title: "Now we just need your birthday 🎂",
    subtitle: "We promise not to sing."
  },
  {
    id: "address",
    title: "Perfect — your address is locked in",
    subtitle: "This is where the magic internet goes."
  },
  {
    id: "avc",
    title: "Switching providers? Pop your AVC in here",
    subtitle: "Optional — you can always add it later."
  },
  {
    id: "router",
    title: "Pick your weapon ⚔️",
    subtitle: "Choose a router or bring your own."
  },
  {
    id: "review",
    title: "Here's the rundown — look good?",
    subtitle: "Double-check before we lock it in."
  },
  {
    id: "payment",
    title: "Almost there! 💳",
    subtitle: "Enter your payment details to complete your order."
  }
];

const routerOptions = [
  { name: "Tenda v12", price: "$139.99", desc: "Great for apartments & small homes" },
  { name: "NF20Mesh", price: "$244.99", desc: "Whole-home mesh coverage" },
  { name: "Grandstream HT801", price: "$89.99", desc: "VoIP adapter for landline" },
  { name: "No router needed", price: "$0", desc: "I've got my own gear" }
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Home() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // Pre-filled from address availability check
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

  const goToStep = (nextIndex: number) => {
    const clamped = Math.min(Math.max(nextIndex, 0), steps.length - 1);
    setDirection(clamped > stepIndex ? 1 : -1);
    setStepIndex(clamped);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const current = steps[stepIndex];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-100 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-skymesh-lime/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Step {stepIndex + 1} of {steps.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-skymesh-orange transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.section
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex h-full flex-col gap-6"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-skymesh-orange">
                  Skymesh Checkout
                </p>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {current.title}
                </h1>
                <p className="text-base text-slate-500">{current.subtitle}</p>
              </div>

              {current.id === "name" && (
                <div className="space-y-4">
                  <div className="card bg-orange-50/50 border-orange-100">
                    <p className="text-2xl font-semibold text-slate-900">
                      {form.firstName} {form.lastName}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">
                    Not you? <button type="button" className="text-skymesh-orange font-semibold hover:underline" onClick={() => {
                      const newFirst = prompt("First name:", form.firstName);
                      const newLast = prompt("Last name:", form.lastName);
                      if (newFirst) handleChange("firstName", newFirst);
                      if (newLast) handleChange("lastName", newLast);
                    }}>Update your name</button>
                  </p>
                </div>
              )}

              {current.id === "email" && (
                <div>
                  <label className="label" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    className="input mt-2"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                </div>
              )}

              {current.id === "phone" && (
                <div className="space-y-4">
                  <div className="card bg-orange-50/50 border-orange-100">
                    <p className="text-2xl font-semibold text-slate-900 tabular-nums">
                      {form.phone}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">
                    Different number? <button type="button" className="text-skymesh-orange font-semibold hover:underline" onClick={() => {
                      const newPhone = prompt("Phone number:", form.phone);
                      if (newPhone) handleChange("phone", newPhone);
                    }}>Update it here</button>
                  </p>
                </div>
              )}

              {current.id === "dob" && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="label" htmlFor="dobDay">Day</label>
                    <select
                      id="dobDay"
                      className="input mt-2"
                      value={form.dobDay}
                      onChange={(event) => handleChange("dobDay", event.target.value)}
                    >
                      <option value="">DD</option>
                      {Array.from({ length: 31 }, (_, index) => (
                        <option key={index + 1} value={`${index + 1}`}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="dobMonth">Month</label>
                    <select
                      id="dobMonth"
                      className="input mt-2"
                      value={form.dobMonth}
                      onChange={(event) => handleChange("dobMonth", event.target.value)}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="dobYear">Year</label>
                    <select
                      id="dobYear"
                      className="input mt-2"
                      value={form.dobYear}
                      onChange={(event) => handleChange("dobYear", event.target.value)}
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 90 }, (_, index) => {
                        const year = new Date().getFullYear() - index - 18;
                        return (
                          <option key={year} value={`${year}`}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

              {current.id === "address" && (
                <div className="space-y-5">
                  <div className="card bg-orange-50/50 border-orange-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">📍</span>
                        <p className="text-xl font-semibold text-slate-900">
                          {form.address}
                        </p>
                      </div>
                      <button type="button" className="text-sm text-skymesh-orange font-semibold hover:underline whitespace-nowrap">
                        Change Address
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span>✓</span>
                    <span>NBN available at this address</span>
                  </div>

                  {/* Alternate name checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.addressAlternateName}
                      onChange={(e) => handleChange("addressAlternateName", e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-skymesh-orange focus:ring-skymesh-orange"
                    />
                    <span className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                      My address is typically known by another name
                    </span>
                  </label>

                  {form.addressAlternateName && (
                    <div className="ml-8">
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter alternate name (e.g. 'The Smith Residence')"
                        value={form.addressAltName}
                        onChange={(e) => handleChange("addressAltName", e.target.value)}
                      />
                    </div>
                  )}

                  {/* Different postal address checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.postalDifferent}
                      onChange={(e) => handleChange("postalDifferent", e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-skymesh-orange focus:ring-skymesh-orange"
                    />
                    <span className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                      Add different postal address
                    </span>
                  </label>

                  {form.postalDifferent && (
                    <div className="ml-8 grid gap-4">
                      <div>
                        <label className="label" htmlFor="postalAddress1">Postal address</label>
                        <input
                          id="postalAddress1"
                          className="input mt-2"
                          placeholder="PO Box 123 or Street Address"
                          value={form.postalAddress1}
                          onChange={(event) => handleChange("postalAddress1", event.target.value)}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="label" htmlFor="postalCity">Suburb</label>
                          <input
                            id="postalCity"
                            className="input mt-2"
                            placeholder="Bayswater"
                            value={form.postalCity}
                            onChange={(event) => handleChange("postalCity", event.target.value)}
                          />
                        </div>
                        <div>
                          <label className="label" htmlFor="postalState">State</label>
                          <select
                            id="postalState"
                            className="input mt-2"
                            value={form.postalState}
                            onChange={(event) => handleChange("postalState", event.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="VIC">VIC</option>
                            <option value="NSW">NSW</option>
                            <option value="QLD">QLD</option>
                            <option value="SA">SA</option>
                            <option value="WA">WA</option>
                            <option value="TAS">TAS</option>
                            <option value="NT">NT</option>
                            <option value="ACT">ACT</option>
                          </select>
                        </div>
                        <div>
                          <label className="label" htmlFor="postalPostcode">Postcode</label>
                          <input
                            id="postalPostcode"
                            className="input mt-2"
                            placeholder="3153"
                            value={form.postalPostcode}
                            onChange={(event) => handleChange("postalPostcode", event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {current.id === "avc" && (
                <div>
                  <label className="label" htmlFor="avc">AVC ID (optional)</label>
                  <input
                    id="avc"
                    className="input mt-2"
                    placeholder="AVC123456789"
                    value={form.avc}
                    onChange={(event) => handleChange("avc", event.target.value)}
                  />
                  <p className="mt-3 text-sm text-slate-400">
                    Find this on your current NBN bill. No worries if you don't have it.
                  </p>
                </div>
              )}

              {current.id === "router" && (
                <div className="grid gap-4">
                  {routerOptions.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => handleChange("router", option.name)}
                      className={
                        `card text-left transition-transform ${
                          form.router === option.name
                            ? "border-skymesh-orange ring-2 ring-orange-100"
                            : "hover:-translate-y-1"
                        }`
                      }
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {option.name}
                          </p>
                          <p className="text-sm text-slate-500">{option.desc}</p>
                        </div>
                        <span className="text-lg font-semibold text-skymesh-orange whitespace-nowrap">
                          {option.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {current.id === "review" && (
                <div className="space-y-4">
                  {[
                    { label: "Name", value: `${form.firstName} ${form.lastName}`, step: 0 },
                    { label: "Email", value: form.email, step: 1 },
                    { label: "Phone", value: form.phone, step: 2 },
                    { label: "Date of Birth", value: form.dobDay ? `${form.dobDay} ${form.dobMonth} ${form.dobYear}` : "", step: 3 },
                    { label: "Service Address", value: form.address + (form.addressAltName ? ` (${form.addressAltName})` : ""), step: 4 },
                    { label: "AVC", value: form.avc || "Not provided", step: 5 },
                    {
                      label: "Postal Address",
                      value:
                        !form.postalDifferent
                          ? "Same as service address"
                          : `${form.postalAddress1}, ${form.postalCity} ${form.postalState} ${form.postalPostcode}`,
                      step: 4
                    },
                    { label: "Router", value: form.router || "Not selected", step: 6 }
                  ].map((row) => (
                    <div key={row.label} className="card flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {row.label}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {row.value || "—"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => goToStep(row.step)}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {current.id === "payment" && (
                <div className="space-y-5">
                  <div className="card bg-slate-50 border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-500">Order Total</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {form.router === "NF20Mesh" ? "$244.99" : 
                         form.router === "Tenda v12" ? "$139.99" : 
                         form.router === "Grandstream HT801" ? "$89.99" : "$0.00"}
                        <span className="text-sm font-normal text-slate-500"> + $79/mo plan</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="cardName">Name on card</label>
                    <input
                      id="cardName"
                      className="input mt-2"
                      placeholder="Jane Citizen"
                      value={form.cardName}
                      onChange={(e) => handleChange("cardName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="cardNumber">Card number</label>
                    <input
                      id="cardNumber"
                      className="input mt-2 tabular-nums"
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="cardExpiry">Expiry</label>
                      <input
                        id="cardExpiry"
                        className="input mt-2"
                        placeholder="MM / YY"
                        value={form.cardExpiry}
                        onChange={(e) => handleChange("cardExpiry", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="cardCvc">CVC</label>
                      <input
                        id="cardCvc"
                        className="input mt-2"
                        placeholder="123"
                        value={form.cardCvc}
                        onChange={(e) => handleChange("cardCvc", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>🔒</span>
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3 pb-4">
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
                  onClick={() => {
                    if (current.id === "payment") {
                      router.push("/thank-you");
                    } else {
                      goToStep(stepIndex + 1);
                    }
                  }}
                >
                  {current.id === "payment" ? "Pay & Complete Order" :
                   current.id === "review" ? "Continue to Payment" : 
                   current.id === "name" || current.id === "phone" || current.id === "address" ? "That's correct" : 
                   "Continue"}
                </button>
                {stepIndex > 0 && (
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => goToStep(stepIndex - 1)}
                  >
                    Back
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
