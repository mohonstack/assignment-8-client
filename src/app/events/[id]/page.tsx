import EventDetailsPage from '@/app/components/EventDetailsPage';
import { getTokenFromServer } from '@/app/lib/jwtTokenFromServer';

import { Itypes } from '@/type';
import { notFound } from 'next/navigation';

const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

const EventDetails = async({params}: {
  params: Promise<{ id: string }>}) => {
    const {id} = await params

    // Anything that isn't a valid MongoDB ObjectId (e.g. /events/undefined)
    // can never resolve — bail out to the 404 page before touching the API.
    if (!OBJECT_ID_PATTERN.test(id)) {
        notFound();
    }

    const token = await getTokenFromServer()

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/allEvents/${id}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })

    // The API answers errors as JSON or HTML depending on the failure, so
    // never assume the body parses as the event document.
    if (!res.ok) {
        notFound();
    }

    const data: Itypes | null = await res.json().catch(() => null);
    if (!data?._id) {
        notFound();
    }

    return (
        <div>
            <EventDetailsPage eventData={data} ></EventDetailsPage>
        </div>
    );
};

export default EventDetails;
