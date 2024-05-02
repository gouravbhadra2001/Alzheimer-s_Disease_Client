import React, { useContext, useEffect } from 'react'
import Team from './Team'
import { ReactTyped } from 'react-typed'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { ActiveContext } from '../App'
import "../styles/about.css"
import benefitPatient from "../Assets/mri_patient.svg"
import benefitDoctor from "../Assets/doctor.svg"
const About = () => {



  const {activeIndex, setActiveIndex } = useContext(ActiveContext)

  useEffect(()=>{
  setActiveIndex(3)
  console.log(activeIndex)
  })

    const patientPoints = [
        { heading: 'Receive Accurate Predictions', text: 'Receive accurate predictions for early detection and understanding of Alzheimer\'s Disease.', img:'https://img.icons8.com/nolan/96/1A6DFF/C822FF/accuracy.png' },
        { heading: 'Gain Insights', text: 'Gain insights into your condition to make informed decisions about treatment and lifestyle changes.', img: 'https://img.icons8.com/nolan/96/1A6DFF/C822FF/customer-insight.png' },
        { heading: 'Access User-friendly Tools', text: 'Access user-friendly tools and resources to track your cognitive health and monitor progress.' , img: 'https://img.icons8.com/nolan/96/1A6DFF/C822FF/maintenance.png'},
      ];
    
      const doctorPoints = [
        { heading: 'Utilize Reliable Predictions', text: 'Utilize reliable predictions to aid in early diagnosis and intervention planning for patients.', img: 'https://img.icons8.com/nolan/96/1A6DFF/C822FF/trust.png'},
        { heading: 'Enhance Patient Care', text: 'Enhance patient care by incorporating accurate insights into treatment strategies and care plans.', img: 'https://img.icons8.com/nolan/96/1A6DFF/C822FF/doctor-male.png' },
        { heading: 'Stay Informed', text: 'Stay informed about the latest developments in Alzheimer\'s Disease research and predictive technologies.', img: 'https://img.icons8.com/nolan/96/1A6DFF/C822FF/information.png' },
      ];
    return (<div className='fade-in'>
        <section className='aboutTeam slide-in-bottom1'>
    


    <h1>MEET OUR TEAM</h1>
    <br />
    <p className='team_thanks'>Thanks to my team meambers</p>

<br />
 <Team/>

 </section>

 <section className='benefit slide-in-bottom2'>

 <h1>How our system is might be benevolent?</h1>
      <br />
      <div>
      
        <div className='benefit-patient-section slide-in-bottom3'>
     
          <br />
          <div className='benefit-patient-section-body'>
          <div className='benefit-title-img vibrate-1'>
          <h2>For Patients</h2>
          <div className='benefit-patient-img'>
          <img src={benefitPatient} alt="" srcset="" />
          </div>
          </div>
         
          
          <div className='benefit-card-container'>
  {
    patientPoints.map((point, index) => {
      return (
        <div className= "benefit-card" key={index}>
          <div className="benefit-card-icon">
            <img height="50" width="50" src={point.img} alt="" />
          </div>
          <div className="benefit-card-heading">
            <p>{point.heading}</p>
          </div>   
          <div className="benefit-card-text">
            {point.text}
          </div>   
        </div>
      );
    })
  }
</div>

          </div>
          
        </div>
        <br />
        <div className='benefit-doctor-section slide-in-bottom5'>
       
          <br />
          <div className='benefit-doctor-section-body'>
          <div className='benefit-title-img vibrate-1'>
          <h2>For doctors</h2>
          <div className='benefit-doctor-img'>
          <img src={benefitDoctor} alt="" srcset="" />
          </div>
          </div>
          
          <div className='benefit-card-container'>
  {
    doctorPoints.map((point, index) => {
      return (
        <div className= "benefit-card" key={index}>
          <div className="benefit-card-icon">
            <img height="50" width="50" src={point.img} alt="" />
          </div>
          <div className="benefit-card-heading">
            <p>{point.heading}</p>
          </div>   
          <div className="benefit-card-text">
            {point.text}
          </div>   
        </div>
      );
    })
  }
</div>

          </div>
          
        </div>
      </div>
    </section>

    
   
    <section className='thanks'>
    <div>
      <h1>Thanks for Visiting!</h1>
      <ReactTyped strings={["We appreciate your visit."]} typeSpeed={100} loop />
      </div>
    </section>
    

      
    </div>
        


    )
}

export default About
