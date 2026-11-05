import { Itypes } from '@/type';

import EventCard from './eventCard';

const UpcomingEvents = async() => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_LOCAL_URL}/featured-allEvents`)
    const data:Itypes[] = await res.json()
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

            <div className="mx-auto grid max-w-7xl gap-6  px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">

            {
                data.map(d=> <EventCard key={d._id} data={d} ></EventCard>)
            }
            </div>
        </div>
    );
};

export default UpcomingEvents;