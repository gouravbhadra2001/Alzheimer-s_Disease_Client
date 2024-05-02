import React, { useState , useEffect, useContext} from 'react'
import { Carousel, Card, Row, Col , Container,  Form, Button} from 'react-bootstrap'

import "../styles/home.css"
import { ListGroup } from 'react-bootstrap'
import memoryloss from "../Assets/memoryLoss.png"
import disor from "../Assets/directionConf.png"
import lonely from "../Assets/isolation.png"
import misplace from "../Assets/misplace.png"
import readProb from "../Assets/difficulty_reading.png"
import seizure from "../Assets/Seizure.png"
import personality from "../Assets/moodSwing.png"
import "../styles/footer.css"
import { useAuth0 } from '@auth0/auth0-react'

import Typewriter from 'typewriter-effect/dist/core';
import {ReactTyped} from "react-typed";
import { ActiveContext} from '../App';
import "../styles/symptomCard.css";
import { NavLink } from 'react-router-dom'


const Home = () => {

  const {activeIndex, setActiveIndex } = useContext(ActiveContext)

  const { /*loginWithRedirect ,*/ isAuthenticated, /*logout,*/ user} = useAuth0();
  const cardHeight = "300px"

  const [subscribed, setSubscribed] = useState()

 
  /*
const updateContextValue = (subscribed) => {
  setContextValue(subscribed);
};

*/

const fetchInsertData = async () => {
  if (isAuthenticated && user) {
      try {
          const response = await fetch("https://alzheimer-s-disease-server-with.onrender.com/getSubscribedData", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "name": user.name,
                  "email": user.email,
              })
          });

          const data = await response.json();
          console.log("Got data:", data);

          // Set the subscribed state based on the data received
          setSubscribed(data);
      } catch (error) {
          console.error("Error getting user data:", error);
      }
  }
};



const handleSubmitReview = async (e) => {
  e.preventDefault();
  const reviewText = e.target.reviewTextArea.value; 

  try {
    if (isAuthenticated && user) {
      const api = "https://alzheimer-s-disease-server-with.onrender.com/postReview";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "name": user.name,
          "email": user.email,
          "review": {
            "reviewText": reviewText,
            "submit_time": new Date().toISOString() 
          }
        })
      });

      const responseData = await response.json();
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);
  }
}

const handleSubscribed = async () => {
  
        try {
            const response = await fetch("https://alzheimer-s-disease-server-with.onrender.com/subscribe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": user.name,
                    "email": user.email,
                    "subscribed": 1 
                })
            });

            const data = await response.json();
            console.log("IsSubscribed:", data);

            // Set the subscribed state based on the data received
            setSubscribed(1);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
  
    await setSubscribed(1)
}


const handleUnsubscribed = async () => {
  
        try {
            const response = await fetch("https://alzheimer-s-disease-server-with.onrender.com/unsubscribe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": user.name,
                    "email": user.email,
                })
            });

            const data = await response.json();
            console.log("IsUnsubscribed:", data);

            
            setSubscribed(0);
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }

    await setSubscribed(0)
}

useEffect(() => {
setActiveIndex(0);
  fetchInsertData();
  console.log(activeIndex)

//alert("Hello world")
});




  const importancePoints = [
    {
      heading: 'Early Intervention',
      content: 'AI prediction enables early detection of Alzheimer\'s disease, allowing for timely medical intervention and potential improvement of patient outcomes.',
    },
    {
      heading: 'Resource Optimization',
      content: 'Efficient use of healthcare resources by prioritizing individuals at higher risk, reducing unnecessary testing, and facilitating targeted treatment strategies.',
    },
    {
      heading: 'Enhanced Accuracy',
      content: 'AI algorithms can analyze vast amounts of MRI data with precision, providing more accurate and reliable predictions than traditional diagnostic methods.',
    },
    {
      heading: 'Patient-Centric Care',
      content: 'Facilitates personalized care plans based on individualized risk assessments, optimizing patient management and improving the quality of healthcare services.',
    },
    {
      heading: 'Research Advancements',
      content: 'AI predictions contribute valuable data for research, fostering a deeper understanding of Alzheimer\'s disease progression, risk factors, and potential treatment avenues.',
    },
    {
      heading: 'Empowering Patients and Caregivers',
      content: 'Provides valuable information to patients and their caregivers, fostering awareness, facilitating proactive healthcare decisions, and improving overall patient well-being.',
    },
  ]
  return (<div className='fade-in'>
<section className='welcome'>
      
      <h1>
       
        <ReactTyped strings={["WELCOME", (isAuthenticated && user)?" "+ user.name:""]} typeSpeed={100} loop />
      </h1>
     
      <p> to <strong style={{fontWeight:"600"}}>Alzheimer's Prediction Zone</strong></p>
      
    </section>
 <br /><br />
    <section className='aboutAlz alzInfoSec'>
    

      <h2 className='slide-in-bottom1'>What is Alzheimer's Disease?</h2>
      <br />
      <p className='slide-in-bottom2'>Alzheimer's disease is a type of dementia that affects memory, thinking, and behavior. It is not a normal part of aging and is the most common cause of dementia, accounting for 60-80% of cases

. The disease progresses over time, with symptoms worsening gradually. In its early stages, individuals may experience mild memory loss, but in late-stage Alzheimer's, they can lose the ability to communicate and respond to their environment

.</p>
<div>
<br />
    <h3 className='slide-in-bottom3'>Symptoms of Alzheimer's Disease:</h3>
<br />

<div class = 'symp-card-container slide-in-bottom4'>
      {cardsData.map((card, index) => (
        <div className = 'symp-card' key={index}>
            <img className="symp-card-img" src={card.image} alt="img"/>
            <div className="symp-card-content">
                <div className="symp-card-title">
                    {card.title}
                </div>
                <div className="symp-card-text">
                    {card.description}
                </div>
            </div>
        </div>
      ))}
    </div>
</div>
<br />
<br />
    <p className='slide-in-bottom5'>Alzheimer's disease has no cure currently; however, there are treatments like aducanumab and lecanemab that can help reduce cognitive decline in early stages

. Early diagnosis is crucial for planning care needs and considering financial arrangements

. Caregiving for individuals with Alzheimer's can be challenging but can also bring personal fulfillment and improved family relationships

. As the disease progresses, individuals often require more intensive care due to their declining abilities

.
In conclusion, Alzheimer's disease is a progressive condition that affects memory and cognitive functions. Recognizing the warning signs early on and seeking medical advice promptly can help manage the disease effectively and plan for the future care needs of individuals affected by Alzheimer's.</p>


    </section>


    <section className='importance_AI_section'>
      <h2>Importance of AI prediction</h2>
      <br />
      <br />
      <ListGroup as="ol" numbered>
  {importancePoints.map((point, index) => (
    <React.Fragment key={index}>
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{point.heading}</div>
          {point.content}
        </div>
      </ListGroup.Item>
      {index !== importancePoints.length - 1 && <><br/></>}
    </React.Fragment>
  ))}
</ListGroup>
    </section>
    <section className="home-footer">
        <div className="footer-body">
            <div className="footer-description">
                <div className="footer-description-logo">
<h4>LOGO</h4>
                </div>
                <div className="footer-description-text">
Please check out the quick links to know more about our effort
                </div>
                <br/>
                <div className="quick-contact">
                    <div className="quick-contact-link">
                        <img  src="https://img.icons8.com/ios/50/FFFFFF/gmail-new.png" alt="gmail-new"/>
                        <a href="">bullzeye2023@gmail.com</a>
                    </div>
                  
                    <div className="quick-contact-link">
                        <img  src="https://img.icons8.com/ios/50/FFFFFF/phone--v1.png" alt="phone--v1"/>
                        <a href="">+91-1234567891</a>
                    </div>
                   
                </div>

            </div>
            <div className="quick-links-and-subscribe">
                <div className="quick-links">
                    <div className="quick-links-head">
                        <div className="quick-links-head-text">
QUICK LINKS
                        </div>
                        <div className="quick-links-head-underline">

                        </div>
                    </div>
                    <ul className="quick-links-body">
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Prediction</a>
                        </li>
                        <li>
                            <a href="">About Us</a>
                        </li>
                    </ul>
                </div>
                <div className="your-support">
                    <div className="your-support-head">
                        <div className="your-support-head-text">
YOUR SUPPORT
                        </div>
                        <div className="your-support-head-underline">

                        </div>
                    </div>
                    <ul className="your-support-body">
                        <li>
                            <a href="">Donate</a>
                        </li>
                        <li>
                            <a href="">Review</a>
                        </li>
                        <li>
                            <a href="">Support 3</a>
                        </li>
                    </ul>
                </div>
                <div className="help">
                    <div className="help-head">
                        <div className="help-head-text">
HELP
                        </div>
                        <div className="help-head-underline">

                        </div>
                    </div>
                    <ul className="help-body">
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li>
                            <a href="">FAQ</a>
                        </li>
                        <li>
                            <a href="">Team</a>
                        </li>
                    </ul>
                </div>
                
                <div className="subscribe">
                    <div className="subscribe-head">
<div className="subscribe-head-text">
YOUR CONTRIBUTION
</div>
<div className="subscribe-head-underline">

</div>
                    </div>
                    <div className="subscribe-body">
                        <div className="subscribe-text">
Your contribution will help us accelerate the improvement of technology.
                        </div>
                        

  <NavLink to='/donate'><div className="donate-button" >
  <img src="https://img.icons8.com/parakeet-line/96/rupee.png" alt="rupee"/>
  <p>DONATE</p>
  
  </div></NavLink>


                        
                    </div>
                </div>
            </div>

        </div>
        <div className="divider-underline"></div>
        <div className="follow">Follow Us</div>
        <div className="underline-middle"></div>
        <div className="social-media">
            <img  src="https://img.icons8.com/ios/50/FFFFFF/facebook-new.png" alt="facebook-new"/>
            <img  src="https://img.icons8.com/ios/50/FFFFFF/linkedin-circled--v1.png" alt="facebook-circled--v1"/>
            <img  src="https://img.icons8.com/ios/50/FFFFFF/twitter-circled--v1.png" alt="facebook-circled--v1"/>
            <img  src="https://img.icons8.com/ios/50/FFFFFF/instagram-new--v1.png" alt="instagram-new--v1"/>
            <img  src="https://img.icons8.com/ios/50/FFFFFF/github--v1.png" alt="github--v1"/>
        </div>
        <div className="underline-middle-2"></div>
        <div className="copyright">
<strong>&copy; <a href="">2023,  Team-Bullseye</a></strong>
        </div>
    </section>

  </div>
  
  
  )
}


const cardsData = [
  {
    title: 'Memory Loss',
    image: memoryloss,
    alt: 'Memory Loss Image',
    description:
      'Forgetting recently learned information or important dates, asking repetitive questions, and needing memory aids are common signs.',
  },
  {
    title: 'Challenges in Daily Tasks',
    image: readProb,
    alt: 'Challenges in Daily Tasks Image',
    description:
      'Difficulty completing familiar tasks, organizing, or following a recipe can be early indicators.',
  },
  {
    title: 'Disorientation',
    image: disor,
    alt: 'Disorientation Image',
    description: 'Losing track of time, place, or getting confused about surroundings.',
  },
  {
    title: 'Vision Changes',
    image: readProb,
    alt: 'Vision Changes Image',
    description:
      'Problems with balance, reading, judging distance, or determining color contrast may occur.',
  },
  {
    title: 'Communication Issues',
    image: lonely,
    alt: 'Communication Issues Image',
    description:
      'Struggling to follow or join conversations, repeating oneself, or difficulty finding the right words.',
  },
  {
    title: 'Misplacing Items',
    image: misplace,
    alt: 'Misplacing Items Image',
    description: 'Putting things in unusual places and accusing others of stealing as the disease progresses.',
  },
  {
    title: 'Mood Swing',
    image: personality,
    alt: 'Mood and Personality Changes Image',
    description:
      'Increased anxiety, aggression, withdrawal from social activities, and inappropriate emotional outbursts can be observed.',
  },
  {
    title: 'Severe Symptoms',
    image: seizure,
    alt: 'Severe Symptoms Image',
    description:
      'Inability to communicate, loss of awareness of surroundings, weight loss, seizures, and loss of bowel control in severe cases.',
  },
];

export default Home
