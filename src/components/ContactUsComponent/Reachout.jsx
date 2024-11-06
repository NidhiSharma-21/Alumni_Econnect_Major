import React, { useState } from 'react';

const ReachOut = () => {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setContactNumber(value);  
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2d545e]">Schedule a Call with Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#2d545e]">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d545e]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Organization Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#2d545e]">Organization Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d545e]"
              placeholder="Enter organization name"
              required
            />
          </div>

          {/* Organization Type */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#2d545e]">Organization Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d545e]"
              required
            >
              <option value="">Choose an option</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#2d545e]">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={handleContactChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d545e]"
              placeholder="Enter your contact number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#2d545e]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d545e]"
              placeholder="Enter your email"
              required
            />
            {email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full font-semibold bg-[#d27511] text-white py-2 rounded-md hover:bg-[#d3893a] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>

       {/* Left Side: Image */}
       <div className="hidden lg:col-span-5 lg:flex lg:mt-0 w-full md:w-1/2 p-4">
        <img src="src/assets/contactus.svg" alt="Contact Us" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default ReachOut;
