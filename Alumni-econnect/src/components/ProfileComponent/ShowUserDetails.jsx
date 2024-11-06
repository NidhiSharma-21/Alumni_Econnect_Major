// src/components/ProfileComponent/ShowUserDetails.jsx
import React from 'react';

const UserDetails = ({ location, industry, connections,college,bio }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-24">
      <div className="flex items-center mb-4">
        
        <span className="ml-2 mt-4 text-2xl text-gray-800">{college || ''}</span>
      </div>
     
     
      <div className="flex items-center mb-4">
        
        <span className="ml-2 text-gray-600">{location || 'San Francisco, CA'}</span>
      </div>
      
      <div className="flex items-center">
        
        <span className="ml-2 text-gray-600">{connections || 0}</span>
      </div>
    </div>
  );
};

export default UserDetails;
