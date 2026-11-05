import Link from "next/link";
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

const EventCard = ({ data }: { data: Itypes }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-violet-100">
        <div
          aria-label={data.title}
          className="h-full w-full bg-cover bg-center transition duration-500 hover:scale-105"
          role="img"
          style={{ backgroundImage: `url("${data.image}")` }}
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-violet-500" />
          {data.type}
        </span>

        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-bold text-white">
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-fuchsia-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3.75v2.5m10.5-2.5v2.5M4.5 9.25h15m-13.5-5.5h11a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
            />
          </svg>
          {formatDate(data.date)}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-black capitalize text-violet-950">
          {data.title}
        </h2>

        <p className="mt-2 flex items-center gap-2 text-sm text-violet-600">
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 6-7.5 10-7.5 10s-7.5-4-7.5-10a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {data.location}
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {data.description}
        </p>

        <div className="my-4 border-t border-slate-200" />

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 19a4 4 0 0 0-8 0m4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 8a3 3 0 0 0-3-3m1-5a2.5 2.5 0 1 0 0-5"
            />
          </svg>
          {data.userName}
        </div>

        <Link
          href={`/events/${data._id}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
        >
          View Event
          <span aria-hidden="true" className="text-lg leading-none">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default EventCard;