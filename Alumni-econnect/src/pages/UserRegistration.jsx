import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Shared/Input/Input';
import { userService } from '../services/userServices';
const UserRegistration = () => {

  const { register, control, handleSubmit } = useForm();

  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [collegeId, setCollegeId] = useState('');
  const [courses, setCourses] = useState([])
  const [branches, setBranches] = useState([])

  const handleBackToStep1 = () => {
    setStep(1);
    setOtpSent(false); 
    setFormData({ ...formData, otp: '' });
    setEmailVerified(false); 
    setOtpVerifiedMessage(''); 
    setOtpErrorMessage(''); 
  };
  const onSubmit1 = async (data) => {
    try {
      console.log("Form1 Data : ", data);
      const response = await userService.sendOTP(data.gmail, data.name);
      console.log("Response : ", response);
      setOtpSent(true);

      const domain = '@'+ data.gmail.split('@')[1];
      const collegeDomain = encodeURIComponent(domain);

      const collegeIdResponse = await userService.getCollegeId(collegeDomain);
      console.log("College Id : ", collegeIdResponse);
      setCollegeId(collegeIdResponse.data.id);
    } catch (error) {
      
    }
  }

  const optVerify = async(data) => {
    try {
      const response = await userService.verifyOTP(data.gmail, data.otp);
      console.log("Otp verify response : ", response);
      setEmailVerified(true);
      const resp2 = await userService.getCollegeCourse(collegeId);
      setStep(2);
      setCourses(resp2.data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleCourseChange = async(value) => {
    try {
      const response = await userService.getCollegeBranchUnderCourse(value);
      setBranches(response.data);
      console.log("Branches fetched : ", response)
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit2 = async(data) => {
    try {
      const response = await userService.addStudent(data);
      console.log("Student Added : ", response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-2xl h-auto mt-10 md:mt-26 lg:mt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          {step === 1 && (
            <div className="step-1">
              <h1 className="text-center text-4xl font-extrabold mb-4 text-[#2d545e]">
                Welcome Aboard - Register Now!
              </h1>
              <h2 className="text-center text-2xl font-bold mb-6 text-[#d27511]">
                Step 1: Basic Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit1)}>
              
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    label="Name: "
                    placeholder="Enter your name"
              
                    {...register("name", {
                      required: true,
                    })}
                  />
                )}
              />
              <Controller
                name="gmail"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    label="Email: "
                    placeholder="Enter your email"
              
                    {...register("gmail", {
                      required: true,
                    })}
                  />
                )}
              />
                {/* <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">College Name:</label>
                  <input
                    type="text"
                    name="collegeName"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition"
                    value={formData.collegeName}
                    readOnly 
                  />
                  {collegeErrorMessage && (
                    <p className="text-red-500 text-sm mt-2">{collegeErrorMessage}</p>
                  )}
                </div> */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d27511] to-[#ff7e5f] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                >
                  Verify Email
                </button>
              </form>
              {otpSent && (
                <form onSubmit={handleSubmit(optVerify)}>
                <div className="otp-verification text-center mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-[#2d545e]">
                    Enter the OTP sent to your email:
                  </h3>
                  <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{ required: "OTP is required" }}
                render={({ field }) => (
                  <Input
                    label="OTP: "
                    placeholder="Enter your otp"
              
                    {...register("otp", {
                      required: true,
                    })}
                  />
                )}
              />
                  <button
                    type="submit"
                    className="py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                  >
                    Verify OTP
                  </button>
                  
                </div></form>
              )}
            </div>
          )}

          {step === 2 && emailVerified && (
            <div className="step-2">
              <div className="flex items-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-[#d27511] mr-2"
                  onClick={handleBackToStep1}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6 6m-6-6l6-6" />
                </svg>
                <h2 className="text-2xl font-bold text-[#d27511]">Step 2: Graduation Details</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit2)}>
              
                <Controller
                name="collegeId"
                control={control}
                defaultValue={collegeId}
                rules={{ required: "collegeId is required" }}
                render={({ field }) => (
                  <Input
                    readonly
                    label="collegeId: "
                    placeholder="Enter your collegeId"
              
                    {...register("collegeId", {
                      required: true,
                    })}
                  />
                )}
              />
                

                {/* Additional fields for College ID, Course, and Branch */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">Course:</label>
                  
                  {/* Controller for branchId */}
                  <Controller
                    name="courseId"
                    control={control}
                    defaultValue=""
                    rules={{ required: "courseId is required" }}
                    render={({ field }) => (
                      <select
                      
                        {...field}
                        id="courseId"
                        className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                        required
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update form state
                          handleCourseChange(e.target.value); // Call your custom method
                        }}
                      >
                        <option value="">
                          Select your course
                        </option>
                        {courses && courses.length > 0 ? (
                          courses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No courses available</option>
                        )}
                      </select>
                    )}
                  />
                </div>
                <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">Branch:</label>
              
              {/* Controller for branchId */}
              <Controller
                name="branchId"
                control={control}
                defaultValue=""
                rules={{ required: "Branch is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    id="branch"
                    className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                    required
                  >
                    <option value="" disabled>
                      Select your branch
                    </option>
                    {branches && branches.length > 0 ? (
                      branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No branches available</option>
                    )}
                  </select>
                )}
              />
            </div>
            <Controller
                name="admissionYear"
                control={control}
                defaultValue=""
                rules={{ required: "admissionYear is required" }}
                render={({ field }) => (
                  <Input
                    label="admissionYear: "
                    placeholder="Enter your admissionYear"
              
                    {...register("admissionYear", {
                      required: true,
                    })}
                  />
                )}
              />
            <Controller
                name="passoutYear"
                control={control}
                defaultValue=""
                rules={{ required: "passoutYear is required" }}
                render={({ field }) => (
                  <Input
                    label="passoutYear: "
                    placeholder="Enter your passoutYear"
              
                    {...register("passoutYear", {
                      required: true,
                    })}
                  />
                )}
              />
                <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "password is required" }}
                render={({ field }) => (
                  <Input
                    label="password: "
                    placeholder="Enter your password"
              
                    {...register("password", {
                      required: true,
                    })}
                  />
                )}
              />
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d27511] to-[#ff7e5f] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                  
                >
                  Create Account
                </button>
                
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
