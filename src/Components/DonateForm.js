import React, { useState } from 'react';
import '../styles/DonationForm.css';

const DonationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // Logic to process the donation
    console.log('Donation submitted:', {
      name,
      email,
      phoneNumber,
      paymentMode,
      amount
    });
  };

  return (
    <div className="donation-form-container">
      <h2>Donate to Support Our AI Tool</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Payment Mode:</label>
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="">Select Payment Mode</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button className="donate-button" onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default DonationForm;
