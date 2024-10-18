// src/components/ProfileComponent/Skills.jsx
import React from 'react';

const Skills = ({ skills }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4 text-[#2d545e]">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-600">No skills listed.</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
