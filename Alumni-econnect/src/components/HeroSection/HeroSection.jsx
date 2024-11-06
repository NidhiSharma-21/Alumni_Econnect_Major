import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 lg:mt-16 mt-16 mb-6">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className=" lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="src/assets/alumniLandingPage.png"
            alt="mockup"
          />
        </div>
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Alumni-Econnect: Stay Connected, Stay Informed
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Join your alumni community and explore opportunities for networking, events, and updates. Connect with fellow graduates who share your passion and experiences, and tap into a wealth of resources designed to enhance your professional journey.           </p>
          <a
            href="/userregistration"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white bg-[#d27511] rounded-lg hover:bg-[#c4640e]"
          >
            Join Now
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="/features"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:text-[#2d545e] hover:border-[#2d545e]"
          >
            Explore Now
          </a>
        </div>
      
      </div>
    </section>
  );
};

export default HeroSection;
