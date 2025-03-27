import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ChatHeader = ({ user, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#2D545E] text-white rounded-t-lg">
      <div className="flex items-center space-x-3">
        <img
          src={user.profilePic || '/default-profile.png'}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg font-semibold">{user.name}</span>
      </div>
      <button onClick={onClose}>
        <XMarkIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default ChatHeader;
