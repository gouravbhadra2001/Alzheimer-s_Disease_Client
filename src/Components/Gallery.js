import React, { useContext, useEffect } from 'react'
//import Chatbot from './Chatbot'
import { ActiveContext } from '../App'
import PredictionHistory from './PredictionHistory'
import { useAuth0 } from '@auth0/auth0-react'
import DragDrop from './DragDrop'


const Gallery = () => {
    const {activeIndex, setActiveIndex } = useContext(ActiveContext)
const {user, isAuthenticated} = useAuth0()



useEffect(()=>{
setActiveIndex(2)
console.log(activeIndex)
})

    return (
        <div className='fade-in'>
            {/*<Chatbot/>*/}
            
    
           {/*<DragDrop/>*/}
        </div>
    )   
    
}

export default Gallery


 /*<Carousel className='carousel' variant='dark'>
      <Carousel.Item>
       <Heroslider_1/>
      </Carousel.Item>

      <Carousel.Item>
       <Heroslider_2/>
      </Carousel.Item>
      <Carousel.Item>
      <Heroslider_3/>
      </Carousel.Item>
    </Carousel>
    )*/