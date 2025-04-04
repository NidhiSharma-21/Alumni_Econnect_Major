import React from 'react';
import landingImage from '../../assets/alumniLandingPage.png'
const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 lg:mt-16 mt-16 mb-6">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className=" lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src={landingImage}
            alt="mockup"
          />
        </div>
        <div className="lg:col-span-7 z-10">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#f0f4f8] text-[#2d545e] mb-4">
                Alumni Network Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="text-[#2d545e]">Reconnect.</span> Grow. <span className="text-[#d27511]">Thrive.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join your lifelong academic network. Access exclusive opportunities, events, 
                and resources designed to accelerate your professional journey through meaningful connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/userregistration"
                  className="px-8 py-3 bg-gradient-to-r from-[#2d545e] to-[#d27511] text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center font-medium"
                >
                  Join Now
                  <svg
                    className="w-4 h-4 ml-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="/features"
                  className="px-8 py-3 border border-[#2d545e] text-[#2d545e] rounded-full hover:bg-[#f0f4f8] transition-colors duration-300 text-center font-medium"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
      
      </div>
    </section>
  );
};

export default HeroSection;
