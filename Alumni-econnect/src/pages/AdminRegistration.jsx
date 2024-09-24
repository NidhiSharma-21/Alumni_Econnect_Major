import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = ({ setIsLoggedIn }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    gmail: '',
    mobileNumber: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, gmail, mobileNumber, password, password_confirmation } = formValues;

    if (!name) newErrors.name = 'Name is required';
    if (!gmail) newErrors.gmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(gmail)) newErrors.gmail = 'Email is invalid';
    if (!mobileNumber) newErrors.mobileNumber = 'Contact number is required';
    else if (!/^\d+$/.test(mobileNumber)) newErrors.mobileNumber = 'Contact number must be numbers only';
    if (!password) newErrors.password = 'Password is required';
    if (!password_confirmation) newErrors.password_confirmation = 'Password confirmation is required';
    else if (password !== password_confirmation) newErrors.password_confirmation = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await axios.post('https://localhost:7002/api/User/AddAdmin', formValues);
        console.log(data);
        console.log("Registration successful");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="bg-white lg:mt-8">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Admin Registration"
            src="src/assets/adminsignup.svg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-[#000000] sm:text-3xl md:text-4xl">
              Admin Account Registration
            </h1>
            <p className="mt-4 leading-relaxed text-gray-600">
              Create an account as an admin to manage the alumni network.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 ">
                <label htmlFor="Name" className="block text-sm font-medium text-[#2D545E]">
                  Enter Your Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm p-1"
                  required
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-[#2D545E]">
                  Email
                </label>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={formValues.gmail}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm p-1"
                  required
                />
                {errors.gmail && <p className="mt-2 text-sm text-red-600">{errors.gmail}</p>}
              </div>

              <div className="col-span-6">
                <label htmlFor="ContactNumber" className="block text-sm font-medium text-[#2D545E]">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="ContactNumber"
                  name="mobileNumber"
                  value={formValues.mobileNumber}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm p-1"
                  required
                />
                {errors.mobileNumber && <p className="mt-2 text-sm text-red-600">{errors.mobileNumber}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-[#2D545E]">
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm p-1"
                  required
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-[#2D545E]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  value={formValues.password_confirmation}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm p-1"
                  required
                />
                {errors.password_confirmation && <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>}
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#D27511] py-2 px-4 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-[#D27511] focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default CreateAccount;