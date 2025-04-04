import React from 'react';
import { MapPin, GraduationCap, Users, Briefcase, Info } from 'lucide-react';

const UserDetails = ({ location, industry, connections, college, bio }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-5">
      

      {/* College */}
      <div className="flex items-start mb-4">
        <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
        <div className="ml-3">
          <p className="font-medium text-gray-800">College</p>
          <p className="text-gray-600 text-sm">{college || 'Not specified'}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start mb-4">
        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
        <div className="ml-3">
          <p className="font-medium text-gray-800">Location</p>
          <p className="text-gray-600 text-sm">{location || 'San Francisco, CA'}</p>
        </div>
      </div>

      {/* Connections */}
      <div className="flex items-start mb-4">
        <Users className="w-5 h-5 text-blue-600 mt-1" />
        <div className="ml-3">
          <p className="font-medium text-gray-800">Connections</p>
          <p className="text-gray-600 text-sm">{connections || 0} connections</p>
        </div>
      </div>

      {/* Industry */}
      {industry && (
        <div className="flex items-start mb-4">
          <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
          <div className="ml-3">
            <p className="font-medium text-gray-800">Industry</p>
            <p className="text-gray-600 text-sm">{industry}</p>
          </div>
        </div>
      )}

      {/* Bio */}
      {bio && (
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-1" />
          <div className="ml-3">
            <p className="font-medium text-gray-800">Bio</p>
            <p className="text-gray-600 text-sm">{bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
