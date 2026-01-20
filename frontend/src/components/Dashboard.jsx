export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Top welcome panel */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900 to-slate-950 px-6 py-5 shadow-lg shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Today
              </p>
              <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
                Good to see you back, <span className="text-emerald-400">Arun</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                You’re one step closer to building a consistent routine. Focus on the
                small goals that move you forward today.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Current streak
                </p>
                <p className="mt-1 text-3xl font-semibold text-emerald-400">
                  4 days
                </p>
                <p className="text-xs text-slate-500">
                  Longest: <span className="text-slate-300">7 days</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats row */}
        <section className="grid gap-4 sm:grid-cols-3">
          {/* Card 1: goals today */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              Goals completed
            </p>
            <div className="mt-2 flex items-baseline gap-2 pl-3">
              <p className="text-3xl font-semibold">3</p>
              <p className="text-sm text-slate-500">/ 5 today</p>
            </div>
            <p className="mt-1 text-xs text-slate-500 pl-3">
              Nice work. You’re on track for your daily target.
            </p>
          </div>

          {/* Card 2: weekly progress */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-sky-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              This week
            </p>
            <div className="mt-2 flex items-baseline gap-2 pl-3">
              <p className="text-3xl font-semibold">12</p>
              <p className="text-sm text-slate-500">/ 21 goals</p>
            </div>
            <div className="mt-2 pl-3">
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 w-2/3 rounded-full bg-sky-500" />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                57% of weekly goals completed.
              </p>
            </div>
          </div>

          {/* Card 3: focus score */}
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
            <div className="absolute inset-y-0 left-0 w-1 bg-violet-500/80" />
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-3">
              Focus score
            </p>
            <div className="mt-2 flex items-center justify-between pl-3 pr-1">
              <p className="text-3xl font-semibold">7.8</p>
              <span className="text-xs rounded-full bg-violet-500/10 px-2 py-1 text-violet-300 border border-violet-500/30">
                Stable
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 pl-3">
              Based on your completion and consistency.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="grid gap-6 md:grid-cols-[2fr,1.3fr]">
          {/* Left: today’s plan */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-200">
                Today&apos;s plan
              </h2>
              <span className="text-xs text-slate-500">3 of 5 goals planned</span>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div className="mt-1 h-full w-px bg-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    Morning routine
                  </p>
                  <p className="text-xs text-slate-500">
                    10 min journaling • 5 min planning
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  <div className="mt-1 h-full w-px bg-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    Deep work session
                  </p>
                  <p className="text-xs text-slate-500">
                    60 minutes on your top priority task.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    Evening wind-down
                  </p>
                  <p className="text-xs text-slate-500">
                    Short walk, stretch, and 5 min reflection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: habits overview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-sm font-medium text-slate-200">
              Habits overview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Last 7 days across your core habits.
            </p>

            <div className="mt-4 space-y-4 text-xs text-slate-400">
              {/* Consistency */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Consistency
                  </span>
                  <span className="text-slate-200 font-medium">78%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-4/5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Focus blocks */}
              <div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    Focus blocks
                  </span>
                  <span className="text-slate-200 font-medium">5 / 7 days</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-3/4 rounded-full bg-sky-500" />
                </div>
              </div>

              {/* Movement */}
              <div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    Movement
                  </span>
                  <span className="text-slate-200 font-medium">4 / 7 days</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-1.5 w-2/3 rounded-full bg-violet-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}