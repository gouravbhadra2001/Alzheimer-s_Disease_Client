import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Gallery from './Gallery';
import Reviews from './Reviews';
import About from './About';
//import UploadFile from './UploadFile';
import { useAuth0 } from '@auth0/auth0-react';
import Uploadfile from './Uploadflie';
import PredictionHistory from './PredictionHistory';
import ProfileForm from './Profile';
import "../styles/animation.css"
import DonationForm from './DonateForm';
import ContactForm from './ContactForm';

const Main = () => {
    const { isAuthenticated, user } = useAuth0();
    //const { subscribed, setSubscribed } = useState();
    
    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/about' element={<About />} />
                <Route path="/prediction" element={isAuthenticated && user ? <Uploadfile /> : <NotAllowed />} />
                <Route path='/dashboard' element={<PredictionHistory user={user} />} />
                <Route path="/profile" element={<ProfileForm/>}> </Route>
                <Route path="/donate" element={<DonationForm/>}> </Route>
                <Route path="/contact" element={<ContactForm/>}> </Route>
            </Routes>
        </main>
    );
};

const NotAllowed = () => (
    <div>
        <h2>To access prediction facilities please login to our website</h2>
    </div>
);

export default Main;
