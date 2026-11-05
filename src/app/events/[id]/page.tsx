import EventDetailsPage from '@/components/EventDetailsPage';
import { getTokenFromServer } from '@/lib/jwtTokenFromServer';
import { Itypes } from '@/type';
import React from 'react';

const EventDetails = async({params}: {
  params: Promise<{ id: string }>}) => {
    const {id} = await params

    const token = await getTokenFromServer()
    console.log(token);


    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/allEvents/${id}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data:Itypes = await res.json()
    return (
        <div>
            <EventDetailsPage eventData={data} ></EventDetailsPage>
        </div>
    );
};

export default EventDetails;