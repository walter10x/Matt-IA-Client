import React from 'react';


import { Jumbotron } from '../components/Jumbotron';
//import { RegisterForm } from '../components/RegisterForm';
import { StartNowButton } from '../components/StartNowButton';
import { FeaturesSection } from '../components/FeaturesSection';

export const RegisterPage = () => {
    return (
        <>        
            <Jumbotron />
            <br></br>
          <StartNowButton/>
            <br></br>  
            
            <br></br>
           <FeaturesSection/>
        </>
    );
};




