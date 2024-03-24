import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import { colors } from '@mui/material';



const NavBar = () => {
    const { loginWithRedirect ,   isAuthenticated, logout, user} = useAuth0();


    const menu_names = ['Home', 'Prediction', 'Gallery', 'About'];

    const iconLinks = {
        "Home": "https://img.icons8.com/material-rounded/24/home.png",
        "Prediction": "https://img.icons8.com/ios-filled/50/artificial-intelligence.png",
        "Gallery": "https://img.icons8.com/fluency-systems-filled/48/gallery.png",
        "About": "https://img.icons8.com/material/24/about--v1.png"
    };
    const iconLinks_white = {
        "Home": "https://img.icons8.com/material-sharp/24/FFFFFF/home.png",
        "Prediction": "https://img.icons8.com/ios-filled/50/FFFFFF/artificial-intelligence.png",
        "Gallery": "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/gallery.png",
        "About": "https://img.icons8.com/material/24/FFFFFF/about--v1.png"
    }


    const reqs = {
        "Home": "/",
        "Prediction": "/prediction",
        "Gallery": "/gallery",
        "About": "/about"
    };
    const [ishomeHovered, setIshomeHovered] = useState(false);
    const [ispredictionHovered, setIspredictionHovered] = useState(false);
    const [isGalleryHovered, setIsGalleryHovered] = useState(false);
    const [isAboutHovered, setIsAboutHovered] = useState(false);

    const [openHome, setOpenHome] = useState(false);
    const [openPrediction, setOpenPrediction] = useState(false);
    const [openGallery, setOpenGallery] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);

    const [showProfileCanvas, setShowProfileCanvas] = useState(false);

    const handleCloseProfileCanvas = () => setShowProfileCanvas(false);
    const handleShowProfileCanvas = () => setShowProfileCanvas(true);

    const active = "active"

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

   
        const fetchInsertData = async () => {
            if (isAuthenticated && user) {
                try {
                    console.log("Fetching api ")
                    const response = await fetch("https://alzheimer-s-disease-server-with.onrender.com/insertData", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "name": user.name,
                            "email": user.email,
                            "subscribed": 0,
                            "reviews": [],
                            "predictions": [],
                            "starval": 0
                          
                        })
                    });
                    if (response.ok) {
                        console.log("User data stored successfully");
                    } else {
                        console.warn("Failed to store user data:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error storing user data:", error);
                }
            }
        };

   

    


    return (
        <div >
            <Offcanvas show={showCanvas} onHide={handleCloseCanvas} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='appDrawer-body'>
                    <ListGroup>

                        <NavLink className="navlink" to="/">
                            <ListGroup.Item action variant='light'>
                                Home
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink className="navlink" to="/prediction">
                            <ListGroup.Item action variant='light'>
                                Prediction
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink className="navlink" to="/gallery">
                            <ListGroup.Item action variant='light'>
                                Gallery
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink className="navlink" to="/about">
                            <ListGroup.Item action variant='light'>
                                About
                            </ListGroup.Item>
                        </NavLink>

                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
            <header>

               
                <h1>ATZ</h1>

                   
                


                {screenWidth > 600 &&
                    <nav>


                        {<div className={"navItem" + (openHome?" active":"")} key={menu_names[0]} onClick={() => { setOpenHome(true); setOpenPrediction(false); setOpenGallery(false); setOpenAbout(false) }} onMouseEnter={() => { setIshomeHovered(true); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(false) }}
                            onMouseLeave={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(false) }}>

                            <NavLink className="menu-btn" to={reqs["Home"]}>


                                <img width="24" height="24" src={ishomeHovered?iconLinks_white[menu_names[0]]: iconLinks[menu_names[0]]} alt={menu_names[0]} />

                                <Collapse className='menu-extended-content' in={ishomeHovered || openHome} dimension="width">
                                    <div id="example-collapse-text">

                                        {menu_names[0]}

                                    </div>
                                </Collapse>
                            </NavLink>


                        </div>}


                        <div className={"navItem" + (openPrediction?" active":"")} key={menu_names[1]} onClick={() => { setOpenHome(false); setOpenPrediction(true); setOpenGallery(false); setOpenAbout(false) }} onMouseEnter={() => { setIshomeHovered(false); setIspredictionHovered(true); setIsGalleryHovered(false); setIsAboutHovered(false) }}
                            onMouseLeave={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(false) }}>

                            <NavLink className="menu-btn" to={reqs["Prediction"]}>


                                <img width="24" height="24" src={ispredictionHovered?iconLinks_white[menu_names[1]]: iconLinks[menu_names[1]]} alt={menu_names[1]} />

                                <Collapse className='menu-extended-content' in={ispredictionHovered || openPrediction} dimension="width">
                                    <div id="example-collapse-text">

                                        {menu_names[1]}

                                    </div>
                                </Collapse>
                            </NavLink>


                        </div>

                        <div className={"navItem" + (openGallery?" active":"")} key={menu_names[2]} onClick={() => { setOpenHome(false); setOpenPrediction(false); setOpenGallery(true); setOpenAbout(false) }} onMouseEnter={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(true); setIsAboutHovered(false) }}
                            onMouseLeave={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(false) }}>

                            <NavLink className="menu-btn" to={reqs["Gallery"]}>


                                <img width="24" height="24" src={isGalleryHovered?iconLinks_white[menu_names[2]]: iconLinks[menu_names[2]]} alt={menu_names[2]} />

                                <Collapse className='menu-extended-content' in={isGalleryHovered || openGallery} dimension="width">
                                    <div id="example-collapse-text">

                                        {menu_names[2]}

                                    </div>
                                </Collapse>
                            </NavLink>


                        </div>

                        <div className={"navItem" + (openAbout?" active":"")} key={menu_names[3]} onClick={() => { setOpenHome(false); setOpenPrediction(false); setOpenGallery(false); setOpenAbout(true) }} onMouseEnter={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(true) }}
                            onMouseLeave={() => { setIshomeHovered(false); setIspredictionHovered(false); setIsGalleryHovered(false); setIsAboutHovered(false) }}>

                            <NavLink className="menu-btn" to={reqs["About"]}>


                                <img width="24" height="24" src={isAboutHovered?iconLinks_white[menu_names[3]]: iconLinks[menu_names[3]]} alt={menu_names[3]} />

                                <Collapse className='menu-extended-content' in={isAboutHovered || openAbout} dimension="width">
                                    <div id="example-collapse-text">

                                        {menu_names[3]}

                                    </div>
                                </Collapse>
                            </NavLink>


                        </div>



                    </nav>
                }

<logoham>
{
                     user && isAuthenticated? 
<div style={{cursor:"pointer"}} onClick={handleShowProfileCanvas}><Avatar alt={user.name} src="/static/images/avatar/3.jpg" /></div>
 :  <div className='Auth'><div className="SignIn AuthItem"><img width="20" onClick={() => loginWithRedirect()} height="20" src="https://img.icons8.com/ios/50/1A1A1A/enter-2.png" alt="enter-2" /></div></div>


                   }
                    
                   <Offcanvas show={showProfileCanvas} onHide={handleCloseProfileCanvas} placement='end'>
                   <Offcanvas.Header closeButton>
  <Offcanvas.Title>
    
  </Offcanvas.Title>
</Offcanvas.Header>
  <Offcanvas.Body>
  { user && isAuthenticated ? (
    <>
      
      <br />
    
      <ListGroup>
      { user && isAuthenticated ? (
      <Card style={{width:"fit-content"}}>
      <Card.Header><Avatar sx={{ width: 56, height: 56, textAlign: 'center' }} alt={user.name} src={user.name} /></Card.Header>
      
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>{user.email}</Card.Subtitle>
        </Card.Body>
      </Card>
    ) : null }
    <br />
    <NavLink style={{textDecoration: "none"}}>
          <ListGroup.Item action onClick={fetchInsertData}>Save Your Basic Data</ListGroup.Item>
        </NavLink>
        <NavLink style={{textDecoration: "none"}} to="/profile">
          <ListGroup.Item action>Profile</ListGroup.Item>
        </NavLink>
        <NavLink style={{textDecoration: "none"}} to="/dashboard">
          <ListGroup.Item action>Dashboard</ListGroup.Item>
        </NavLink>
        <NavLink style={{textDecoration: "none"}} to="/settings">
          <ListGroup.Item action>Settings</ListGroup.Item>
        </NavLink>
        <NavLink style={{textDecoration: "none"}} to="/reviews">
          <ListGroup.Item action>Reviews</ListGroup.Item>
        </NavLink>
        <NavLink style={{textDecoration: "none"}} to="/contributions">
          <ListGroup.Item action>Contributions</ListGroup.Item>
        </NavLink>
        <a href = "https://chatbotproject-k9sn8twzfyj2gdrtgsvhcy.streamlit.app/" style={{textDecoration: "none"}} >
          <ListGroup.Item action>Chatbot</ListGroup.Item>
        </a>
      </ListGroup>
    </>
  ) : null }
</Offcanvas.Body>
  <div className="SignOut AuthItem"><img width="35" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} height="35" src="https://img.icons8.com/ios/50/exit--v1.png" alt="enter-2" /></div>
</Offcanvas>

                    
      {screenWidth <= 600 &&  <div class="hamburger" onClick={handleShowCanvas}>
            <span class="fa-fa-bar"></span>
            <span class="fa-fa-bar"></span>
            <span class="fa-fa-bar"></span>
        </div>}
</logoham>
               
                   
            </header>
          

        </div>
    );
}


export default NavBar;