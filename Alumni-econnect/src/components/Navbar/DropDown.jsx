// // src/components/Navbar/Dropdown.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

// const Dropdown = ({ isOpen, items }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
//       {items.map((item, index) => (
//         <NavLink
//           to={item.link}
//           key={index}
//           className={({ isActive }) =>
//             `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
//               isActive ? 'bg-gray-200' : ''
//             }`
//           }
//         >
//           {/* Conditionally render icons based on the label */}
//           {item.label === 'Create Blog' && <PencilIcon className="h-4 w-4 mr-2" />}
//           {item.label === 'View Blogs' && <EyeIcon className="h-4 w-4 mr-2" />}
//           {item.label}
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default Dropdown;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ isOpen, items }) => {
  return (
    isOpen && (
      <div className="absolute z-10 mt-7 w-48 bg-white rounded-md shadow-lg">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                // Optionally close the dropdown when an item is clicked
                setIsEventDropdownOpen(false); // This would be passed as a prop
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
};

export default Dropdown;

