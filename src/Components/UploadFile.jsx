
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Spinner, Alert, Form , InputGroup, ProgressBar, Tabs, Tab, Fade} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadFile = () => {

  const [image, setImage] = useState();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [open, setOpen] = useState(false)
  const [postViewImage, SetPostViewImage] = useState()
  const [shownResult, setShownResult] = useState(false)

  function handleImageUpload(event) {
    console.log(event.target.files);
    setImage(event.target.files[0]);
    console.log(image)
    
  }

  function handleImageFetch() {
    setPrediction(null);
    const formData = new FormData();
    formData.append('image', image);
    setIsUploaded(false);
    axios.post('https://alzheimer-s-disease-server.onrender.com/upload', formData).then((res) => {
      console.log(res.data);
      setIsUploaded(true);
      SetPostViewImage(URL.createObjectURL(image))
      setIsOk(true)


      toast.success('Image uploaded successfully!', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }

  function handlePredict() {


    setLoading(true);
    try{
      setIsOk(true)
      axios.get('https://alzheimer-s-disease-server.onrender.com/predict').then((res) => {
        console.log(res.data);
        setPrediction(res.data);
        setLoading(false);
        setOpen(true)
      });
    }
   catch(error){
    console.log(error)
    setIsOk(false)
    if (error.isAxiosError && !error.response) {
      // Handle the network error, show an error message to the user
      toast.error('Network error. Please check your internet connection and try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Handle other types of errors as needed
      toast.error('Failed to fetch prediction. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
   }}
    
  }


  function handlePredictButton(){
    if (prediction!=null) setShownResult(true)
  }


  return (
    <Form className='file-uploader' >

    {!isUploaded &&
      <div className='input-container'>
        <input type="file" name="file" id="" onChange={handleImageUpload} />
        <Button
          variant="primary"
          onClick={handleImageFetch}
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <img width="48" height="48" src="https://img.icons8.com/fluency-systems-filled/96/send-letter.png" alt="send-letter" />
        </Button>
      </div>
    }
      
  
      <ToastContainer />
  
      {isUploaded && (
        <Card style={{ width: '35vw', height:'35vh', textAlign: 'center' , margin:"30px"}}>
          <Card.Img variant="top" height="240" width="240" src={postViewImage} />
          <Card.Body>
            <Card.Title>PREDICTION RESULTS</Card.Title>
            <Card.Text>
              {isOk && prediction && (
      
                <Fade in={open} timeout={1000}>
                <div id='example-fade-tex'>
                <Tabs
                    defaultActiveKey="prediction"
                    transition={false}
                    justify={true}

                    className="mb-3 mx-5 center"
                 
                  >
                    <Tab eventKey="prediction" title="Prediction" >
                      {prediction.prediction}
                    </Tab>
                    <Tab eventKey="confidence" title="Confidence">
                      <ProgressBar style={{ height: '24px' }} now={Math.round((prediction.confidence + Number.EPSILON) * 100)} label={`${Math.round((prediction.confidence + Number.EPSILON) * 100)}%`} />
                    </Tab>
                  </Tabs>
                </div>
                
                </Fade>
                 
               
              )}
              {isOk === false && (
                <Alert variant="danger">
                  <Alert.Heading>Oops! Something went wrong :(</Alert.Heading>
                  <p>{"Could you please reupload.."}</p>
                </Alert>
              )}
  
              {loading && (
                <>
                  <Spinner animation="border" role="status">
                    <span className=""></span>
                  </Spinner>
                  <p>Predicting...</p>
                </>
              )}
            </Card.Text>
            {(!shownResult ||image) && (

              <Button
                variant="success"
                onClick={() => {
                  try {
                    handlePredict();
                    setIsOk(true);
                    setShownResult(true); // Set shownResult to true when the prediction is displayed
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
  );
  
};

export default UploadFile;
