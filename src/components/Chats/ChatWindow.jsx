import React, { useState, useEffect } from 'react';
import Message from './Message'; // Make sure Message is correctly imported
import ChatInput from './ChatInput'; // Make sure ChatInput is correctly imported

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = { sender: 'Student', text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');

      // Simulate receiving a reply after a delay
      setTimeout(() => {
        const reply = getReply(input);
        setMessages((prevMessages) => [...prevMessages, { sender: 'Alumni', text: reply }]);
      }, 1000);
    }
  };

  // Generate reply based on the student's message
  const getReply = (studentMessage) => {
    if (studentMessage.toLowerCase().includes('challenge')) {
      return 'The biggest challenge was adapting to the fast-paced work environment and getting used to real-world projects with strict deadlines.';
    }
    if (studentMessage.toLowerCase().includes('machine learning')) {
      return 'Machine learning is one of the most in-demand fields right now. If you\'re interested in it, I’d recommend starting with Python and learning libraries like TensorFlow or PyTorch.';
    }
    if (studentMessage.toLowerCase().includes('internships')) {
      return 'Internships are critical. I worked on a project during my internship where I implemented a recommendation system, and that was a huge talking point during my interviews.';
    }
    if (studentMessage.toLowerCase().includes('interviews')) {
      return 'One tip is to be specific about the projects you’ve worked on, including the technologies you used and the impact of your work. Employers love hearing about concrete results!';
    }
    return 'Sounds like you have a good plan! Keep learning, and feel free to reach out if you need any more advice!';
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 h-96 bg-gradient-to-tl from-grey-500 to-white rounded-lg shadow-lg flex flex-col transform transition-all duration-300 ease-in-out scale-100">
      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-t-lg">
        <h3 className="text-xl font-semibold">Chat</h3>
        <button
          onClick={onClose}
          className="text-white text-2xl hover:text-teal-300 transition"
        >
          &times;
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender} text={message.text} />
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 bg-white rounded-b-lg shadow-inner">
        <ChatInput value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          onClick={handleSendMessage}
          className="ml-4 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
