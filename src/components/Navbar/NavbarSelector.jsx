// NavbarSelector.js
import React, { useState, useEffect } from 'react';
import NavDash from './NavDash';
import DashNavbar from '../../pages/DashBoard/DashboardNav';

const NavbarSelector = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking for auth token
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    
    // Optional: Listen for storage changes to handle logout from other tabs
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('authToken');
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return isLoggedIn ? <DashNavbar /> : <NavDash />;
};

export default NavbarSelector;