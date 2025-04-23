import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('authToken');
  const setToken = (token) => localStorage.setItem('authToken', token);
  const clearToken = () => localStorage.removeItem('authToken');

  const getUserByToken = async () => {
    try {
      const response = await userService.getUserByToken();
      
      console.log('User in context:', response);
      if(!response){
        localStorage.clear() // Changed from 'authToken' to 'token'
        localStorage.removeItem('user'); // If you're also storing user data
        navigate('/login');
       // window.location.reload();
      }else{
        setUser(response);
      }
      
    } catch (error) {
      console.log(error);
      console.error('Error fetching user:', error);
      setUser(null);
      clearToken();
      navigate('/login');
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    
        getUserByToken();
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const response = await userService.loginUser(email, password, role);
      console.log('Login response:', response);
      if (!response) {
        throw new Error('Invalid login response');
      }
      //setUser(response.data);
      setToken(response.token);
     await getUserByToken(); // Fetch user data after setting the token
      navigate('/dashboard', {replace: true});
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      clearToken();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
    navigate('/login');
  };

  const contextValue = useMemo(
    () => ({ user, isLoggedIn: !!user, login, logout, loading }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);