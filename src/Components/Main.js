import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Gallery from './Gallery';
import Reviews from './Reviews';
import About from './About';
//import UploadFile from './UploadFile';
import { useAuth0 } from '@auth0/auth0-react';
import Uploadfile from './Uploadflie';


const Main = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <main className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/about' element={<About />} />
                <Route path="/prediction" element={isAuthenticated && user ? <Uploadfile /> : <NotAllowed />} />
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
