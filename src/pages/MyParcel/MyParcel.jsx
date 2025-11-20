import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyParcel = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: parcels = []} = useQuery({
        queryKey : ["myParcel", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel?${user?.email}`);
            return res.data
        }
    })
    return (
        <div>
            <h1 className='text-4xl'>ALl my parcels : {parcels.length}</h1>
        </div>
    );
};

export default MyParcel;