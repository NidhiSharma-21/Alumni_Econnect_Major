import React from 'react';
import aboutsvg from '../assets/aboutUs.svg';
import about2 from '../assets/aboutUs2-.png';
import MeetOurTeam from '../components/AboutComponent/MeetOurTeam';
import AlumniEconnectFooter from '../components/FooterComponent/FooterComponent';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Building Bridges <span className="text-[#2d545e]">Beyond</span> Campus
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're creating a dynamic ecosystem where alumni connections foster growth, 
              opportunity, and lasting impact. Our platform bridges the gap between 
              generations of graduates, cultivating a community built on shared experience 
              and mutual success.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-[#2d545e] text-white rounded-full hover:bg-[#1a3b41] transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                Join Our Network
              </button>
              <button className="px-8 py-3 border border-[#2d545e] text-[#2d545e] rounded-full hover:bg-[#f0f4f8] transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src={aboutsvg} 
              alt="Alumni network" 
              className="w-full h-auto max-w-md mx-auto lg:max-w-none transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform skew-y-1 -z-10"></div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:order-2 lg:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-[#2d545e]">Purpose</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#2d545e] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Foster lifelong connections between alumni and their alma mater
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#2d545e] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Create opportunities for professional growth and mentorship
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#2d545e] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Support current students through alumni expertise and resources
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:order-1">
              <img 
                src={about2} 
                alt="Our mission" 
                className="w-full h-auto rounded-xl shadow-xl max-w-md mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#2d545e] mb-2">10,000+</div>
              <div className="text-gray-600">Active Alumni</div>
            </div>
            <div className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#2d545e] mb-2">500+</div>
              <div className="text-gray-600">Mentorship Connections</div>
            </div>
            <div className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-[#2d545e] mb-2">100+</div>
              <div className="text-gray-600">Annual Events</div>
            </div>
          </div>
        </div>
      </section>

      <MeetOurTeam />
      <AlumniEconnectFooter />
    </div>
  );
};

export default AboutUs;