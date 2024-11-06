import React from 'react';

const ProfileHeader = ({ coverPhoto, profilePicture, name, headline }) => {
  return (
    <div className="relative">
      <img
        src={coverPhoto || 'https://via.placeholder.com/800x200'}
        alt="Cover background"
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-32 left-6 flex items-center">
        <img
          src={profilePicture || 'https://via.placeholder.com/150'}
          alt={`${name || 'User'}'s profile`}
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />
        <div className="ml-4">
          <h2 className="text-3xl font-semibold text-[#2d545e]">
            {name || 'John Doe'}
          </h2>
          <p className="text-gray-600">
            {headline || 'Software Engineer'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
