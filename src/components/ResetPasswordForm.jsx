import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const t = searchParams.get('token');
    if (t) {
      setToken(t);
    } else {
      setError('Token not found in URL!');
    }
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match!');
    }

    try {
      const res = await axios.post('https://new-backend-lake.vercel.app/api/auth/reset-password', {
        token,
        password,
      });

      setMessage(res.data.message || 'Password reset successful!');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      const msg = err.response?.data?.message || 'Reset failed!';
      setError(msg);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f2f2f2',
      fontFamily: 'Arial'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h2>
        <form onSubmit={handleReset}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          {message && <p style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
