// src/components/Navbar/Dropdown.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

const Dropdown = ({ isOpen, items }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
      {items.map((item, index) => (
        <NavLink
          to={item.link}
          key={index}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              isActive ? 'bg-gray-200' : ''
            }`
          }
        >
          {/* Conditionally render icons based on the label */}
          {item.label === 'Create Blog' && <PencilIcon className="h-4 w-4 mr-2" />}
          {item.label === 'View Blogs' && <EyeIcon className="h-4 w-4 mr-2" />}
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Dropdown;
