import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Nav, Row, Tab, Card, Image, ListGroup, Accordion, ListGroupItem, CardFooter, CardHeader, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ActiveContext } from '../App';

const PredictionHistory = ({ user }) => {
    const [predictionHistory, setPredictionHistory] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const {activeIndex, setActiveIndex } = useContext(ActiveContext);
    const predictionSymptoms = {
      "Very Mild Demented": [
        { title: "Forgetfulness:", description: "Slight memory lapses, especially of recent events." },
        { title: "Difficulty finding words:", description: "Occasional difficulty in finding the right word or name." },
        { title: "Misplacing items:", description: "Misplacing everyday objects." },
        { title: "Difficulty with planning and organizing:", description: "Minor difficulty in planning or organizing." }
      ],
      "Mild Demented": [
        { title: "Increased forgetfulness:", description: "Memory loss that disrupts daily life, forgetting names or recent events frequently." },
        { title: "Challenges in problem-solving:", description: "Difficulty in solving problems or planning steps to complete a task." },
        { title: "Confusion with time or place:", description: "Losing track of dates, seasons, or the passage of time." },
        { title: "Trouble completing familiar tasks:", description: "Difficulty in completing familiar tasks at home, work, or leisure." }
      ],
      "Non Demented": [
        { title: "No significant symptoms of dementia", description: "" },
        { title: "Normal cognitive function", description: "" }
      ],
      "Moderate Demented": [
        { title: "Increased memory loss:", description: "Forgetfulness extends to significant events or personal history." },
        { title: "Wandering and getting lost:", description: "Becoming disoriented even in familiar places." },
        { title: "Personality and behavioral changes:", description: "Mood swings, increased irritability, and agitation." },
        { title: "Difficulty with daily tasks:", description: "Difficulty with tasks such as dressing, bathing, and eating." }
      ]
    };

    useEffect(() => {
        setActiveIndex(5);
    }, []);

    const handleFetchPredictionHistory = async () => {
        try {
            const response = await fetch("http://localhost:5000/predictionHistory", {
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
            setPredictionHistory(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChatHistory = async () => {
        try {
            const response = await fetch("http://localhost:5000/chatHistory", {
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
            setChatHistory(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleFetchPredictionHistory();
        handleChatHistory();
    }, []);

    const formatAMPM = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '';
        }
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    };

    const PredictionHistoryItem = ({ item }) => {
        const predictTime = new Date(item.predict_time);
        return (
            <Card className="mb-4">
                <CardFooter style={{border: "none"}}>
                    <ListGroup style={{ padding: 10 }}>
                        <ListGroup.Item style={{ fontSize: 15 }}>
                            <strong>Prediction Date:</strong> {predictTime.toLocaleDateString()}
                            <br />
                            <strong>Prediction Time:</strong> {formatAMPM(predictTime)}
                        </ListGroup.Item>
                    </ListGroup>
                </CardFooter>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col sm={5}>
                            <center><img src={`data:image/jpeg;base64,${item.uploadedImage}`} alt="Uploaded Image" className="img-thumbnail" style={{height: "200px", width: "200px"}}/></center>
                        </Col>
                        <Col sm={6}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <strong>Prediction:</strong> {item.predictionText}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {console.log('Prediction Text:', item.predictionText)}
                                        {console.log('Symptoms:', predictionSymptoms[item.predictionText])}
                                        {predictionSymptoms[item.predictionText] && predictionSymptoms[item.predictionText].map((symptom, index) => (
                                            <div key={index}>
                                                <ListGroupItem style={{borderBottom: (index!==3)?"1px solid gray":"none"}}>
                                                    <strong style={{fontSize: 12 }}>{symptom.title}</strong>
                                                    <p style={{fontSize: 12}}>{symptom.description}</p>
                                                </ListGroupItem>
                                            </div>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <strong>Confidence:</strong> { Math.round((item.confidence + Number.EPSILON) * 100)}%
                                    </Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
            <Row>
                <Col sm={3} md = {2}>
                    <div style={{position:"fixed"}}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Prediction History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Chat History</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <center>
                                <h2>Prediction History</h2>
                                <br />
                                <div style={{width: "80%"}}>
                                    {predictionHistory.map((item, index) => (
                                        <div key={index}>
                                            <PredictionHistoryItem item={item} />
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </center>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div>
                                <center><h2>Chat History</h2></center>
                                <br />
                                {chatHistory.map((chat, index) => (
                                    <div key={index} style={{width: "90%", marginInline: "auto"}}>
                                        <Card>
                                            <CardFooter style={{border: "none"}}>
                                                <ListGroup style={{ padding: 10 }}>
                                                    <ListGroup.Item style={{ fontSize: 15 }}>
                                                        <strong>Chat Date:</strong> {new Date(chat.response_time).toLocaleDateString()}
                                                        <br />
                                                        <strong>Chat Time:</strong> {formatAMPM(chat.response_time)}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </CardFooter>
                                            <ListGroup style={{padding: "10px", border: "none"}}>
                                                <ListGroupItem>
                                                    <strong><Avatar style={{width: 50, height:50}} alt={user.name} src={user && (user.picture)} /></strong> {chat.userQuestion}<br />
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <strong><img width="50" height="50" src="https://img.icons8.com/color/96/bot.png" alt="bot"/></strong><br />  <Markdown remarkPlugins={[remarkGfm]}>{chat.botResponse}</Markdown><br />
                                                </ListGroupItem>
                                            </ListGroup>
                                            <br />
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default PredictionHistory;


