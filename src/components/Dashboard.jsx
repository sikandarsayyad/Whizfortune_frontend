import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Dashboard = () => {
  const { user, setUser, setIsLogin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLogin(false);
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f5f8ff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          👋 Welcome {user?.name || 'User'}!
        </h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Role: <strong>{user?.role || 'N/A'}</strong>
        </p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
