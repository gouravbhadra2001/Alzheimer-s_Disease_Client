import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListGroup, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import LoginModal from './LoginModal';
import SignupModal from './SigupModal';

const NavBar = () => {

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



    const active = "active"

    const [loginmodalShow, setloginModalShow] = React.useState(false);
    const [signupmodalShow, setsignupModalShow] = React.useState(false);
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





    return (
        <div>
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

                <logoham>
                <img className="Logo" width="50" height="50" src="https://img.icons8.com/ios-filled/50/medical-doctor.png" alt="medical-doctor" />

                    {screenWidth <= 600 && <img width="30" height="30" src="https://img.icons8.com/cotton/64/menu.png" onClick={handleShowCanvas} alt="menu" />}
                </logoham>


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


                <div className='Auth'>
                    <div className="Register AuthItem">

                        <img onClick={() => setsignupModalShow(true)} width="30" height="30" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/add-user-male--v2.png" alt="add-user-male--v2" />

                    </div>
                    <div className="SignIn AuthItem">

                        <img width="35" onClick={() => setloginModalShow(true)} height="35" src="https://img.icons8.com/ios/50/1A1A1A/enter-2.png" alt="enter-2" />

                    </div>
                </div>
            </header>
            <LoginModal show={loginmodalShow} onHide={() => setloginModalShow(false)} />
            <SignupModal show={signupmodalShow} onHide={() => setsignupModalShow(false)} />


        </div>
    );
}

export default NavBar;
