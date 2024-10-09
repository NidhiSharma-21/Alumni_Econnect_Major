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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      {mediaUrls.length > 0 && (
        <img src={mediaUrls[0]} alt="Event" className="w-full h-48 rounded-t-lg object-cover" />
      )}
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="flex items-center mt-4">
        <FaCalendarAlt className="mr-2 text-gray-600" />
        <span>{new Date(startDate).toLocaleString()}</span>
      </div>
      <div className="flex items-center mt-2">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        <span>{location}</span>
      </div>
      <div className="flex items-center mt-2">
        <FaClock className="mr-2 text-gray-600" />
        <span>Registration Deadline: {new Date(registrationDeadline).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default EventCard;
