// src/components/Navbar/Chat/ChatInput.js
import React from 'react';

const ChatInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
      placeholder="Type a message..."
    />
  );
};

export default ChatInput;
