import { Itypes } from '@/type';
import React from 'react';

const VisualsStorySection = async() => {
     const res = await fetch (`${process.env.NEXT_PUBLIC_LOCAL_URL}/featured-allEvents`)
        const data:Itypes[] = await res.json()
    return (
        <div>
            <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-16">
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-bold text-violet-700">
                    <span aria-hidden="true">✣</span>
                    Visual Stories
                </span>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Community in Action
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                    Moments from volunteer drives, relief distributions, and green initiatives across Dhaka and beyond.
                </p>
            </div>

            <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">
                {data.map((event) => (
                    <article
                        key={event._id}
                        className="group relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div
                            role="img"
                            aria-label={event.title}
                            className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url("${event.image}")` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                        <div className="absolute inset-x-4 bottom-4">
                            <h3 className="mt-2 line-clamp-2 text-xl font-black text-white">
                                {event.title}
                            </h3>
                            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-200">
                                <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 6-7.5 10-7.5 10s-7.5-4-7.5-10a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                {event.location}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                                <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
                                </svg>
                                Organized by {event.userName}
                            </p>
                        </div>
                    </article>
                ))}
            </div>

        </div>
    );
};

export default VisualsStorySection;