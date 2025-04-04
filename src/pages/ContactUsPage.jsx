import React from 'react';
import ReachOut from '../components/ContactUsComponent/Reachout'; // Adjust the import path as needed
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
   
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
     
          {/* ReachOut Form */}
          <div className="lg:col-span-2">
            <ReachOut />
          </div>
       
      </div>
  </div>
  );
};

export default ContactUs;