
import { Itypes } from '@/type';
import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '../lib/auth';
import { getTokenFromServer } from '../lib/jwtTokenFromServer';
import ManageEvents from '../components/ManageEvents';

const ManageEventPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user =  session?.user

    const token = await getTokenFromServer()

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/manageEvent/${user?.email}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data:Itypes[] = await res.json()

    return (
        <div>
             <main className="min-h-screen bg-base-100 px-5 py-8 sm:px-8 sm:py-10 lg:px-16">
            <section className="mx-auto max-w-7xl border-b border-slate-200 pb-7 sm:pb-8">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-bold text-violet-700">
                            <span aria-hidden="true">⚙</span>
                            Event Organizer
                        </span>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            Your Community Drives
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                            Keep track of the initiatives you have started and continue creating meaningful change in your community.
                        </p>
                    </div>

                    <Link
                        href="/createEventForm"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                    >
                        <span aria-hidden="true" className="text-lg leading-none">⊕</span>
                        Add New Event
                    </Link>
                </div>
            </section>
            <section className="mx-auto max-w-7xl py-8 sm:py-10">
                {data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl text-violet-700">
                            <span aria-hidden="true">✣</span>
                        </div>
                        <h2 className="mt-5 text-2xl font-black text-violet-950">
                            You haven&apos;t created an event yet
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Start a community drive and bring people together to make a meaningful difference.
                        </p>
                        <Link
                            href="/createEventForm"
                            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                        >
                            <span aria-hidden="true" className="text-lg leading-none">⊕</span>
                            Create Your First Event
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((event) => (
                            <ManageEvents key={event._id} manageEventData={event} />
                        ))}
                    </div>
                )}
            </section>
        </main>
        </div>
    );
};

export default ManageEventPage;