import React from 'react';
import { Jumbotron } from '../components/Jumbotron';
import { StartNowButton } from '../components/StartNowButton';
import { FeaturesSection } from '../components/FeaturesSection';

export const HomePage = () => {
    return (
        <>        
            <Jumbotron />
            <br />
            <StartNowButton />
            <br />  
            <FeaturesSection />
        </>
    );
};