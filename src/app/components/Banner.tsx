
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  CalendarDays,
  Users,
  Heart,
  Leaf,
} from "lucide-react";

const stats = [
  {
    value: "1,280+",
    label: "Active Volunteers",
    icon: Users,
    color: "text-fuchsia-300",
  },
  {
    value: "96",
    label: "Events Completed",
    icon: CalendarDays,
    color: "text-violet-200",
  },
  {
    value: "8,400+",
    label: "Lives Impacted",
    icon: Heart,
    color: "text-fuchsia-200",
  },
  {
    value: "100%",
    label: "Community Driven",
    icon: Leaf,
    color: "text-violet-200",
  },
];

const Banner = () => {
  return (
    <section className="relative isolate mx-auto overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 text-white lg:mt-4 lg:rounded-2xl">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-violet-400/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:py-24">
        {/* Left content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-300" />
            Small actions. Shared progress.
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Turn your ideas into{" "}
            <span className="text-fuchsia-300">
              lasting impact.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-violet-100 sm:text-lg">
            Find people who care about the same causes, join meaningful local
            projects, and make every hour you give count.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full bg-fuchsia-200 px-6 py-3.5 text-sm font-bold text-violet-950 shadow-lg shadow-violet-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-700"
            >
              Explore Upcoming Events
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/createEventForm"
              className="group inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-violet-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-700"
            >
              <Plus
                size={18}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              Create an Event
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Decorative shapes */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-5 h-24 w-24 rounded-3xl border border-fuchsia-300/30 bg-fuchsia-300/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-4 h-20 w-20 rounded-full border border-violet-300/30 bg-violet-400/20"
          />

          {/* Featured event card */}
          <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-violet-950/40 backdrop-blur-md sm:p-5">
            <div className="rounded-3xl bg-violet-50 p-5 text-violet-950 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-violet-500">
                    <CalendarDays size={16} />
                    Featured this week
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Neighborhood
                    <br />
                    Garden Day
                  </h2>
                </div>

                <div className="shrink-0 rounded-2xl bg-fuchsia-100 px-4 py-2 text-center text-xs font-bold text-fuchsia-700">
                  JUN
                  <strong className="mt-1 block text-2xl leading-6">
                    14
                  </strong>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-violet-100 pt-5 text-sm">
                <span className="text-violet-500">
                  Greenway Community Hub
                </span>
                <span className="rounded-full bg-fuchsia-100 px-3 py-1 font-bold text-fuchsia-700">
                  18 spots left
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-2 pt-5 text-sm text-violet-100">
              <span>Join 42 neighbors making a difference</span>
              <ArrowRight size={20} className="shrink-0" />
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className={`text-2xl font-black ${stat.color}`}>
                      {stat.value}
                    </p>
                    <Icon size={19} className={stat.color} />
                  </div>

                  <p className="text-xs font-medium text-violet-100 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
