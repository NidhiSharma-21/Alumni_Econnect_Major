import React from 'react';

const UserDetails = ({ location, industry, connections, college, bio }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-24">
      <h3 className="text-xl font-semibold text-[#2d545e] mb-4">User Details</h3>

      <div className="flex items-center mb-4">
        <span className="font-medium text-gray-800">College:</span>
        <span className="ml-2 text-gray-800">{college || 'Not specified'}</span>
      </div>

      <div className="flex items-center mb-4">
        <span className="font-medium text-gray-800">Location:</span>
        <span className="ml-2 text-gray-600">{location || 'San Francisco, CA'}</span>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="font-medium text-gray-800">Connections:</span>
        <span className="ml-2 text-gray-600">{connections || 0}</span>
      </div>

      {industry && (
        <div className="flex items-center mb-4">
          <span className="font-medium text-gray-800">Industry:</span>
          <span className="ml-2 text-gray-600">{industry || 'Not specified'}</span>
        </div>
      )}

      {bio && (
        <div className="flex items-center">
          <span className="font-medium text-gray-800">Bio:</span>
          <span className="ml-2 text-gray-600">{bio || 'No bio available.'}</span>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
