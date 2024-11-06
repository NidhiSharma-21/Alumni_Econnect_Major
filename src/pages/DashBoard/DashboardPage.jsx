// src/pages/DashboardPage.jsx
import React from 'react';

import { Outlet } from 'react-router-dom';
import DashNavbar from './DashboardNav';

const DashboardPage = () => {
  return (
    <div>
      {/* Navbar */}
      <DashNavbar />

      {/* Main Content */}
      <div className="pt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
