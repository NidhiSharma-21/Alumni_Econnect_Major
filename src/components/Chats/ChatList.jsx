import React from 'react';

const ChatList = ({ users, onUserSelect }) => {
  return (
    <div className="overflow-y-auto h-full p-4 space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center space-x-3 p-2 hover:bg-[#2D545E] rounded-lg cursor-pointer"
          onClick={() => onUserSelect(user)}
        >
          <img
            src={user.profilePic || '/default-profile.png'}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-[#2D545E] font-medium">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
