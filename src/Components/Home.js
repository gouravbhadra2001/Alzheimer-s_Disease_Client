import React from 'react'
import { Carousel, Card, Row, Col , Container, NavLink, Form, Button} from 'react-bootstrap'
import "../styles/home.css"
import { ListGroup } from 'react-bootstrap'
import memoryloss from "../Assets/Memory Loss.png"
import disor from "../Assets/Disorientation.png"
import lonely from "../Assets/Lonely.png"
import misplace from "../Assets/misplacing.png"
import readProb from "../Assets/Reading Problem.png"
import seizure from "../Assets/Seizure.png"
import personality from "../Assets/Personality Change.png"
import "../styles/footer.css"
import { useAuth0 } from '@auth0/auth0-react'

import Typewriter from 'typewriter-effect/dist/core';
import {ReactTyped} from "react-typed";



const Home = () => {

  const { loginWithRedirect , isAuthenticated, logout, user} = useAuth0();
  const cardHeight = "300px"


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
  return (<>
<section className='welcome'>
      
      <h1>
       
        <ReactTyped strings={["WELCOME", (isAuthenticated && user)?" "+ user.name:""]} typeSpeed={100} loop />
      </h1>
     
      <p> to <strong style={{fontWeight:"600"}}>Alzheimer's Prediction Zone</strong></p>
      
    </section>
 <br /><br />
    <section className='aboutAlz'>
    


      <h2>What is Alzheimer's Disease?</h2>
      <br />
      <p>Alzheimer's disease is a type of dementia that affects memory, thinking, and behavior. It is not a normal part of aging and is the most common cause of dementia, accounting for 60-80% of cases

. The disease progresses over time, with symptoms worsening gradually. In its early stages, individuals may experience mild memory loss, but in late-stage Alzheimer's, they can lose the ability to communicate and respond to their environment

.</p>
<div>
<br />
    <h3>Symptoms of Alzheimer's Disease:</h3>
<br />
    <Row>
      {cardsData.map((card, index) => (
        <Col md={3} key={index} style={{ marginBottom: '15px' }}>
          <Card style={{ height: cardHeight, backgroundColor:"black", color: "white"}}>
            <Card.Img variant="top" src={card.image} alt={card.alt} height="150" width="150" />
            <Card.Body>
              <Card.Title style={{fontSize: "15px"}}>
                <strong>{card.title}</strong>
              </Card.Title>
              <Card.Text style={{fontSize: "12px"}}>{card.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
</div>

    <p>Alzheimer's disease has no cure currently; however, there are treatments like aducanumab and lecanemab that can help reduce cognitive decline in early stages

. Early diagnosis is crucial for planning care needs and considering financial arrangements

. Caregiving for individuals with Alzheimer's can be challenging but can also bring personal fulfillment and improved family relationships

. As the disease progresses, individuals often require more intensive care due to their declining abilities

.
In conclusion, Alzheimer's disease is a progressive condition that affects memory and cognitive functions. Recognizing the warning signs early on and seeking medical advice promptly can help manage the disease effectively and plan for the future care needs of individuals affected by Alzheimer's.</p>


    </section>


    <section>
      <h2>Impotance of AI prediction</h2>
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
    <footer className="footer">
      <Container className='footerContainer'>
        <Row>
          {/* First Column */}
          {isAuthenticated && <Col lg={4} md={6}>
            <div className="reviewDiv">
              <h3 className="reviewTitle footerTitle">Review</h3>
              <Form>
                <Form.Group controlId="reviewTextArea">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Please describe your experience."
                    className='reviewText'
                  />
                </Form.Group>
                <br />
                <Button className='btn-sm' variant='light' >Submit Review</Button>
              </Form>
              {/* 5 Stars with ratings */}
              {/* Implement your star rating component here */}
            </div>
          </Col>}

          <br />
          <Col lg={4} md={6}>
            <div className="helpDiv">
              <h3 className="helpTitle footerTitle">Help</h3>
              
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="/faq">FAQ</NavLink>
                
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="/user-guidance">User Guidance</NavLink>
                
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="/sample-video">Sample Video</NavLink>
                
            </div>
          </Col>
<br />
        
          
            <Col lg={4} md={6} >
              <div className="contactDiv">
                <h3 className="contactTitle footerTitle">Get in Touch</h3>
                <br />
                {/* Social Media Icons */}
                {/* Implement your social media icons here */}
                <div className="social_media" style={{display:'flex'}}>
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="#" ><img width="24" height="24" src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook-new"/></NavLink>
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="#" ><img width="24" height="24" src="https://img.icons8.com/fluency/48/whatsapp.png" alt="whatsapp"/></NavLink>
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="#" ><img width="24" height="24" src="https://img.icons8.com/color/48/twitter-circled--v1.png" alt="twitter-circled--v1"/></NavLink>
                  <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="#" ><img width="24" height="24" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram-new--v1"/></NavLink>
                </div>
                <br />
                 <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} className='footerNavItem' to="/developer-team">Developer Team</NavLink>
                 <br />
                {isAuthenticated && <Button variant='light' className='btn-sm'>Subscribe</Button>}
              </div>
            </Col>
          
        </Row>

        <br />
        <div className="footer_bottom">
        
          <Row className="copyright">
        
          
            <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} to="">© Team: BullsEye 2024 </NavLink>
            <NavLink style={{fontSize:"12px", textDecoration: "Underline", color:"rgb(107, 94, 94);"}} to="">All Rights Reserved </NavLink>
   
            
          </Row>
        </div>
      </Container>
    </footer>

  </>
  
  
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
    title: 'Mood and Personality Changes',
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