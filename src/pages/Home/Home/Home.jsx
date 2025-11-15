import React from 'react';
import Banner from './Banner/Banner';
import WorkProcess from './WorkProcess/WorkProcess';
import Services from './Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WorkProcess></WorkProcess>
            <Services></Services>
        </div>
    );
};

export default Home;