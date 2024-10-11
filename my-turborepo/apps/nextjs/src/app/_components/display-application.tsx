"use client"
import React, { useEffect } from 'react';
import { api } from '~/trpc/react';

const CheckApplication: React.FC = () => {
    const { data } = api.application.getAllApplicationByEventName.useQuery(process.env.NEXT_PUBLIC_EVENT_NAME ?? "");

    return (
        <div>
            <h1 className='font-bold text-xl'>Check Application</h1>
            <div className='font-bold text-xl'>There are {data?.length} applications for this event</div>
            {data?.map((item) => {
                return (
                    <div key={item.id} className='flex-col w-4/5'>
                        {item.firstName}
                    </div>
                );
            })}
        </div>
    );
}

export default CheckApplication;