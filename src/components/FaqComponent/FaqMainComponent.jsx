import React from 'react';
import FaqComponent from './FaqComponent';
import AlumniFaqLeftImage from '../../assets/FaqLeft.png';

const FaqMainComponent = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d545e] mt-24 mb-14">
        CURIOSITY CORNER..
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-7xl">
        <div className="w-full h-auto md:w-1/2 flex items-center justify-center p-4">
          <img
            src={AlumniFaqLeftImage}
            alt="Alumni Econnect"
            className="object-cover w-full h-full sm:w-3/4 sm:h-auto md:w-2/3 md:h-auto lg:w-[65%] lg:h-auto"  
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <FaqComponent />
        </div>
      </div>
    </div>
  );
};

export default FaqMainComponent ;
