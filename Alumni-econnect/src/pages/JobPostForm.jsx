import React from "react";
import { useForm } from "react-hook-form";
import { FiBriefcase, FiMapPin, FiCalendar, FiSend } from "react-icons/fi";
import {
  MdWorkOutline,
  MdPersonSearch,
  MdGroupAdd,
  MdOutlineTrendingUp,
} from "react-icons/md";

const jobTypes = [
  { value: 0, label: "Full-time" },
  { value: 1, label: "Part-time" },
  { value: 2, label: "Internship" },
];

const locationTypes = [
  { value: 0, label: "Remote" },
  { value: 1, label: "On-Site" },
  { value: 2, label: "Hybrid" },
];

const JobPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const today = new Date().toISOString().split("T")[0];

    if (data.deadline < today) {
      alert("Deadline cannot be in the past.");
      return;
    }

    console.log("Job Data Submitted", data);
    alert("Job posted successfully!");
    // Reset form if needed
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-16 bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl mx-auto transition-transform duration-300 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 lg:pr-8">
            <h1 className="text-3xl font-extrabold text-[#2d545e] mb-3 text-center lg:text-left">
              Post a Job and Empower Careers
            </h1>
            <p className="text-lg text-gray-700 text-center lg:text-left mb-8">
              Join us in connecting talented alumni with exciting job
              opportunities that can change lives and shape futures.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="title">
                  Job Title
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                  <MdWorkOutline className="text-[#d27511] mr-2" />
                  <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Job title is required." })}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Job Title"
                  />
                </div>
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", { required: "Description is required." })}
                  className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none resize-none h-28"
                  placeholder="Job Description"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="companyName">
                  Company Name
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                  <FiBriefcase className="text-[#d27511] mr-2" />
                  <input
                    type="text"
                    id="companyName"
                    {...register("companyName", { required: "Company name is required." })}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Company Name"
                  />
                </div>
                {errors.companyName && (
                  <span className="text-red-500 text-sm">{errors.companyName.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="jobType">
                  Job Type
                </label>
                <select
                  id="jobType"
                  {...register("jobType", { required: "Job type is required." })}
                  className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none"
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <span className="text-red-500 text-sm">{errors.jobType.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="locationType">
                  Location Type
                </label>
                <select
                  id="locationType"
                  {...register("locationType", { required: "Location type is required." })}
                  className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:outline-none"
                >
                  {locationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.locationType && (
                  <span className="text-red-500 text-sm">{errors.locationType.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="location">
                  Location
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                  <FiMapPin className="text-[#d27511] mr-2" />
                  <input
                    type="text"
                    id="location"
                    {...register("location", { required: "Location is required." })}
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Location"
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500 text-sm">{errors.location.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-[#2d545e] font-medium" htmlFor="deadline">
                  Application Deadline
                </label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                  <FiCalendar className="text-[#d27511] mr-2" />
                  <input
                    type="date"
                    id="deadline"
                    {...register("deadline", { required: "Deadline is required." })}
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                {errors.deadline && (
                  <span className="text-red-500 text-sm">{errors.deadline.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#d27511] hover:bg-[#b85b0d] text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center"
              >
                <FiSend className="mr-2" /> Post Job
              </button>
            </form>
          </div>

          {/* Right-Side Image and Content: Only visible on large screens */}
          <div className="hidden lg:flex lg:flex-col lg:w-3/5 lg:items-center lg:pl-8">
            <img
              src="https://img.freepik.com/premium-vector/diverse-group-professionals-collaborating-project-meeting-room-actively-seeking-new-employees_588410-987.jpg?w=740"
              alt="Job Posting Visual"
              className="rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold text-[#2d545e] mb-4">
              Why Post with Us?
            </h2>
            <ul className="space-y-6">
              {[
                {
                  icon: <MdPersonSearch className="text-[#d27511] text-2xl" />,
                  text: (
                    <>
                      <strong>Find Top Talent:</strong> Reach highly skilled
                      candidates who are actively seeking new opportunities.
                    </>
                  ),
                },
                {
                  icon: <MdGroupAdd className="text-[#d27511] text-2xl" />,
                  text: (
                    <>
                      <strong>Build Your Dream Team:</strong> Expand your team
                      with professionals from diverse industries.
                    </>
                  ),
                },
                {
                  icon: (
                    <MdOutlineTrendingUp className="text-[#d27511] text-2xl" />
                  ),
                  text: (
                    <>
                      <strong>Fast & Effective:</strong> Our platform ensures
                      quick and efficient hiring with maximum exposure.
                    </>
                  ),
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm transition hover:shadow-md"
                >
                  {item.icon}
                  <span className="ml-3 text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-gray-600 mt-6">
              Showcase your job to a large pool of talented professionals today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
