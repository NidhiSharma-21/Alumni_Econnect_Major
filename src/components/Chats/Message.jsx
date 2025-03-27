// src/components/Navbar/Chat/Message.js
import React from 'react';

const Message = ({ sender, text }) => {
  return (
    <div
      className={`max-w-xs p-3 rounded-lg ${
        sender === 'You' ? 'bg-white text-black self-end' : 'bg-gray-200 text-gray-900 self-start'
      }`}
    >
      <p className="text-sm">{text}</p>
      <p className="text-xs text-gray-500 text-right mt-2">{sender}</p>
    </div>
  );
};

export default Message;
