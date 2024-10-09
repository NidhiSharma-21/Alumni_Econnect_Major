import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    mediaUrls,
    registrationDeadline,
  } = event;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 mb-4">
      {/* Check if mediaUrls is an array and has elements */}
      {Array.isArray(mediaUrls) && mediaUrls.length > 0 && (
        <img src={mediaUrls[0]} alt="Event" className="w-full h-48 rounded-t-lg object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#2D545E] mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-[#2D545E]" />
          <span className="text-gray-800">{new Date(startDate).toLocaleString()}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-[#2D545E]" />
          <span className="text-gray-800">{location}</span>
        </div>
        <div className="flex items-center">
          <FaClock className="mr-2 text-[#2D545E]" />
          <span className="text-gray-800">
            Registration Deadline: {new Date(registrationDeadline).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
