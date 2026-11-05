'use client'
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Itypes } from "@/type";

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const volunteerGuidelines = [
  "Please arrive 15 minutes before the scheduled time at the designated location.",
  "Wear comfortable clothing suitable for physical social work and distribution.",
  "Bring any pre-coordinated relief packages or distribution items if requested.",
];

const EventDetailsPage = ({ eventData }: { eventData: Itypes }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user

  const handleJoinEventData = async() => {
    const joinEventData = {
      ...eventData,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
      eventCreationDate: new Date()
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/joinedEvent`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinEventData)
    });

    if (!res.ok) {
      throw new Error(`Unable to join event: ${res.status}`);
    }

    router.push("/joinedEvents");
  }

  return (
    <main className="bg-base-100 px-4 py-8 sm:px-8 lg:px-16 lg:py-12">
      <article className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-violet-100 bg-base-100 shadow-xl shadow-violet-100/70">
        <div
          className="relative flex min-h-[22rem] items-end bg-cover bg-center px-6 py-8 sm:px-10 lg:px-12"
          style={{ backgroundImage: `url("${eventData.image}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 via-violet-950/25 to-transparent" />
          <div className="relative w-full">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-violet-500" />
              {eventData.type}
            </span>

            <h1 className="text-3xl font-black capitalize tracking-tight text-white sm:text-5xl">
              {eventData.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm font-semibold text-violet-100">
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden="true" className="h-5 w-5 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 6-7.5 10-7.5 10s-7.5-4-7.5-10a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {eventData.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden="true" className="h-5 w-5 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75v2.5m10.5-2.5v2.5M4.5 9.25h15m-13.5-5.5h11a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z" />
                </svg>
                {formatDate(eventData.date)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:px-12 lg:py-9">
          <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 19a4 4 0 0 0-8 0m4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 8a3 3 0 0 0-3-3m1-5a2.5 2.5 0 1 0 0-5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-violet-950">Join As  Volunteers</p>
                <p className="text-xs text-slate-500">Sign up to join hands for this event</p>
              </div>
            </div>

            <button onClick={handleJoinEventData} type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2">
              Join Event
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-black text-violet-950">About this Social Initiative</h2>
            <p className="mt-4 max-w-3xl border-b border-violet-100 pb-6 text-sm leading-7 text-slate-500">
              {eventData.description}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xs font-black uppercase tracking-wide text-violet-800">Volunteer Guidelines</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-500">
              {volunteerGuidelines.map((guideline) => (
                <li key={guideline} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500" />
                  {guideline}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
};

export default EventDetailsPage;