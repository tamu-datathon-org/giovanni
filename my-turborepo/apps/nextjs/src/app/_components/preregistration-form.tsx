"use client"

import React, { useState, useCallback } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, error }) => (
  <div>
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder="Enter your email"
      style={{
        padding: '10px',
        fontSize: '16px', // Larger font size for mobile
        width: '100%',
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    />
    {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
  </div>
);

export const SimplePreregistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
    } else {
      // Here you would typically send the email to your server
      console.log('Submitting email:', email);
      // Clear form after submission
      setEmail('');
      setError('');
    }
  }, [email]);

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>TAMU Datathon Preregistration</h2>
      <EmailInput
        value={email}
        onChange={handleEmailChange}
        error={error}
      />
      <button
        type="submit"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default SimplePreregistrationForm;