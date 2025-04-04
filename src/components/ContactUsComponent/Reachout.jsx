import React, { useState } from 'react';
import Contactus from '../../assets/contactus.svg';
import { FiSend, FiUser, FiBriefcase, FiMail, FiPhone } from 'react-icons/fi';

const ReachOut = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    orgType: '',
    contact: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    email: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'contact') {
      if (/^\d*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'email') {
      setErrors({
        ...errors,
        email: value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2d545e] dark:text-[#4fd1c5] mb-2">
                Schedule a Call
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Let's discuss how we can help your organization
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-[#2d545e] focus:outline-none bg-transparent"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Organization */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-[#2d545e] focus:outline-none bg-transparent"
                  placeholder="Organization Name"
                  required
                />
              </div>

              {/* Organization Type */}
              <div className="relative">
                <select
                  name="orgType"
                  value={formData.orgType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-[#2d545e] focus:outline-none bg-transparent appearance-none"
                  required
                >
                  <option value="">Organization Type</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="Educational">Educational</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Contact */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:border-[#2d545e] focus:outline-none bg-transparent"
                  placeholder="Contact Number"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#2d545e] focus:outline-none bg-transparent`}
                  placeholder="Email Address"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#2d545e] to-[#3f7b88] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                <FiSend className="h-5 w-5" />
                <span>Submit Request</span>
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2d545e] to-[#3f7b88] items-center justify-center p-12">
            <div className="text-center">
              <img 
                src={Contactus} 
                alt="Contact Us" 
                className="w-full max-w-md mx-auto" 
              />
              <h3 className="text-2xl font-semibold text-white mt-8">We'd love to hear from you</h3>
              <p className="text-gray-200 mt-2">
                Our team is ready to help with any questions about our platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;