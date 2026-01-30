"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const steps = [
  {
    id: "name",
    title: "First things first — what should we call you?",
    subtitle: "Let’s start with your details."
  },
  {
    id: "email",
    title: "Where can we send the good news?",
    subtitle: "We’ll only use this for your order updates."
  },
  {
    id: "phone",
    title: "Got a number? Just in case we need to chat.",
    subtitle: "No spam, just service updates."
  },
  {
    id: "dob",
    title: "Now we just need your birthday 🎂",
    subtitle: "We won’t tell anyone."
  },
  {
    id: "address",
    title: "Where is the internet headed?",
    subtitle: "Pop in the address for your new connection."
  },
  {
    id: "avc",
    title: "Switching providers? Pop your AVC in here",
    subtitle: "Optional — you can always add it later."
  },
  {
    id: "postal",
    title: "Same address for letters?",
    subtitle: "We’ll send any paperwork here."
  },
  {
    id: "router",
    title: "Pick your weapon ⚔️",
    subtitle: "Choose a router or bring your own."
  },
  {
    id: "review",
    title: "Here is the rundown — look good?",
    subtitle: "Double-check before we lock it in."
  }
];

const routerOptions = [
  { name: "Tenda v12", price: "$139.99" },
  { name: "NF20Mesh", price: "$244.99" },
  { name: "Grandstream HT801", price: "$89.99" },
  { name: "No router", price: "$0" }
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    address: "",
    avc: "",
    postalSame: "yes",
    postalAddress1: "",
    postalCity: "",
    postalState: "",
    postalPostcode: "",
    router: ""
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

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const current = steps[stepIndex];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Step {stepIndex + 1} of {steps.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-skymesh-blue transition-all"
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-skymesh-blue">
                  Skymesh Checkout
                </p>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {current.title}
                </h1>
                <p className="text-base text-slate-500">{current.subtitle}</p>
              </div>

              {current.id === "name" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      className="input mt-2"
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={(event) => handleChange("firstName", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      className="input mt-2"
                      placeholder="Citizen"
                      value={form.lastName}
                      onChange={(event) => handleChange("lastName", event.target.value)}
                    />
                  </div>
                </div>
              )}

              {current.id === "email" && (
                <div>
                  <label className="label" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    className="input mt-2"
                    placeholder="jane@skymesh.com.au"
                    value={form.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                  />
                </div>
              )}

              {current.id === "phone" && (
                <div>
                  <label className="label" htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    className="input mt-2"
                    placeholder="0400 000 000"
                    value={form.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                  />
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
                        <option key={index + 1} value={`${index + 1}`}
                        >
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
                      <option value="">MM</option>
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
                <div>
                  <label className="label" htmlFor="address">Service address</label>
                  <input
                    id="address"
                    className="input mt-2"
                    placeholder="123 Cloud Street, Brisbane"
                    value={form.address}
                    onChange={(event) => handleChange("address", event.target.value)}
                  />
                  <p className="mt-3 text-sm text-slate-400">
                    Autocomplete coming soon.
                  </p>
                </div>
              )}

              {current.id === "avc" && (
                <div>
                  <label className="label" htmlFor="avc">AVC (optional)</label>
                  <input
                    id="avc"
                    className="input mt-2"
                    placeholder="AVC123456"
                    value={form.avc}
                    onChange={(event) => handleChange("avc", event.target.value)}
                  />
                </div>
              )}

              {current.id === "postal" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    {(["yes", "no"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("postalSame", option)}
                        className={
                          `rounded-full px-5 py-2 text-sm font-semibold transition ` +
                          (form.postalSame === option
                            ? "bg-skymesh-blue text-white shadow-soft"
                            : "border border-slate-200 bg-white text-slate-600")
                        }
                      >
                        {option === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>

                  {form.postalSame === "no" && (
                    <div className="grid gap-4">
                      <div>
                        <label className="label" htmlFor="postalAddress1">Postal address</label>
                        <input
                          id="postalAddress1"
                          className="input mt-2"
                          placeholder="PO Box 123"
                          value={form.postalAddress1}
                          onChange={(event) => handleChange("postalAddress1", event.target.value)}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="label" htmlFor="postalCity">City</label>
                          <input
                            id="postalCity"
                            className="input mt-2"
                            placeholder="Brisbane"
                            value={form.postalCity}
                            onChange={(event) => handleChange("postalCity", event.target.value)}
                          />
                        </div>
                        <div>
                          <label className="label" htmlFor="postalState">State</label>
                          <input
                            id="postalState"
                            className="input mt-2"
                            placeholder="QLD"
                            value={form.postalState}
                            onChange={(event) => handleChange("postalState", event.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="label" htmlFor="postalPostcode">Postcode</label>
                        <input
                          id="postalPostcode"
                          className="input mt-2"
                          placeholder="4000"
                          value={form.postalPostcode}
                          onChange={(event) => handleChange("postalPostcode", event.target.value)}
                        />
                      </div>
                    </div>
                  )}
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
                        `card text-left ${
                          form.router === option.name
                            ? "border-skymesh-blue ring-2 ring-sky-100"
                            : "hover:-translate-y-1"
                        }`
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {option.name}
                          </p>
                          <p className="text-sm text-slate-500">High-speed friendly</p>
                        </div>
                        <span className="text-lg font-semibold text-skymesh-blue">
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
                    { label: "Date of Birth", value: `${form.dobDay} ${form.dobMonth} ${form.dobYear}`, step: 3 },
                    { label: "Address", value: form.address, step: 4 },
                    { label: "AVC", value: form.avc || "Not provided", step: 5 },
                    {
                      label: "Postal Address",
                      value:
                        form.postalSame === "yes"
                          ? "Same as service address"
                          : `${form.postalAddress1} ${form.postalCity} ${form.postalState} ${form.postalPostcode}`,
                      step: 6
                    },
                    { label: "Router", value: form.router || "Not selected", step: 7 }
                  ].map((row) => (
                    <div key={row.label} className="card flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {row.label}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
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
                  onClick={() => goToStep(stepIndex + 1)}
                >
                  {current.id === "review" ? "Confirm and Checkout" : "Continue"}
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
