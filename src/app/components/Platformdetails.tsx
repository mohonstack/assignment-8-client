const features = [
  {
    title: "Discover Local Causes",
    description:
      "Browse meaningful projects in your area and find an opportunity that fits your time, skills, and passion.",
    color: "text-violet-600",
    background: "bg-violet-50",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-10.2A7 7 0 0 0 5 10.8C5 16.65 12 21 12 21Z" />
        <circle cx="12" cy="10" r="2.25" />
      </svg>
    ),
  },
  {
    title: "Join in Seconds",
    description:
      "Reserve your place in a community event with a simple sign-up and get the details you need before the day begins.",
    color: "text-fuchsia-600",
    background: "bg-fuchsia-50",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16M8 15l2 2 5-5" />
      </svg>
    ),
  },
  {
    title: "Lead with Confidence",
    description:
      "Create and manage your own initiative, invite volunteers, and keep everyone aligned from planning to completion.",
    color: "text-indigo-600",
    background: "bg-indigo-50",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "See Progress Together",
    description:
      "Track the people and projects making a difference, celebrate milestones, and turn one good day into continued action.",
    color: "text-purple-600",
    background: "bg-purple-50",
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M4 19h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m7 15 3-4 3 2 5-6" />
      </svg>
    ),
  },
];

const PlatformFeatures = () => {
  return (
    <section className="px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-600">
            Why ImpactConnect
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">
            Everything you need to make a difference
          </h2>
          <p className="mt-4 text-base leading-7 text-violet-700/80">
            A welcoming space for neighbors, volunteers, and organizers to
            turn shared values into visible community progress.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-3xl border border-violet-100 bg-base-100 p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.background} ${feature.color} transition duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-bold text-black">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-violet-700/75">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;