import JoinedEvent from '@/components/joinedEvent';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/jwtTokenFromServer';
import { Itypes } from '@/type';
import { headers } from 'next/headers';
import React from 'react';

const JoinedEventPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user

  const token = await getTokenFromServer()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/joinedEvent/${encodeURIComponent(user?.email ?? '')}`,
    {
      cache: 'no-store',
      headers: {
        authorization: `Bearer ${token}`
      }
    },
  );

  if (!res.ok) {
    throw new Error(`Unable to load joined events: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('Joined events endpoint returned a non-JSON response.');
  }

  const data: Itypes[] = await res.json();

  return (
    <div>

      <main className="min-h-screen bg-base-100 px-5 py-8 sm:px-8 sm:py-10 lg:px-16">
        <section className="mx-auto max-w-7xl border-b border-slate-200 pb-7 sm:pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-bold text-violet-700">
            <span aria-hidden="true">✓</span>
            My Volunteer Commitments
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Joined Events
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Here are all the social development and community service drives you
            have signed up for, sorted by event date.
          </p>
        </section>
        <section className="mx-auto max-w-7xl py-8 sm:py-10">
          {data.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl text-violet-700">
                <span aria-hidden="true">✓</span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-violet-950">
                You haven&apos;t joined any events yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Events you join will appear here so you can keep track of your volunteer commitments.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((d) => (
                <JoinedEvent key={d._id} joinedEventData={d} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default JoinedEventPage;