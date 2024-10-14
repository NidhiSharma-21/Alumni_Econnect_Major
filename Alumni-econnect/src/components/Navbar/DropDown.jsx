// src/components/Navbar/Dropdown.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { PencilIcon, EyeIcon, BriefcaseIcon, CalendarIcon } from '@heroicons/react/24/outline'; // Import necessary icons

const Dropdown = ({ isOpen, items, onItemClick }) => {
  return (
    isOpen && (
      <div className="absolute z-10 mt-7 w-48 bg-white rounded-md shadow-lg">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200' : ''
                }`
              }
              role="menuitem"
              onClick={onItemClick} // Invoke the close dropdown handler
            >
              {/* Conditionally render icons based on the label */}
              {item.label === 'Create Blog' && <PencilIcon className="h-4 w-4 mr-2" />}
              {item.label === 'View Blogs' && <EyeIcon className="h-4 w-4 mr-2" />}
              {item.label === 'Create Event' && <PencilIcon className="h-4 w-4 mr-2" />}
              {item.label === 'View Events' && <EyeIcon className="h-4 w-4 mr-2" />}
              {item.label === 'Job post' && <BriefcaseIcon className="h-4 w-4 mr-2" />}
              {item.label === 'View Jobs' && <EyeIcon className="h-4 w-4 mr-2" />}
              {item.label === 'Upcoming Events' && <CalendarIcon className="h-4 w-4 mr-2" />}
              {/* Add more conditions as needed */}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
};

export default Dropdown;
