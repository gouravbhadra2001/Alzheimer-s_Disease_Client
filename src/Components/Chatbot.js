import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = ({ initialInput, getQna }) => {
  const [originalInputText, setOriginalInputText] = useState(initialInput || ''); // Store original input text
  const [responseText, setResponseText] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showResponseCard, setShowResponseCard] = useState(false);

  useEffect(() => {
    setOriginalInputText(initialInput || ''); // Reset original input text when initialInput prop changes
  }, [initialInput]);

  useEffect(() => {
    getQna({ question: originalInputText, answer: responseText });
  }, [originalInputText, responseText]);

  const handleInputChange = (event) => {
    setOriginalInputText(event.target.value); // Update original input text
  };

  const handleSubmit = async () => {
    setShowResponseCard(true);
    console.log("Original input text:", originalInputText); // Log original input text

    // Clear previous response text
    setResponseText('');
    setShowLoader(true);

    // Concatenate original input text with extra string for sending request to the chatbot API
    const inputForApi =
      originalInputText +
      "\n\nGive response in details with proper markdowns in organized style and also give links for the reference of the information you give";

    const response = await fetch('https://chattest-4sqy.onrender.com/chatbot/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputForApi }), // Send concatenated input text to the chatbot API
    });

    const responseData = await response.json();

    let formattedResponse = '';

    if (Array.isArray(responseData.response)) {
      formattedResponse = responseData.response.map((item) => item.text).join(' ');
    } else if (typeof responseData.response === 'string') {
      formattedResponse = responseData.response;
    }

    setResponseText(formattedResponse);
    setShowLoader(false); // Hide loader once response is received
  };

  return (
    <div className="Chatbot">
      <InputGroup className="mb-3">
        <FormControl
          as="textarea"
          rows={3}
          placeholder="What do you want to know?"
          value={originalInputText} // Use original input text for the input field
          onChange={handleInputChange}
        />
        <Button variant="outline-secondary" onClick={handleSubmit}>Ask</Button>
      </InputGroup>
      {showResponseCard && (
        <Card style={{ padding: "20px" }}>
          <Card.Title>Result for "{originalInputText}":</Card.Title>
          {!responseText && showLoader && (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="black"
              radius="100"
              ariaLabel="three-dots-loading"
            />
          )}
          {responseText && (
            <Markdown remarkPlugins={[remarkGfm]}>{responseText}</Markdown>
          )}
        </Card>
      )}
    </div>
  );
};

export default Chatbot;
