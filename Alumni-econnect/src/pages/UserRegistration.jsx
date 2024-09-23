import React, { useState } from 'react';

const UserRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    collegeEmail: '',
    otp: '',
    graduationYear: '',
    startDate: '',
    endDate: '',
    password: '',
    confirmPassword: '',
  });

  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpVerifiedMessage, setOtpVerifiedMessage] = useState('');
  const [accountCreatedMessage, setAccountCreatedMessage] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [createAccountErrorMessage, setCreateAccountErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'password' && e.target.value.length >= 8) {
      setPasswordError('');
    }
  };

  const handleEmailVerification = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);
    console.log(`OTP sent to ${formData.collegeEmail}: ${otp}`); // Replace with actual email sending logic
  };

  const handleOtpVerification = () => {
    if (formData.otp === generatedOtp) {
      setEmailVerified(true);
      setStep(2);
      setOtpVerifiedMessage('OTP has been verified successfully.');
      setOtpErrorMessage('');  // Clear any previous error
    } else {
      setOtpErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setCreateAccountErrorMessage('Passwords do not match.');
      return;
    }

    // Handle form submission logic
    console.log('Form Data:', formData);
    setAccountCreatedMessage('Your account has been created successfully!');
    setCreateAccountErrorMessage('');  // Clear any previous error
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-2xl h-auto mt-10 md:mt-26 lg:mt-20"> {/* Increased width */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          {step === 1 && (
            <div className="step-1">
              <h1 className="text-center text-4xl font-extrabold mb-4 text-[#2d545e]">
                Welcome Aboard - Register Now!
              </h1>
              <h2 className="text-center text-2xl font-bold mb-6 text-[#d27511]">
                Step 1: Basic Information
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    College Name:
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.collegeName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    College Email ID:
                  </label>
                  <input
                    type="email"
                    name="collegeEmail"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.collegeEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-3 bg-gradient-to-r from-[#d27511] to-[#ff7e5f] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                  onClick={handleEmailVerification}
                >
                  Verify Email
                </button>
              </form>
              {otpSent && (
                <div className="otp-verification text-center mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-[#2d545e]">
                    Enter the OTP sent to your email:
                  </h3>
                  <input
                    type="text"
                    name="otp"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:border-[#d27511] transition"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                    onClick={handleOtpVerification}
                  >
                    Verify OTP
                  </button>
                  {otpVerifiedMessage && (
                    <p className="text-green-600 text-sm mt-4">{otpVerifiedMessage}</p>
                  )}
                  {otpErrorMessage && (
                    <p className="text-red-600 text-sm mt-4">{otpErrorMessage}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && emailVerified && (
            <div className="step-2">
              <h2 className="text-center text-2xl font-bold mb-6 text-[#d27511]">
                Step 2: Graduation Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Graduation Year:
                  </label>
                  <input
                    type="text"
                    name="graduationYear"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    End Date:
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {createAccountErrorMessage && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {createAccountErrorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d27511] to-[#ff7e5f] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                >
                  Create Account
                </button>
                {accountCreatedMessage && (
                  <p className="text-green-700 text-m mt-4 text-center"> {/* Changed color to darker green */}
                    {accountCreatedMessage}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
