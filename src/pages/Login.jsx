import React, { useState } from 'react';
import svg from '../assets/login.svg';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const roleMapping = {
  student: 0,
  faculty: 1,
  admin: 2,
  developer: 3,
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    setApiError('');
    try {
      const mappedRole = roleMapping[data.role];
      const response = await userService.loginUser(data.Email, data.Password, mappedRole);
      
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userId', response.user.id);
        navigate('/dashboard');
      } else {
        setApiError(response?.message || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.response?.data?.message || 'Something went wrong, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpRedirect = () => navigate('/userregistration');
  const handleForgotPassword = () => navigate('/forgot-password');

  return (
    <section className="bg-white min-h-screen mt-16">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Image Section - Hidden on mobile */}
        <aside className="hidden lg:block lg:order-last lg:col-span-5 xl:col-span-6 relative">
          <img
            src={svg}
            alt="Alumni Network"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        {/* Form Section */}
        <main className="flex items-center justify-center px-6 py-8 sm:px-8 lg:col-span-7 lg:px-12 xl:col-span-6">
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-[#2d545e] sm:text-4xl">
                Welcome Back!
              </h1>
              <p className="mt-3 text-gray-600">
                Reconnect with your fellow alumni and access important updates.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-6">
              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Select Your Role
                </label>
                <select
                  id="role"
                  {...register("role", { required: "Role is required" })}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm p-3"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                </select>
                {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="Email"
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm p-3"
                  placeholder="you@example.com"
                />
                {errors.Email && <p className="mt-2 text-sm text-red-600">{errors.Email.message}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="Password"
                    {...register("Password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className="w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm p-3 pr-10"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.Password && <p className="mt-2 text-sm text-red-600">{errors.Password.message}</p>}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-[#d27511] hover:text-[#c2823d]"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full rounded-md bg-[#d27511] py-3 text-white font-semibold hover:bg-[#cc8233] transition duration-300 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Signing in...' : 'Log In'}
                </button>
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="mt-4 text-sm text-red-600">
                  {apiError}
                </div>
              )}
            </form>

            {/* Social Login */}
            <div className="mt-8 flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="mx-4 text-sm text-[#2d545e] font-bold">Or log in with</p>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-md border border-gray-300 bg-white py-2 text-[#2d545e] flex items-center justify-center hover:bg-gray-100 transition duration-300"
              >
                <svg className="shrink-0 mr-2" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_4132_5805)">
                    <path d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z" fill="#4285F4"></path>
                    <path d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z" fill="#34A853"></path>
                    <path d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80842 12.84L7.79945 12.62L2.78623 8L2.65525 8.18C1.63571 10.18 1.03649 12.54 1.03649 16C1.03649 19.46 1.63571 21.82 2.65525 23.82L7.82845 19.16Z" fill="#FBBC05"></path>
                    <path d="M16.9366 6.2C19.4692 6.2 21.1708 7.2 22.2295 8.18L27.6157 3.14C24.8354 0.58 21.231 0 16.9366 0C10.6648 0 5.2718 3.6 2.65521 8.18L7.80841 12.84C9.12677 9 12.7021 6.2 16.9366 6.2Z" fill="#EA4335"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_4132_5805">
                      <rect width="32" height="32" fill="white" transform="translate(0.916626)"></rect>
                    </clipPath>
                  </defs>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Sign Up Redirect */}
            <div className="mt-8 flex justify-center text-sm text-gray-600">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="ml-2 text-[#d27511] hover:text-[#cf8434]"
                onClick={handleSignUpRedirect}
              >
                Sign Up
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;