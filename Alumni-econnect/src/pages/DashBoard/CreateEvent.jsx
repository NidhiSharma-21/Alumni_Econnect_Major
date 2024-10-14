import React, { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { eventService } from '../../services/eventService';

const EventStatus = {
  Created: 0,
  Approved: 1,
};

const EventForm = ({ onEventCreate }) => {
  const [formData, setFormData] = useState({
    Name: '',
    bannerUrl: '',
    Description: '',
    StartTime: '',
    EndTime: '',
    Location: '',
    Registration_Deadline: '',
    Status: EventStatus.Created,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, bannerUrl: file }); // Store the File object directly
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = "Event Name is required.";
    if (!formData.StartTime) newErrors.StartTime = "Start Time is required.";
    if (!formData.EndTime) newErrors.EndTime = "End Time is required.";
    if (!formData.Description) newErrors.Description = "Description is required.";
    if (new Date(formData.StartTime) > new Date(formData.EndTime)) {
      newErrors.EndTime = "Start Time cannot be later than End Time.";
    }
    if (formData.Registration_Deadline && new Date(formData.Registration_Deadline) > new Date(formData.StartTime)) {
      newErrors.Registration_Deadline = "Registration Deadline cannot be after Start Time.";
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    console.log("form data:", formData);

    try {
      const response = await eventService.addevents(formData);
      console.log(response);
      alert("Event created successfully!");
      // Reset form
      // setFormData({
      //   Name: '',
      //   bannerUrl: '',
      //   Description: '',
      //   StartDate: '',
      //   EndDate: '',
      //   Location: '',
      //   Registration_Deadline: '',
      //   Status: EventStatus.Created,
      // });
      // Callback to parent component if needed
      if (onEventCreate) onEventCreate(response);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const formattedErrors = Object.entries(serverErrors).reduce((acc, [field, messages]) => {
          acc[field] = messages.join(' ');
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        alert("Failed to create event. Please try again.");
      }
    }

    setErrors({});
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
              Event Name
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Name ? 'border-red-500' : ''}`}
              placeholder="Enter Event Name"
              required
            />
            {errors.Name && <p className="text-red-500 text-xs italic">{errors.Name}</p>}
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
            />
            {formData.bannerUrl && (
              <img
                src={URL.createObjectURL(formData.bannerUrl)}
                alt="Banner Preview"
                className="mt-4 w-48 h-auto rounded"
                onLoad={() => URL.revokeObjectURL(formData.bannerUrl)} // Clean up memory
              />
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
              Description
            </label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Description ? 'border-red-500' : ''}`}
              placeholder="Event Description"
              required
            />
            {errors.Description && <p className="text-red-500 text-xs italic">{errors.Description}</p>}
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="StartTime">
              Start Time
            </label>
            <input
              type="datetime-local" // Changed from "date" to "datetime-local"
              name="StartTime" // Renamed from "StartDate"
              value={formData.StartTime}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.StartTime ? 'border-red-500' : ''}`}
              required
            />
            {errors.StartTime && <p className="text-red-500 text-xs italic">{errors.StartTime}</p>}
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="EndTime">
              End Time
            </label>
            <input
              type="datetime-local" // Changed from "date" to "datetime-local"
              name="EndTime" // Renamed from "EndDate"
              value={formData.EndTime}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.EndTime ? 'border-red-500' : ''}`}
              required
            />
            {errors.EndTime && <p className="text-red-500 text-xs italic">{errors.EndTime}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Location">
              Location
            </label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Location ? 'border-red-500' : ''}`}
              placeholder="Event Location"
              required
            />
            {errors.Location && <p className="text-red-500 text-xs italic">{errors.Location}</p>}
          </div>

          {/* Registration Deadline */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Registration_Deadline">
              Registration Deadline
            </label>
            <input
              type="date"
              name="Registration_Deadline"
              value={formData.Registration_Deadline}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.Registration_Deadline ? 'border-red-500' : ''}`}
            />
            {errors.Registration_Deadline && <p className="text-red-500 text-xs italic">{errors.Registration_Deadline}</p>}
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
