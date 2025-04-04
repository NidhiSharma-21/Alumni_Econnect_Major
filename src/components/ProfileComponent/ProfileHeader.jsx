import React from 'react';

const ProfileHeader = ({
  coverPhoto,
  profilePicture,
  name,
  headline,
  isOwnProfile,
  handleStartChat
}) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
      
      {/* Cover Photo with gradient overlay */}
      <div className="w-full h-52 relative">
        <img
          src={coverPhoto || 'https://via.placeholder.com/800x200'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="absolute top-32 left-6 sm:left-10 flex items-center space-x-4 sm:space-x-6">
        <div className="relative">
          <img
            src={profilePicture || 'https://via.placeholder.com/150'}
            alt={`${name || 'User'}'s profile`}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl ring-4 ring-[#2d545e]/20 object-cover"
          />
        </div>
        <div className=" bg-transparent p-3 rounded-lg ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2d545e]">
            {name || 'John Doe'}
          </h2>
          <p className="text-gray-900 text-xl font-semibold sm:text-base">
            {headline || 'Software Engineer'}
          </p>
        </div>
      </div>

      {/* Chat Button */}
      {!isOwnProfile && (
        <div className="absolute top-4 right-4">
          <button
            onClick={handleStartChat}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-md shadow-md"
          >
            Chat with {name?.split(" ")[0] || 'User'}
          </button>
        </div>
      )}

      {/* Spacer */}
      <div className="pt-28 sm:pt-32" />
    </div>
  );
};

export default ProfileHeader;
