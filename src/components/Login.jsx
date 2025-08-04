import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginlogo from '../assets/images/login.png'; // adjust the path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://new-backend-lake.vercel.app/api/auth/signin', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed!';
      setError(msg);
      console.error('Login error:', msg);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, white, #e0f0ff)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          width: '360px',
        }}
      >
        {/*  LOGO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={loginlogo}
            alt="Login Logo"
            style={{ height: '60px', marginBottom: '10px' }}
          />
          <p style={{ color: '#e2b600', fontWeight: 600, fontSize: '14px' }}>
            FOR SECURITY TRAINING LLC
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <div style={{ textAlign: 'right', marginTop: '-10px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => navigate('/forget-password')}
              style={linkButtonStyle}
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}>{error}</p>
          )}

          <button type="submit" style={submitButtonStyle}>
            Sign in
          </button>
        </form>

        <div style={footerStyle}>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
          <p>🌐 English</p>
        </div>
      </div>
    </div>
  );
};

// Reusable inline styles
const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  color: '#0e0d0d',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: 'white',
  color: 'black',
  fontSize: '14px',
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: 0,
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#e2b600',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
};

const footerStyle = {
  textAlign: 'center',
  fontSize: '12px',
  color: '#777',
  marginTop: '20px',
};

export default Login;
