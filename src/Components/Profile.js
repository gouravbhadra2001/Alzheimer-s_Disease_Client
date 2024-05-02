import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../styles/profile.css"

const ProfileForm = () => {
  const { isAuthenticated, user } = useAuth0();

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('New York, USA');

  // useEffect to set initial values
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/updateProfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            bio: bio,
            location: location
        })
    });
    

        if (!response.ok) {
            throw new Error("Failed to save profile"); // handle failed response
        }

        setEditable(false);
        alert("Saved");
    } catch (error) {
        console.error("Error saving profile:", error);
        // Handle error as needed
    }
};


  return (
    <div className='profile_editor_container'>
      <div className='badgedAvatarContainer'>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<Avatar style={{ height: 15, width: 15, backgroundColor: "white", border: "1px solid black", padding: "2px" }} src='https://img.icons8.com/material-rounded/24/pencil--v2.png' />}
          className='badgedAvatar'
        >
          <img className='avatarEdit' alt="Avatar" src={isAuthenticated && user ? user.picture : null} />
        </Badge>
      </div>
      <br />
      <Form className='form'>
        <Form.Group controlId="formName">
          <Form.Control type="text" placeholder="Enter name" value={name} readOnly={!editable} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="formEmail">
          <Form.Control type="email" placeholder="Enter email" value={email} readOnly={!editable} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="formBio">
          <Form.Control as="textarea" rows={3} placeholder="Enter bio" value={bio} readOnly={!editable} onChange={(e) => setBio(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group controlId="formLocation">
          <Form.Control type="text" placeholder="Enter location" value={location} readOnly={!editable} onChange={(e) => setLocation(e.target.value)} />
        </Form.Group>
        <br />
        <div className='buttonGroupProfile'>
          {!editable ? (
            <Button variant="primary" onClick={handleEdit}>Edit</Button>
          ) : (
            <Button variant="success" onClick={handleSave}>Save</Button>
          )}
          <Button variant='danger' className='btn_deleteProfile'>Delete Profile</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
