import React from 'react';

const About = ({ bio }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-4">
      <h3 className="text-xl font-semibold mb-4 text-[#2d545e]">About</h3>
      <div className="flex items-center mb-4">
        {bio ? (
          <span className="ml-2 text-gray-800">{bio}</span>
        ) : (
          <span className="ml-2 text-gray-500 italic">No bio available.</span>
        )}
      </div>
    </div>
  );
};

export default About;
