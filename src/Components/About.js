import React from 'react'
import Team from './Team'
import { ReactTyped } from 'react-typed'
import { Col, ListGroup, Row } from 'react-bootstrap'


const About = () => {
    const patientPoints = [
        { heading: 'Receive Accurate Predictions', text: 'Receive accurate predictions for early detection and understanding of Alzheimer\'s Disease.' },
        { heading: 'Gain Insights', text: 'Gain insights into your condition to make informed decisions about treatment and lifestyle changes.' },
        { heading: 'Access User-friendly Tools', text: 'Access user-friendly tools and resources to track your cognitive health and monitor progress.' },
      ];
    
      const doctorPoints = [
        { heading: 'Utilize Reliable Predictions', text: 'Utilize reliable predictions to aid in early diagnosis and intervention planning for patients.' },
        { heading: 'Enhance Patient Care', text: 'Enhance patient care by incorporating accurate insights into treatment strategies and care plans.' },
        { heading: 'Stay Informed', text: 'Stay informed about the latest developments in Alzheimer\'s Disease research and predictive technologies.' },
      ];
    return (<>
        <section className='aboutAlz'>
    


    <h1 style={{fontSize:"70px"}}><center><ReactTyped strings={["MEET OUR TEAM"]} typeSpeed={100} loop /></center></h1>
    <br />
    <p><center>Thanks to my team meambers</center></p>

<br />
 <Team/>

 </section>

 <section>
      <Row>
        <Col>
          <h2>For Patients</h2>
          <br />
          <ListGroup>
            {patientPoints.map((point, index) => (
                <>
              <ListGroup.Item key={index} >
                <h4>{point.heading}</h4>
                <p>{point.text}</p>
              </ListGroup.Item>
              <br/>
              </>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h2>For Doctors</h2>
          <br />
          <ListGroup>
            {doctorPoints.map((point, index) => (
                <>
              <ListGroup.Item key={index}>
                <h4>{point.heading}</h4>
                <p>{point.text}</p>
              </ListGroup.Item>
              <br/>
              </>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </section>

    <section>
      <center>
      <h1>Thanks for Visiting!</h1>
      <ReactTyped strings={["We appreciate your visit."]} typeSpeed={100} loop />
      </center>
    </section>
    </>
        


    )
}

export default About
