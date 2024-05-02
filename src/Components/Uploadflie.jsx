import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Placeholder, Button, Card, Spinner, Alert, Form, FormControl, InputGroup, ProgressBar, Tabs, Tab, Fade, Row, Col, OverlayTrigger, Tooltip, Modal, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactTyped } from 'react-typed';
import Chatbot from './Chatbot';
import { ActiveContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react';
import uploadImg from '../Assets/upload_1.svg';
import uploadIcon from '../Assets/Upload.png';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "../styles/modal.css"
import "../styles/ai_steps.css"
import dataCollection from "../Assets/dataset.json"
import predictionImg from "../Assets/prediction.json"
import aiTraining from "../Assets/ai_training.json"
import testing from "../Assets/testing.json"
import Lottie from 'lottie-react';
import "../styles/animation.css"
const Uploadfile = () => {
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [base64Img, setBase64Img] = useState();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState();
  const [isOk, setIsOk] = useState(false);
  const [open, setOpen] = useState(false);
  const [postViewImage, SetPostViewImage] = useState();
  const [shownResult, setShownResult] = useState(false);
  const [showAccuracyTooltip, setShowAccuracyTooltip] = useState(false);
  const [showConfidenceTooltip, setShowConfidenceTooltip] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { /*loginWithRedirect ,*/ isAuthenticated, /*logout,*/ user } = useAuth0();
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const [subscribed, setSubscribed] = useState()
  const [qna, setQna] = useState({ question: "", answer: "" })
  const { activeIndex, setActiveIndex } = useContext(ActiveContext)

  const handleGetQnA = (qna) => {
    setQna(qna);

  };

  const fetchInsertData = async () => {
    if (isAuthenticated && user) {
      try {
        const response = await fetch("https://alzheimer-s-disease-server-with.onrender.com/getSubscribedData", {
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
        console.log("Got data:", data);

        // Set the subscribed state based on the data received
        setSubscribed(data);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(1);
    console.log(activeIndex)
    fetchInsertData();
    //alert("Hello world")

  });

  const generateQuestions = () => {
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




  async function handleImageUpload(event) {
    const file = event.target.files[0]
    setImage(file);
    await setImageName(file.name);
    if (imageName) await alert(imageName)
  }



  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; 
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile); 
    });
  }




  function handleImageFetch() {
    setPrediction(null);
    const formData = new FormData();
    formData.append('image', image);
    setIsUploaded(false);
    setIsUploading(true)
    axios.post('http://localhost:8080/upload', formData).then((res) => {
      setIsUploaded(true);
      setIsUploading(false);
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


    });
  }

  {
    isUploading && (
      toast.warning('Please wait till the success message of upload is shown...', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      })
    )
  }
  async function handlePredict() {
    setLoading(true);
    try {
      setIsOk(true);
      axios.get('http://localhost:8080/predict').then((res) => {
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




  const handleSavePrediction = async (prediction, image, confidence) => {
    try {
      if (isAuthenticated && user) {
        const api = "http://localhost:5000/postPrediction";

        // Convert image to base64 string
        convertImageToBase64(image)
          .then((base64String) => {
            console.log("Base64 String:", base64String);

            // Send prediction data to the server
            return fetch(api, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                "name": user.name,
                "email": user.email,
                "prediction": {
                  "image": base64String,
                  "predictionText": prediction,
                  "confidence": confidence,
                  "predict_time": new Date().toISOString()
                }
              })
            });
          })
          .then(async (response) => {
            const responseData = await response.json();
            console.log(responseData);
          })
          .catch((error) => {
            console.error("Error handling save prediction:", error);
          });
      }
    } catch (error) {
      console.error("Error handling save prediction:", error);
    }
  }


  const handleSaveChats = async (question, answer) => {
    try {
      if (isAuthenticated && user) {
        const api = "http://localhost:5000/postChats";
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            "name": user.name,
            "email": user.email,
            "chatHistory": {
              "userQuestion": question,
              "botResponse": answer,
              "response_time": new Date().toISOString()
            }
          })
        });

        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
    //console.log(question+":\n"+answer)
  };
  const handleSelectedStepClick = (index) => {
    if (selectedStepIndex !== index) {
      setSelectedStepIndex(index);
    } else {
      setSelectedStepIndex(null); // Deselect the button if it's already selected
    }
  };

  return (
    <div className='fade-in'>


      <Modal
        show={showChatbotModal}
        onHide={() => setShowChatbotModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton closeVariant="danger" style={{backgroundColor: "transparent"}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Get AI Suggestions <strong>⚠️</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
      <h5>Frequently asked</h5>
        <ul className='common-questions'>
  {generateQuestions().map((question, index) => (
    <li
      key={index}
      className="common-question-item"
      onClick={() => handleQuestionClick(question)}
    >
      {question}
    </li>
  ))}
</ul>

          <br />
          <Chatbot initialInput={selectedQuestion} getQna={handleGetQnA} />
        </Modal.Body>
        <Modal.Footer >
          <div className='modal-footer'>
          <Button onClick={() => handleSaveChats(qna.question, qna.answer)} variant='outline-dark'>Save Chats</Button>
          <Button onClick={() => setShowChatbotModal(false)} variant='outline-danger'>Close</Button>
          </div>
         
        </Modal.Footer>
      </Modal>

      <ToastContainer />
      <section className='img-upload-predict-section '>
      {!image && !isUploaded && (
        <>
        <h2>Choose Image</h2>
<div className="uploader-head-underline"></div>
      </>

      )}
      
      {image && !isUploaded && (
        <>
        <h2>Upload Image</h2>
        <div className="uploader-head-underline"></div>
        </>

      )}
      {image && isUploaded && !loading && !prediction && (<>
        <h2>Predict Image</h2>
        <div className="uploader-head-underline"></div>
      </>)}

      {image && isUploaded && loading && !prediction && (<>
        <h2>Predicting...</h2>
        <div className="uploader-head-underline"></div>
      </>
      )}
      
      {
                  shownResult && image && prediction && !loading && (
                   <>
                   <h2>Checkout Results</h2>
        <div className="uploader-head-underline"></div>
                   </>
                    
               
                  )
                }
        <div className='img-uploader-section'>

          {!isUploaded && (
            
            <div className='img-uploader-vector'>
              <img src={uploadImg} alt="" srcset="" />
            </div>
          )}

          <div className='image-uploader-input-section' >
            <Form className="file-uploader">
              {!isUploaded && (
                <div className="input-container">
                  <InputGroup>
                    <FormControl
                      type="file"
                      name="file"
                      onChange={handleImageUpload}
                    />
                    <InputGroup.Text onClick={handleImageFetch} style={{ cursor: 'pointer' }}>
                      <img
                        width="24"
                        height="24"
                        src={uploadIcon}
                        alt="send-letter"
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              )}
            </Form>
          </div>
        </div>



        <div className='image-prediction-section'>
          {isUploaded && (
            <div className='uploaded-img-card-container slide-in-bck-center '>
              <div className='uploaded-img-card'>
                <div className='uploaded-img-card-heading'><p className='uploaded-image-name'>{imageName}</p></div>
                <img src={postViewImage} />




                {isOk === false &&
                  <Alert variant="danger">
                    <Alert.Heading>Oops! Something went wrong :</Alert.Heading>
                    <p>{"Could you please reupload.."}</p>
                  </Alert>
                }



                {(!shownResult || image) && !prediction && !loading && (

                  <div className='predict-button-container'>
                    <p>Hey, {user.name}, you hold the key to early detection. Together, let's decode the mysteries of your mind. Take charge, predict Alzheimer's today, and pave the way for a brighter tomorrow.</p>
                    <button
                      className="predict-button"
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
                    </button>
                  </div>



                )}


                {
                  (!shownResult || image) && !prediction && loading &&(
                    <div className='scanner slide-top'>
                    <div className="midLine"></div>
                    
                  </div>
                  )
                }

             

                {(!shownResult || image) && prediction && (

<div className='predict-button-container'>
  <p>Hey, {user.name}, you might be diagnosed with {prediction.prediction} in case of Alzheimer's disease</p>
  <button
    className="predict-button"

      onClick={()=>handleSavePrediction(prediction.prediction, image, prediction.confidence)}
  
  >
    Save Prediction
  </button>
</div>



)}

              </div>
            </div>

          )}

          
          {isOk && prediction && (


            <div className="prediction-results-section">
              <h5>PREDICTION RESULTS</h5>
              <br />
              <p className='prediction-text'>
                According to our AI model, the mri image detects <strong>{prediction.prediction}</strong>
              </p>

              <div className='confidence-aisuggest'><div className='confidence'>
                <CircularProgressbarWithChildren
                  className='circular-progress'
                  value={prediction.confidence * 100}
                  styles={buildStyles({
                    rotation: 1,
                    strokeLinecap: 'round',
                    textSize: '16px',
                    pathTransitionDuration: 8,
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: '#f88',
                    trailColor: 'rgba(0, 0, 0, 0.05)',
                    backgroundColor: 'black',
                  })}
                >
                  <strong>Confidence:</strong>
                  <strong>{Math.round(prediction.confidence * 100)}%</strong>
                </CircularProgressbarWithChildren>




              </div>
                <div className='aisuggest' onClick={()=>setShowChatbotModal(true)}>
                  <p>Get Suggestions from our AI</p>
                </div>
              </div>




              {/*<Button onClick={()=>handleSavePrediction(prediction.prediction, image, prediction.confidence)}>Save</Button>*/}



            </div>

          )}
        </div>



      </section>

      <section className='dementia-phases-section slide-in-bottom2'>
        <h2 className=''>Phases of Dementia in Alzheimer's Disease</h2>
        <div className='phases-head-underline'></div>

        <div className="dementia-definition">
        Dementia is a condition that affects a person's memory, thinking, and ability to perform everyday tasks. For example, Alzheimer's disease, a type of dementia, causes problems with memory, making it hard to remember things like names or recent events.
        <br />
        <br />
        As we are here focusing on Alzheimer's disease over here, let's take some look on the different phases of dementia:
        </div>
        <div className='dementia-card-holder'>
  {dementia_stages.map((type, index) => (
    <div className={`dementia-card slide-in-bottom${index+2}`} key={index}>
      <div className="dementia-index">
        0{index + 1}
      </div>
    
      <div className="dementia-name">
        {type.name}
      </div>
      <div className="dementia-name-underline"></div>
      <div className="dementia-symptoms">
        {type.symptoms} 
      </div>
      <br />
      <button className='learnMorebtn'>Learn More</button>
    </div>
  ))}
</div>

      </section>


      <section className='AI-predict slide-in-bottom8'>
     
          <div>
            <h2>How This AI Model Works?</h2>
            <div className='ai-func-head-underline'></div>
            <br />
            <p>
              The AI model utilizes Convolutional Neural Networks (CNN) in Deep Learning trained on a moderate amount of
              data. The accuracy of the model depends on various factors including the amount of data, hyperparameters
              used, and other factors. It is important to understand terms like <a href="https://www.google.com/search?q=define+accuracy+and+confidence+in+machine+learning&sca_esv=bbe8785fd3a19ac1&rlz=1C1CHZN_enIN1029IN1029&sxsrf=ACQVn0_UXSo5Z3SNwHdB4AkNEfQxqk0Vww%3A1710275393182&ei=QbvwZe3dCouMseMPy5uhsAU&ved=0ahUKEwitgp2qyO-EAxULRmwGHctNCFYQ4dUDCBA&uact=5&oq=define+accuracy+and+confidence+in+machine+learning&gs_lp=Egxnd3Mtd2l6LXNlcnAiMmRlZmluZSBhY2N1cmFjeSBhbmQgY29uZmlkZW5jZSBpbiBtYWNoaW5lIGxlYXJuaW5nMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIwhZQkwpYjBNwAXgBkAEAmAGaAaABxAeqAQMwLje4AQPIAQD4AQGYAgegAtUGwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHAzEuNqAHvSc&sclient=gws-wiz-serp"><strong>Accuracy</strong></a> and{' '}
              <a href="https://www.google.com/search?q=define+confidence+in+machne+learning&rlz=1C1CHZN_enIN1029IN1029&oq=define+confidence+in+machne+learning&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE0NTE5ajBqMagCALACAA&sourceid=chrome&ie=UTF-8"><strong>Confidence</strong></a>.
            </p>

            <div className="sequence-button-container">
        {functionalities.map((func, index) => (
          <React.Fragment key={index}>
            <button className={`sequence-button ${selectedStepIndex === index ? 'sequence-button-selected' : ''}`} onClick={() => handleSelectedStepClick(index)}>
              {index + 1}
            </button>
            {index < functionalities.length - 1 && <div className="connector"></div>}
          </React.Fragment>
        ))}
      </div>
      {selectedStepIndex !== null && (
        <div className='ai-step'>
        <div className="ai-step-image vibrate-1">
        <Lottie
  animationData={functionalities[selectedStepIndex].img}
  autoplay={true}
  loop={true}
  speed={1}
/>
        </div>
        <div className="ai-step-text ">
        <h2 className='ai-step-name '>{functionalities[selectedStepIndex].name}</h2>
        <div className="ai-step-name-underline"></div>
          <p className='ai-step-description'>{functionalities[selectedStepIndex].description}</p>
          <button className="learnMorebtn">Learn More </button>
        </div>
        
        </div>
      )}
          </div>
          
    
      </section>
<section>

</section>
      <footer className='rating-prediction'>
       <h2>Rate your experience about this tool</h2>
      </footer>

    </div>
  );
};

export default Uploadfile;


const dementia_stages = [
  {
    name: "Mild Dementia",
    symptoms: "This phase is characterized by mild cognitive decline, including forgetfulness and difficulty concentrating. "
  },
  {
    name: "Very Mild Dementia",
    symptoms: "The earliest stage of dementia, characterized by subtle changes in cognition that may not be immediately apparent."
  },
  {
    name: "Moderate Dementia",
    symptoms: "Moderate cognitive decline affects memory, reasoning, and comprehension, leading to difficulties with activities of daily living."
  },
  {
    name: "Non Dementia",
    symptoms: "In this phase, cognitive decline is noticeable but does not significantly impair daily functioning."
  },

]


const functionalities = [
  {
    img: dataCollection,
      name: "Data Collection",
      description: "This is where the AI model gathers images of brains to learn from. Imagine it as assembling a diverse library of brain pictures, including those with mild, moderate, and severe dementia, as well as those without dementia. The more varied and extensive this collection, the better the AI can learn to distinguish between different brain states."
  },
  {
    img: aiTraining,
      name: "Training",
      description: "Once the AI has its library, it goes through intensive training sessions, much like students learning from textbooks. During training, it studies each brain image, gradually understanding the features that distinguish mild, moderate, and severe dementia from normal brain scans. Through repetition and adjustment, the AI refines its understanding until it can classify images accurately."
  },
  {
    img: testing,
      name: "Testing and Evaluation",
      description: "Think of this as the AI's exams. After training, it's given new brain images it hasn't seen before to see how well it can classify them into the correct categories: mild dementia, moderate dementia, severe dementia, or normal. It's like checking if the AI can identify the right answers without peeking at the textbook (training data). This process helps measure the AI's accuracy and reliability."
  },
  {
    img: predictionImg,
      name: "Prediction",
      description: "Once the AI has passed its exams (testing phase), it's ready to use its knowledge to make predictions on new brain images. When someone uploads a brain scan to the website, the AI quickly analyzes it and predicts whether the person has mild, moderate, severe dementia, or no dementia at all. It's like having a knowledgeable expert instantly assess each brain scan based on what it has learned from its training and testing phases."
  }
];



