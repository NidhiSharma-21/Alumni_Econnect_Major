import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Shared/Input/Input';
import { userService } from '../services/userServices';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm();
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [collegeId, setCollegeId] = useState('');
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [course, setCourse] = useState();

  const handleBackToStep1 = () => {
    setStep(1);
    setOtpSent(false);
    setEmailVerified(false);
  };

  const onSubmit1 = async (data) => {
    try {
      console.log("Form1 Data : ", data);
  
      // Step 1: Check if user is already registered
      const isRegistered = await userService.checkUserExists(data.gmail);
      if (isRegistered) {
        toast.error("This email is already registered. Redirecting to login...", {
          position: "top-center",
          autoClose: 3500,
          onClose: () => navigate('/login')
        });
        return;
      }
  
      // Step 2: If not registered, proceed with OTP sending
      const response = await userService.sendOTP(data.gmail, data.name);
      console.log("OTP Sent Response:", response);
      setOtpSent(true);
      toast.success("OTP sent to your email!", {
        position: "top-center",
        autoClose: 3000,
      });
  
      // Step 3: Fetch College ID if email domain matches
      const domain = '@' + data.gmail.split('@')[1];
      const collegeDomain = encodeURIComponent(domain);
      const collegeIdResponse = await userService.getCollegeId(collegeDomain);
      
      if (collegeIdResponse && collegeIdResponse.data) {
        setCollegeId(collegeIdResponse.data.id);
      } else {
        toast.error("This email domain is not associated with any registered college.", {
          position: "top-center",
          autoClose: 5000,
        });
        return;
      }
  
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const optVerify = async (data) => {
    try {
      const response = await userService.verifyOTP(data.gmail, data.otp);
      console.log("Otp verify response : ", response);
      setEmailVerified(true);
      const resp2 = await userService.getCollegeCourse(collegeId);
      setStep(2);
      setCourses(resp2);
      toast.success("Email verified successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleCourseChange = async (value) => {
    try {
      const newCourse = courses.find(course => course.id == value);
      setCourse(newCourse);
      const response = await userService.getCollegeBranchUnderCourse(value);
      setBranches(response);
      console.log("Branches fetched : ", response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load branches. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const onSubmit2 = async (data) => {
    try {
      console.log("Form2 Data : ", data);
      
      if (!course || !course.courseId) {
        toast.error("Please select a valid course before submitting.", {
          position: "top-center",
          autoClose: 5000,
        });
        return;
      }
      
      data.courseId = course.courseId;
  
      const response = await userService.addStudent(data);
      console.log("Student Added : ", response);
  
      if (response && response.success) { 
        toast.success("Account Created Successfully! Redirecting to Login...", {
          position: "top-center",
          autoClose: 3000,
          onClose: () => navigate('/login')
        });
        
        setStep(1);
        setEmailVerified(false);
        setOtpSent(false);
        setCollegeId('');
        setCourses([]);
        setBranches([]);
        setCourse(null);
      } else {
        toast.error(response.message || "Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
                  </div>
                </form>
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
                <div style={{ display: 'none' }}>
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
                </div>

                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">Course:</label>
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
                          field.onChange(e.target.value);
                          handleCourseChange(e.target.value);
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
                      type="password"
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