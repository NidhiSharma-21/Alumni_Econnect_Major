import React, { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { eventService } from '../../services/eventService';

const EventStatus = {
  Created: 0,
  Approved: 1,
};

const EventForm = ({ onEventCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    bannerUrl: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    registration_Deadline: '',
    status: EventStatus.Created, // Default status to "Created"
  });
  const [errors, setErrors] = useState({}); // Object to hold errors for each field

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the specific error when user changes input
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, bannerUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Event Name is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.endDate) newErrors.endDate = "End Date is required.";
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "Start Date cannot be later than End Date.";
    }
    if (formData.registration_Deadline && new Date(formData.registration_Deadline) > new Date(formData.startDate)) {
      newErrors.registration_Deadline = "Registration Deadline cannot be after Start Date.";
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      try {
        const response=await eventService.addevents(e);
        console.log(response);
        setFormData('')
      } catch (error) {
        console.error(error);
      }
      // setErrors(validationErrors);
      // return;
    }

    // Set the status to Created before submission
    const eventData = {
      ...formData,
      status: EventStatus.Created, // Set status to Created
    };

    // onEventCreate(eventData); // Pass the event data

    // Reset form after successful submission
    setFormData({
      name: '',
      bannerUrl: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      registration_Deadline: '',
      status: EventStatus.Created, // Reset status to Created
    });
    setErrors({}); // Clear errors
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-6xl"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaCalendarPlus className="mr-2" /> Create New Event
        </h2>
        <div className="flex-grow">
          {/* Event Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter Event Name"
              required
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>

          {/* Upload Banner */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bannerUrl">
              Upload Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="bannerUrl"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {formData.bannerUrl && (
              <img
                src={formData.bannerUrl}
                alt="Banner Preview"
                className="mt-4 w-48 h-auto rounded" // Smaller width for preview
              />
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Event Description"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.startDate ? 'border-red-500' : ''}`}
              required
            />
            {errors.startDate && <p className="text-red-500 text-xs italic">{errors.startDate}</p>}
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.endDate ? 'border-red-500' : ''}`}
              required
            />
            {errors.endDate && <p className="text-red-500 text-xs italic">{errors.endDate}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Event Location"
              required
            />
          </div>

          {/* Registration Deadline */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_Deadline">
              Registration Deadline
            </label>
            <input
              type="date"
              name="registration_Deadline"
              value={formData.registration_Deadline}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.registration_Deadline && <p className="text-red-500 text-xs italic">{errors.registration_Deadline}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#d27511] hover:bg-[#c65f0f] justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 flex items-center"
        >
          Send for Approval
        </button>
      </form>
    </div>
  );
};

export default EventForm;
