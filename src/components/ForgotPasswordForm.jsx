import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('https://new-backend-lake.vercel.app/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Reset link sent to your email.');
      console.log(res.data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong!';
      setError(msg);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Send Reset Link
        </button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
