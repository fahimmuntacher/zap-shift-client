import React, { useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import WorkProcess from './WorkProcess/WorkProcess';
import Services from './Services/Services';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
       fetch("/reviews.json").then(res => res.json()).then(data => {
        setReviews(data);
       })
    },[])
    return (
        <div>
            <Banner></Banner>
            <WorkProcess></WorkProcess>
            <Services></Services>
            <Brands></Brands>
            <Reviews reviews = {reviews}></Reviews>
        </div>
    );
};

export default Home;