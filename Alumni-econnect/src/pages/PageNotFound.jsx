import React from "react";
import ErrorImage from "../assets/Error.png"; 
const PageNotFound = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-24 text-gray-700">
        <div className="max-w-md text-center md:text-left">
          <div className="text-6xl font-extrabold text-gray-800 mb-4">404</div>
          <p className="text-3xl md:text-4xl font-light leading-snug mb-4">
            Oops! We couldn’t find the page you’re looking for.
          </p>
          <p className="mb-6 text-lg text-gray-600">
            It seems that the page you're trying to reach doesn't exist or has been moved. But don’t worry, you can go back to our homepage and explore more.
          </p>
          <button
            className="px-6 py-3 text-base font-semibold leading-6 shadow-lg text-white transition-colors duration-300 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = '/'}
          >
            Back to Homepage
            <span className="text-blue-200 ml-2">→</span>
          </button>
        </div>
        <div className="max-w-lg mt-10 md:mt-0">
          <img
            src={ErrorImage}
            alt="Error"
            width="400"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
