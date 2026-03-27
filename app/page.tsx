"use client";

import { useMemo, useState } from "react";

type Currency = "INR" | "USD" | "GBP" | "EUR";

type Signal = {
  spice: string;
  region: string;
  trend: "Rising" | "Falling" | "Stable";
  reason: string;
  priceInInr: number;
  weeklyChange: number;
  confidence: "Low" | "Medium" | "High";
};

const conversionRates: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0094,
  EUR: 0.011,
};

const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

const signals: Signal[] = [
  {
    spice: "Turmeric",
    region: "India",
    trend: "Rising",
    reason: "Unseasonal rainfall affecting drying conditions",
    priceInInr: 13800,
    weeklyChange: 2.4,
    confidence: "Medium",
  },
  {
    spice: "Chilli",
    region: "Andhra Pradesh",
    trend: "Rising",
    reason: "Heavy rainfall during harvest affecting crop quality",
    priceInInr: 14500,
    weeklyChange: 3.2,
    confidence: "High",
  },
  {
    spice: "Coriander",
    region: "Rajasthan",
    trend: "Falling",
    reason: "Higher arrivals increasing near-term supply",
    priceInInr: 7900,
    weeklyChange: -1.8,
    confidence: "Medium",
  },
];

function formatPrice(priceInInr: number, currency: Currency) {
  const converted = priceInInr * conversionRates[currency];
  const symbol = currencySymbols[currency];

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: currency === "INR" ? 0 : 2,
    minimumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(converted).replace(/^/, symbol);
}

function TrendBadge({ trend }: { trend: Signal["trend"] }) {
  const styles =
    trend === "Rising"
      ? "bg-emerald-100 text-emerald-700"
      : trend === "Falling"
      ? "bg-rose-100 text-rose-700"
      : "bg-neutral-100 text-neutral-700";

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${styles}`}>
      {trend}
    </span>
  );
}

function Sparkline({ trend }: { trend: Signal["trend"] }) {
  const stroke =
    trend === "Rising" ? "#059669" : trend === "Falling" ? "#e11d48" : "#525252";

  const path =
    trend === "Rising"
      ? "M0,60 C20,55 30,42 45,40 C60,38 68,30 82,24 C92,20 100,14 120,8"
      : trend === "Falling"
      ? "M0,8 C20,12 32,20 45,28 C60,38 72,42 86,48 C98,54 110,57 120,60"
      : "M0,36 C20,35 40,37 60,36 C80,35 100,37 120,36";

  return (
    <svg viewBox="0 0 120 68" className="h-16 w-full">
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SignalCard({
  signal,
  currency,
}: {
  signal: Signal;
  currency: Currency;
}) {
  const changeColor =
    signal.weeklyChange > 0
      ? "text-emerald-600"
      : signal.weeklyChange < 0
      ? "text-rose-600"
      : "text-neutral-500";

  const weeklyLabel =
    signal.weeklyChange > 0
      ? `+${signal.weeklyChange}% this week`
      : `${signal.weeklyChange}% this week`;

  return (
    <article className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            {signal.spice}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">{signal.region}</p>
        </div>
        <TrendBadge trend={signal.trend} />
      </div>

      <div className="mt-6">
        <p className="text-3xl font-semibold tracking-tight">
          {formatPrice(signal.priceInInr, currency)}
        </p>
        <p className={`mt-2 text-sm ${changeColor}`}>{weeklyLabel}</p>
      </div>

      <div className="mt-5 rounded-2xl bg-neutral-50 p-3">
        <Sparkline trend={signal.trend} />
      </div>

      <p className="mt-5 text-sm leading-6 text-neutral-600">{signal.reason}</p>

      <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
        <span>Confidence</span>
        <span className="font-medium text-neutral-800">{signal.confidence}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const [currency, setCurrency] = useState<Currency>("INR");

  const featuredSignal = useMemo(() => signals[0], []);

  const featuredWeeklyLabel =
    featuredSignal.weeklyChange > 0
      ? `+${featuredSignal.weeklyChange}% this week`
      : `${featuredSignal.weeklyChange}% this week`;

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <div className="text-xl font-semibold tracking-tight">AgroIntel</div>
          <div className="text-xs text-neutral-500">by getagrointel.com</div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#signals" className="text-sm text-neutral-600 hover:text-neutral-900">
            Signals
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            How it works
          </a>
          <a href="#about" className="text-sm text-neutral-600 hover:text-neutral-900">
            About
          </a>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 outline-none"
          >
            <option value="INR">INR ₹</option>
            <option value="USD">USD $</option>
            <option value="GBP">GBP £</option>
            <option value="EUR">EUR €</option>
          </select>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-10 md:grid-cols-2 md:items-center md:pt-20">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
            Global crop and spice intelligence
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Understand price direction before the market reacts.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            AgroIntel transforms weather, crop cycles, and market movement into
            simple signals buyers can understand instantly.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#signals"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View live signals
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
            >
              Learn how it works
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-medium text-neutral-500">Featured signal</p>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Turmeric</h2>
              <p className="mt-1 text-sm text-neutral-500">India</p>
            </div>
            <TrendBadge trend={featuredSignal.trend} />
          </div>

          <div className="mt-8">
            <p className="text-5xl font-semibold tracking-tight">
              {formatPrice(featuredSignal.priceInInr, currency)}
            </p>
            <p className="mt-2 text-sm text-emerald-600">{featuredWeeklyLabel}</p>
          </div>

          <div className="mt-8 rounded-2xl bg-neutral-50 p-4">
            <Sparkline trend={featuredSignal.trend} />
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-neutral-700">
              <span className="font-medium">Reason:</span>{" "}
              {featuredSignal.reason}
            </p>
            <p className="text-sm text-neutral-700">
              <span className="font-medium">Confidence:</span>{" "}
              {featuredSignal.confidence}
            </p>
          </div>
        </div>
      </section>

      <section id="signals" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Live signals
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Market direction at a glance
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {signals.map((signal) => (
            <SignalCard key={signal.spice} signal={signal} currency={currency} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Simple signals built from real market inputs
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Weather</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Rainfall and temperature in producing regions help identify crop
              stress, harvest disruption, and drying risk.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Crop cycles</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Harvest windows and seasonal timing explain when supply pressure
              may rise or tighten across regions.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Market movement</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Price and arrival movement help convert raw data into direction,
              reason, and confidence.
            </p>
          </div>
        </div>
      </section>

      <footer id="about" className="mx-auto max-w-7xl px-6 py-12 text-sm text-neutral-500">
        <div className="border-t border-neutral-200 pt-8">
          AgroIntel is building a simpler way to understand market movement
          through weather, crop cycles, and supply signals.
        </div>
      </footer>
    </main>
  );
}