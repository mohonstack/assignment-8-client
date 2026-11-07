import { Itypes } from '@/type';

import EventCard from './eventCard';

const UpcomingEvents = async() => {
    // Static prerendering runs this at build time (locally and on Vercel), so a
    // missing/unreachable backend must not fail the build — degrade to an
    // empty state instead. The env var is checked first so no request is even
    // attempted when it isn't configured.
    let data: Itypes[] = [];
    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL;
    if (baseUrl) {
        try {
            const res = await fetch (`${baseUrl}/featured-allEvents`)
            if (res.ok) {
                data = await res.json()
            }
        } catch {
            data = [];
        }
    }
    return (
        <div >
           <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-16">
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-bold text-violet-700">
                    <span aria-hidden="true">✣</span>
                    Upcoming Initiatives
                </span>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Recent Upcoming Events
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                    Latest community drives scheduled in your city. Get involved today.
                </p>
            </div>

            {data.length === 0 ? (
                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-16">
                    <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center shadow-sm">
                        <h2 className="text-2xl font-black text-violet-950">
                            No upcoming events right now
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                            New community drives are added all the time — check back soon or create one yourself.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mx-auto grid max-w-7xl gap-6  px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">

                {
                    data.map(d=> <EventCard key={d._id} data={d} ></EventCard>)
                }
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;