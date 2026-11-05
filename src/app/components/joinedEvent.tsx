import { Itypes } from '@/type';
import Link from 'next/link';

const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(parsedDate);
};

const JoinedEvent = ({ joinedEventData }: { joinedEventData: Itypes }) => {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-56 overflow-hidden bg-violet-100">
                <div
                    aria-label={joinedEventData.title}
                    className="h-full w-full bg-cover bg-center"
                    role="img"
                    style={{ backgroundImage: `url("${joinedEventData.image}")` }}
                />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-violet-700/80 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-fuchsia-300" />
                    {joinedEventData.type}
                </span>

                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-bold text-white">
                    <svg
                        aria-hidden="true"
                        className="h-4 w-4 text-teal-300"
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
                    {formatDate(joinedEventData.date)}
                </span>
            </div>

            <div className="p-5">
                <h2 className="text-xl font-black capitalize text-violet-950">
                    {joinedEventData.title}
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
                    {joinedEventData.location}
                </p>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                    {joinedEventData.description}
                </p>

                <div className="my-4 border-t border-slate-200" />

                <p className="text-sm font-bold text-violet-600">
                    Joined {formatDate(joinedEventData.eventCreationDate)}
                </p>

                <Link href={`/events/${joinedEventData.eventId}`}
                    type="button"
                   className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                >
                    View Details
                    <span aria-hidden="true" className="text-lg leading-none">
                        →
                    </span>
                </Link>
            </div>
        </article>
    );
};

export default JoinedEvent