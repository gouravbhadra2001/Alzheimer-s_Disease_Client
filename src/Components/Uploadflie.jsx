import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Spinner, Alert, Form, InputGroup, ProgressBar, Tabs, Tab, Fade, Row, Col, OverlayTrigger, Tooltip, Modal, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import Chatbot from './Chatbot';








const Uploadfile = () => {
  const [image, setImage] = useState();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [open, setOpen] = useState(false);
  const [postViewImage, SetPostViewImage] = useState();
  const [shownResult, setShownResult] = useState(false);
  const [showAccuracyTooltip, setShowAccuracyTooltip] = useState(false);
  const [showConfidenceTooltip, setShowConfidenceTooltip] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null);


const generateQuestions =()=> {
  let commonQuestions = [
    'What are the symptoms of Alzheimer\'s disease?',
    'How is Alzheimer\'s disease diagnosed?',
    'What are the treatment options for Alzheimer\'s disease?',
  ];

  if (prediction && prediction.prediction) {
    const stage = prediction.prediction;
    const stageQuestions = [
      `What do you mean by ${stage}?`,
      `What are the physical symptoms of ${stage}?`,
      `How to identify from outside of the body whether ${stage} is there?`
    ];

    commonQuestions = commonQuestions.concat(stageQuestions);
  }

  return commonQuestions;
}

   
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };



  
  function handleImageUpload(event) {
    setImage(event.target.files[0]);
  }

  function handleImageFetch() {
    setPrediction(null);
    const formData = new FormData();
    formData.append('image', image);
    setIsUploaded(false);
    axios.post('https://alzheimer-s-disease-server.onrender.com/upload', formData).then((res) => {
      setIsUploaded(true);
      SetPostViewImage(URL.createObjectURL(image));
      setIsOk(true);

      toast.success('Image uploaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      toast.warning('Please wait till the success message of upload is shown...', {
        position: 'top-right',
        autoClose: false, // Prevent auto closing
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }

  function handlePredict() {
    setLoading(true);
    try {
      setIsOk(true);
      axios.get('https://alzheimer-s-disease-server.onrender.com/predict').then((res) => {
        setPrediction(res.data);
        setLoading(false);
        setOpen(true);
      });
    } catch (error) {
      setIsOk(false);
      if (error.isAxiosError || !error.response) {
        toast.error('Sorry for inconvenience: :( \nPlease reload and try again, otherwise this will take too long', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to fetch prediction. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  function handlePredictButton() {
    if (prediction != null) setShownResult(true);
  }
/*
  function handleAISuggestions(){
    setShowChatbotModal(true);
  }
*/




  return (
    <>
    <Modal
      show={showChatbotModal}
      onHide={()=>setShowChatbotModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Get AI Suggestions <strong>⚠️</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {generateQuestions().map((question, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <br />
        <Chatbot initialInput={selectedQuestion} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setShowChatbotModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

      <ToastContainer />
      <section>
        <Row>
          <Col md={6}>
            <h2>Phases of Dementia in Alzheimer's Disease</h2>
            <p>
              <strong>Mild Dementia:</strong> This phase is characterized by mild cognitive decline, including
              forgetfulness and difficulty concentrating. <a href="#">Learn more</a>
            </p>
            <p>
              <strong>Non-Dementia:</strong> In this phase, cognitive decline is noticeable but does not significantly
              impair daily functioning. <a href="#">Learn more</a>
            </p>
            <p>
              <strong>Moderate Dementia:</strong> Moderate cognitive decline affects memory, reasoning, and comprehension,
              leading to difficulties with activities of daily living. <a href="#">Learn more</a>
            </p>
            <p>
              <strong>Very Mild Dementia:</strong> The earliest stage of dementia, characterized by subtle changes in
              cognition that may not be immediately apparent. <a href="#">Learn more</a>
            </p>
          </Col>
          <Col md={6} >
            <Form className="file-uploader">
              {!isUploaded && (
                <div className="input-container">
                  <input type="file" name="file" id="" onChange={handleImageUpload} />
                  <Button variant="primary" onClick={handleImageFetch} style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency-systems-filled/96/send-letter.png"
                      alt="send-letter"
                    />
                  </Button>
                </div>
              )}

              {isUploaded && (
                <Card style={{ width: '35vw', height: '35vh', textAlign: 'center', margin: '30px' }}>
                  <Card.Img variant="top" height="240" width="240" src={postViewImage} />
                  <Card.Body>
                    <Card.Title>PREDICTION RESULTS</Card.Title>
                    <Card.Text>
                      {isOk && prediction && (
                    
                        <Fade in={open} timeout={1000}>
                          <div id="example-fade-tex">
                            <Tabs defaultActiveKey="prediction" transition={false} justify={true} className="mb-3 mx-5 center">
                              <Tab eventKey="prediction" title="Prediction">
                                {prediction.prediction}
                              </Tab>
                              <Tab eventKey="confidence" title="Confidence">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="tooltip-confidence">Confidence: A measure of how certain the model is about its prediction</Tooltip>}
                                  show={showConfidenceTooltip}
                                >
                                  <span
                                    onMouseEnter={() => setShowConfidenceTooltip(true)}
                                    onMouseLeave={() => setShowConfidenceTooltip(false)}
                                  >
                                    Confidence
                                  </span>
                                </OverlayTrigger>
                                <ProgressBar style={{ height: '24px' }} now={Math.round((prediction.confidence + Number.EPSILON) * 100)} label={`${Math.round((prediction.confidence + Number.EPSILON) * 100)}%`} />
                              </Tab>
                              <Tab eventKey="aiAssistant" title="AI Assistant">
    <Button onClick={()=>setShowChatbotModal(true)}>Get Suggestions from our AI</Button>
    </Tab>
                            </Tabs>
                          </div>
                        </Fade>
                      )}
                      {isOk === false && 
                        <Alert variant="danger">
                          <Alert.Heading>Oops! Something went wrong :</Alert.Heading>
                          <p>{"Could you please reupload.."}</p>
                        </Alert>
                      }

                      {loading && (
                        <>
                          <Spinner animation="border" role="status">
                            <span className=""></span>
                          </Spinner>
                          <p>Predicting...</p>
                        </>
                      )}
                    </Card.Text>
                    {(!shownResult || image) && (
                
                      <Button
                        variant="success"
                        onClick={() => {
                          try {
                            handlePredict();
                            setIsOk(true);
                            setShownResult(true); 
                          } catch (error) {
                            setIsOk(false);
                            console.log(error);
                          }
                        }}
                      >
                        PREDICT
                      </Button>
                     
                    
                    )}
                  </Card.Body>
                </Card>
              )}
            </Form>
          </Col>
        </Row>
      </section>

      <section className='aboutAlz'>
        <Row>
          <Col md={6}  style={{padding: "30px"}}>
            <h2>How This AI Model Works?</h2>
            <br />
            <p>
              The AI model utilizes Convolutional Neural Networks (CNN) in Deep Learning trained on a moderate amount of
              data. The <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-accuracy">Accuracy: The measure of how often the model makes correct predictions</Tooltip>}
                show={showAccuracyTooltip}
              >
                <span
                  onMouseEnter={() => setShowAccuracyTooltip(true)}
                  onMouseLeave={() => setShowAccuracyTooltip(false)}
                >
                  accuracy
                </span>
              </OverlayTrigger> of the model depends on various factors including the amount of data, hyperparameters
              used, and other factors. It is important to understand terms like <a href="https://www.google.com/search?q=define+accuracy+and+confidence+in+machine+learning&sca_esv=bbe8785fd3a19ac1&rlz=1C1CHZN_enIN1029IN1029&sxsrf=ACQVn0_UXSo5Z3SNwHdB4AkNEfQxqk0Vww%3A1710275393182&ei=QbvwZe3dCouMseMPy5uhsAU&ved=0ahUKEwitgp2qyO-EAxULRmwGHctNCFYQ4dUDCBA&uact=5&oq=define+accuracy+and+confidence+in+machine+learning&gs_lp=Egxnd3Mtd2l6LXNlcnAiMmRlZmluZSBhY2N1cmFjeSBhbmQgY29uZmlkZW5jZSBpbiBtYWNoaW5lIGxlYXJuaW5nMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIwhZQkwpYjBNwAXgBkAEAmAGaAaABxAeqAQMwLje4AQPIAQD4AQGYAgegAtUGwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHAzEuNqAHvSc&sclient=gws-wiz-serp"><strong>Accuracy</strong></a> and{' '}
              <a href="https://www.google.com/search?q=define+confidence+in+machne+learning&rlz=1C1CHZN_enIN1029IN1029&oq=define+confidence+in+machne+learning&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE0NTE5ajBqMagCALACAA&sourceid=chrome&ie=UTF-8"><strong>Confidence</strong></a>.
            </p>
          </Col>
          <Col md={6}  style={{padding: "30px"}}>
            <h2>Disclaimer</h2>
            <br />
            <p>
              This prediction is based on a machine learning model and the accuracy may vary depending on the quantity
              and quality of the dataset. Our application is still in progress and your reviews will play a crucial
              role in its improvement.
            </p>
          </Col>
        </Row>
      </section>

      <section>
        <div className="container">
        <center>
          <h1>
          <ReactTyped strings={["For more information, don't hesitate to"]} typeSpeed={100} loop /><br/>  <a href="#">contact developer team</a> <br/> <ReactTyped strings={["read our"]} typeSpeed={100} loop /><br/> <a href="#">blog</a>
          </h1>
          </center>
        </div>
      </section>
      
    </>
  );
};

export default Uploadfile;
