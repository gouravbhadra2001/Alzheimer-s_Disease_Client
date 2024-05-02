import { Avatar } from '@mui/material';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import "../styles/team.css";
import dp from "../Assets/Designer (4).png"
import ankita from "../Assets/Ankita.jpg"
import kobi from "../Assets/Archis.jpg"
import srijan from "../Assets/Srijan.jpg"
import anirban from "../Assets/Anirban.jpg"
import lead_developer from "../Assets/Self.png"
import ard from "../Assets/Ardrish.jpg"
const Team = () => {
  const teamMembers = [
    {
      name: 'Gourav Bhadra',
      classRoll: 'CSE-2021/031',
      img: lead_developer,
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: "violet"
    },
    {
      name: 'Archisman Ghosh',
      classRoll: 'CSE-2021/026',
      img: kobi,
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor:"green"
    },
    {
      name: 'Srijan Mondal',
      classRoll: 'CSE-2021/036',
      img: srijan,
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'red'
    },
    {
      name: 'Anirban Mitra',
      classRoll: 'CSE-2021/046',
      img: anirban,
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: "orange"
    },
    
    {
      name: 'Ankita Dhara',
      classRoll: 'IT-2021/097',
      img: ankita,
      department: 'Information Technology',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'pink'
    },
    {
      name: 'Adrish Das',
      classRoll: 'IT-2021/092',
      img: ard,
      department: 'Information Technology',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'blue'
    }
  ];

  return (
    <div className="developer">

    {teamMembers.map((developer, index)=>(
      <div className = 'developer-card' key={index}>
            <img className="developer-card-img" src={developer.img} alt="img"/>
            <div className="developer-card-content">
                <div className="developer-card-title">
                    {developer.name}
                </div>
                <div className="developer-card-subtitle">
                    {developer.classRoll}
                </div>
                <div className="developer-card-divider-1"></div>
                <div className="developer-card-text">
                    <p>{developer.department}</p>
                </div>
                <div className="developer-card-divider-2"></div>
                <div className="developer-card-footer">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png"/>  
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png"/>  
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/mail.png"/>   
                             </div>
            </div>
        </div>
    ))}
 
    </div>
   
  );
};

export default Team;
