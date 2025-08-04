import React from 'react';
import { useUser } from '../context/userContext';

function Dashboard() {
  const { user, isLogin } = useUser();

  if (!isLogin) return <p style={styles.loading}>Loading user data...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome back, {user.name} 👋</h1>
      <p style={styles.subtext}>We’re glad to see you again!</p>
      <p style={styles.role}>Your role: <strong>{user.role}</strong></p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #ffffff, #e0f0ff)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  welcome: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  role: {
    fontSize: '18px',
    color: '#666',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    padding: '40px',
  }
};

export default Dashboard;
