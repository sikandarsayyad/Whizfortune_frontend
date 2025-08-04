import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context
const UserContext = createContext();

// Custom hook to access context
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto-fetch user from token on first load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLogin(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          'https://new-backend-lake.vercel.app/api/auth/get-user-data',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.data);
          setIsLogin(true);
        } else {
          localStorage.removeItem('token');
          setIsLogin(false);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        localStorage.removeItem('token');
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin, loading }}>
      {children}
    </UserContext.Provider>
  );
};
