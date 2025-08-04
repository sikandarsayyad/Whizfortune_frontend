import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.post(
        'https://new-backend-lake.vercel.app/api/auth/get-user-data',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.data);
        setIsLogin(true);
      } else {
        setUser(null);
        setIsLogin(false);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err.message);
      setUser(null);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLogin, setUser, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
