// Loader.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'md', color = 'blue' }) => {
  const sizeStyles = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-24 h-24 border-8',
  };

  const colorStyles = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    white: 'border-white',
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div
        className={`
          ${sizeStyles[size]}
          ${colorStyles[color]}
          border-t-transparent
          rounded-full
          animate-spin
        `}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['blue', 'red', 'green', 'white']),
};

export default Loader;