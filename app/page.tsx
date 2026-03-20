export default function Home() {
  const signals = [
    {
      spice: "Turmeric",
      region: "India",
      trend: "Rising",
      reason: "Unseasonal rainfall affecting drying conditions",
      price: "₹13,800 / quintal",
      confidence: "Medium",
    },
    {
      spice: "Chilli",
      region: "Andhra Pradesh",
      trend: "Rising",
      reason: "Heavy rainfall during harvest affecting crop quality",
      price: "₹14,500 / quintal",
      confidence: "High",
    },
    {
      spice: "Coriander",
      region: "Rajasthan",
      trend: "Falling",
      reason: "Higher arrivals increasing near-term supply",
      price: "₹7,900 / quintal",
      confidence: "Medium",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-xl font-semibold tracking-tight">AgroIntel</div>
        <div className="hidden gap-8 text-sm text-neutral-600 md:flex">
          <a href="#signals" className="hover:text-neutral-900">
            Signals
          </a>
          <a href="#how-it-works" className="hover:text-neutral-900">
            How it works
          </a>
          <a href="#about" className="hover:text-neutral-900">
            About
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-10 md:grid-cols-2 md:items-center md:pt-20">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
            Crop and market intelligence
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Understand spice prices before the market moves.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            AgroIntel transforms weather, crop timing, and market movement into
            simple signals buyers can act on.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#signals"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View signals
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
            >
              Learn how it works
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-medium text-neutral-500">Featured signal</p>
          <div className="mt-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Turmeric</h2>
                <p className="mt-1 text-sm text-neutral-500">India</p>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                Rising
              </div>
            </div>

            <div className="mt-8">
              <p className="text-5xl font-semibold tracking-tight">₹13,800</p>
              <p className="mt-2 text-sm text-emerald-600">+2.4% this week</p>
            </div>

            <div className="mt-8 h-24 rounded-2xl bg-gradient-to-r from-emerald-50 to-white p-4">
              <div className="flex h-full items-end gap-2">
                <div className="h-8 w-6 rounded-t-full bg-emerald-200" />
                <div className="h-10 w-6 rounded-t-full bg-emerald-300" />
                <div className="h-9 w-6 rounded-t-full bg-emerald-200" />
                <div className="h-14 w-6 rounded-t-full bg-emerald-400" />
                <div className="h-12 w-6 rounded-t-full bg-emerald-300" />
                <div className="h-16 w-6 rounded-t-full bg-emerald-500" />
                <div className="h-20 w-6 rounded-t-full bg-emerald-600" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Reason:</span> Unseasonal rainfall
                affecting drying conditions.
              </p>
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Confidence:</span> Medium
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="signals"
        className="mx-auto max-w-7xl px-6 py-16"
      >
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
            <article
              key={signal.spice}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {signal.spice}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {signal.region}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    signal.trend === "Rising"
                      ? "bg-emerald-100 text-emerald-700"
                      : signal.trend === "Falling"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {signal.trend}
                </span>
              </div>

              <p className="mt-8 text-3xl font-semibold tracking-tight">
                {signal.price}
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {signal.reason}
              </p>

              <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
                <span>Confidence</span>
                <span className="font-medium text-neutral-800">
                  {signal.confidence}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-16"
      >
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
              We monitor rainfall and temperature conditions in key producing
              regions to understand crop stress and drying risk.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Crop cycles</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Harvest windows, sowing periods, and seasonal timing help explain
              when supply pressure may rise or tighten.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Market movement</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Price and arrival data give context to what is happening on the
              ground, and why the market is reacting.
            </p>
          </div>
        </div>
      </section>

      <footer
        id="about"
        className="mx-auto max-w-7xl px-6 py-12 text-sm text-neutral-500"
      >
        <div className="border-t border-neutral-200 pt-8">
          AgroIntel is building a simpler way to understand spice market
          movement through weather, crop cycles, and supply signals.
        </div>
      </footer>
    </main>
  );
}