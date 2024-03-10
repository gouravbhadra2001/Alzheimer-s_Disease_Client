import React from 'react'
import {
    Route,
    Routes
} from "react-router-dom";


import Home from './Home'
import Gallery from './Gallery';
import Reviews from './Reviews';
import About from './About';

import UploadFile from './UploadFile';

const Main = () => {


    return (

        <main className='px'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prediction" element={<UploadFile/>} />
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path='/reviews' element={<Reviews/>}/>
                <Route path='/about' element={<About/>}/>
              
            </Routes>

        </main>


    )
}

export default Main
