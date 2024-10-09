import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaCheckCircle, FaRegClock } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    mediaUrls,
    registrationDeadline,
    status,
    approvedByName,
    createdByName,
    createdOn,
  } = event;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 mb-4 border-2 border-[#d27511]">
      {/* Display event image if available */}
      {Array.isArray(mediaUrls) && mediaUrls.length > 0 && (
        <img
          src={mediaUrls[0]}
          alt="Event"
          className="w-full h-48 rounded-t-lg object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#2D545E] mb-2">{name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">{new Date(startDate).toLocaleString()} - {new Date(endDate).toLocaleString()}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">{location}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaClock className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">
            Registration Deadline: {new Date(registrationDeadline).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">Created By: {createdByName}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">Approved By: {approvedByName}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaRegClock className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">Created On: {new Date(createdOn).toLocaleString()}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaCheckCircle className="mr-2 text-[#d27511]" />
          <span className="text-gray-800">Status: {status === 1 ? 'Approved' : 'Pending'}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
