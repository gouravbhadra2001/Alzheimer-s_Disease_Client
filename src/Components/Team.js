import { Avatar } from '@mui/material';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const Team = () => {
  const teamMembers = [
    {
      name: 'Gourav Bhadra',
      classRoll: 'CSE-2021/031',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: "violet"
    },
    {
      name: 'Archisman Ghosh',
      classRoll: 'CSE-2021/026',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor:"green"
    },
    {
      name: 'Anirban Mitra',
      classRoll: 'CSE-2021/046',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: "orange"
    },
    {
      name: 'Srijan Mandal',
      classRoll: 'CSE-2021/036',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Computer Science and Engineering',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'red'
    },
    {
      name: 'Ankita Dhara',
      classRoll: 'IT-2021/097',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Information Technology',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'pink'
    },
    {
      name: 'Adrish Das',
      classRoll: 'IT-2021/092',
      avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      department: 'Information Technology',
      facebook: 'https://www.facebook.com/',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/',
      dpColor: 'blue'
    }
  ];

  return (
    <Row>
      {teamMembers.map((member, index) => (
        <Col key={index} lg={4} md={6} className="mb-4">
          <Card style={{height:"300px", padding:"20px"}}>
            <Avatar src={member.name} alt={member.name} sx={{ width: 100, height: 100, margin: 'auto', backgroundColor: member.dpColor }} />
            <Card.Body>
              <Card.Title>{member.name}</Card.Title>
              <Card.Text>
                <strong>Class Roll:</strong> {member.classRoll}<br />
                <strong>Department:</strong> {member.department}<br />
              </Card.Text>
              <div>
                {/* Social media icons */}
                <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                  <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="facebook-new"/>
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/github.png" alt="github"/>
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/linkedin-circled--v1.png" alt="linkedin-circled--v1"/>
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Team;
