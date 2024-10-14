// src/components/Navbar/SideDrawer.jsx

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

// Sample userProfile data


const SideDrawer = ({ isOpen, onClose,user,detailuser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('authToken');

    // Optionally, clear any other stored user data

    // Close the drawer
    onClose();

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div
      className={`fixed inset-0 z-50 mt-14 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      {/* Drawer */}
      <div className="absolute top-0 left-0 w-67 bg-white h-full shadow-md p-4 transition-transform transform">
        <button onClick={onClose} className="text-gray-700 mb-4">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {/* Profile Content */}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={user.imageUrl}
            alt={`${user.name}'s profile`}
            className="h-24 w-24 rounded-full mb-4"
          />
          {/* User Information */}
          <p className="text-gray-700 font-semibold">{user.name}</p>
          <p className="text-gray-500">{detailuser.gmail}</p>
        </div>

        {/* Additional User Details */}
        <div className="mt-4">
          <p className="text-gray-700">
            <strong>College:</strong> {detailuser.college}
          </p>
          <p className="text-gray-700">
            <strong>Course:</strong> {detailuser.course}
          </p>
          <p className="text-gray-700">
            <strong>Branch:</strong> {detailuser.branch}
          </p>
          <p className="text-gray-700">
            <strong>Country:</strong> {detailuser.country}
          </p>
          <p className="text-gray-700">
            <strong>Admission Year:</strong> {detailuser.admissionYear}
          </p>
          <p className="text-gray-700">
            <strong>Passout Year:</strong> {detailuser.passoutYear}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideDrawer;
