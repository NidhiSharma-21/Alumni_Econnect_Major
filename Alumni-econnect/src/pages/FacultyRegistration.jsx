import React, { useState } from "react";

const FacultyRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    branch: "",
    teachingSince: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(false);

  const branches = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.college) newErrors.college = "College is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.teachingSince) newErrors.teachingSince = "Teaching Since is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setNotification(true);
      setTimeout(() => setNotification(false), 3000); // Hide after 3 seconds

      console.log("Form submitted successfully", formData);

      // Reset form data
      setFormData({
        name: "",
        email: "",
        college: "",
        course: "",
        branch: "",
        teachingSince: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 from-[#e1f5fe] to-[#fce4ec] py-10">
      {/* Notification */}
      {notification && (
        <div className="absolute top-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-md transition-all duration-300 transform translate-y-0 opacity-100 z-50">
          Account created successfully!
        </div>
      )}

      {/* Form Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg px-10 py-10">
        {/* Headline and Introduction */}
        <h1 className="text-4xl font-bold text-center mb-4 text-[#d27511] drop-shadow-lg">
          Join Our Faculty Team!
        </h1>
        <p className="text-center text-gray-700 mb-6 text-lg">
          Fill out the form below to register as a faculty member. Help us
          create a better learning environment by contributing your expertise
          and experience.
        </p>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#2d545e]">
          Faculty Registration
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* College Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              College:
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.college && (
              <p className="text-sm text-red-500">{errors.college}</p>
            )}
          </div>

          {/* Course Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Course:
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.course && (
              <p className="text-sm text-red-500">{errors.course}</p>
            )}
          </div>

          {/* Branch Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Branch:
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            >
              <option value="">Select a branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {errors.branch && (
              <p className="text-sm text-red-500">{errors.branch}</p>
            )}
          </div>

          {/* Teaching Since Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Teaching Since:
            </label>
            <input
              type="number"
              name="teachingSince"
              value={formData.teachingSince}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.teachingSince && (
              <p className="text-sm text-red-500">{errors.teachingSince}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d545e]">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-[#2d545e] rounded focus:outline-none focus:ring-2 focus:ring-[#d27511] transition-shadow hover:shadow-lg"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#d27511] to-[#f59e0b] text-white font-semibold rounded transition-colors hover:from-[#f59e0b] hover:to-[#d27511] shadow-md transform hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyRegistration;
