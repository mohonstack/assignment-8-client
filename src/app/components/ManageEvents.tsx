import { Itypes } from '@/type';
import Link from 'next/link';
import EditDialog from './EditDialog';
import DeleteEventDialog from './DeleteEventDialog';

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

const ManageEvents = ({ manageEventData }: { manageEventData: Itypes }) => {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-56 overflow-hidden bg-violet-100">
                <div
                    role="img"
                    aria-label={manageEventData.title}
                    className="h-full w-full bg-cover bg-center transition duration-500 hover:scale-105"
                    style={{ backgroundImage: `url("${manageEventData.image}")` }}
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm">
                    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                    </svg>
                    {manageEventData.type}
                </span>
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-bold text-white">
                    <svg aria-hidden="true" className="h-4 w-4 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75v2.5m10.5-2.5v2.5M4.5 9.25h15m-13.5-5.5h11a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z" />
                    </svg>
                    {formatDate(manageEventData.date)}
                </span>
            </div>

            <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-black capitalize text-black">
                    {manageEventData.title}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-violet-600">
                    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 6-7.5 10-7.5 10s-7.5-4-7.5-10a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {manageEventData.location}
                </p>
                <p className="mt-4 line-clamp-1 text-sm text-slate-500">
                    {manageEventData.userName}
                </p>

                <div className="my-4 border-t border-slate-200" />

                <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                    <Link
                        href={`/events/${manageEventData._id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    >
                        View
                    </Link>
                    <EditDialog manageEventData={manageEventData} />
                    <DeleteEventDialog manageEventData={manageEventData}></DeleteEventDialog>
                </div>
            </div>
        </article>
    );
};

export default ManageEvents;