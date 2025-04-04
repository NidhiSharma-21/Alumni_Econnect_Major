// FaqMainComponent.js
import React from 'react';
import FaqComponent from './FaqComponent';
import AlumniFaqLeftImage from '../../assets/FaqLeft.png';

const FaqMainComponent = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d545e] dark:text-[#4fd1c5] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our alumni platform
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img
              src={AlumniFaqLeftImage}
              alt="Alumni Connection"
              className="w-full max-w-md mx-auto  object-cover"
            />
          </div>
          
          <div className="lg:w-1/2 w-full">
            <FaqComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqMainComponent;