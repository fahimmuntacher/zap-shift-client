import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../components/Logo/Loading/Loading';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure()
    const {isLoading, data : parcel} = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${parcelId}`);
            return res.data;
        }
    })

    if(isLoading) return <Loading></Loading>
    return (
        <div>
            <h1 className='text-4xl'>This is payment : {parcel.parcelName}</h1>
            <button className='btn'>Please pay</button>
        </div>
    );
};

export default Payment;