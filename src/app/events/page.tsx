
import { Itypes } from "@/type";
import EventFilters from "../components/EventFilters";
import EventCard from "../components/eventCard";
import { getTokenFromServer } from "../lib/jwtTokenFromServer";


const EventPage = async() => {


  const token = await getTokenFromServer()

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/allEvents`,{
      headers:{
        authorization: `Bearer ${token}`
      }
    })
    // Degrade to an empty list instead of crashing the page when the API is
    // unreachable or answers with an HTML error body.
    const data: Itypes[] = res.ok
      ? await res.json().catch(() => [] as Itypes[])
      : [];
    
    return (
        <div>
            <div>
               
<div className="bg-base-100 px-5 py-12 sm:px-8 lg:px-16">
  <div className="mx-auto max-w-7xl">
    <div className="flex flex-col gap-6 border-b border-violet-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="mb-4 inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
          Community Impact
        </span>

        <h1 className="text-4xl font-black tracking-tight text-violet-950 sm:text-5xl">
          Upcoming Events
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Discover events, volunteer opportunities, and community initiatives
          created to make a meaningful difference.
        </p>
      </div>

      <a
        href="/createEventForm"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800"
      >
        <span className="text-lg">+</span>
        Create Event
      </a>
    </div>

    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <EventFilters />

      <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2.5 sm:w-72">
        <span className="text-violet-500">⌕</span>
        <input
          type="text"
          placeholder="Search events..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  </div>
</div>

            </div>
            <div className="mx-auto grid max-w-7xl gap-6  px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">
              {data.map((d) => <EventCard key={d._id} data={d} />)}
            </div>
        </div>
    );
};

export default EventPage