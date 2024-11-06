import React, { useEffect, useState } from "react";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import { jobpostService } from "../services/jobpostService";

const JobPostShow = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobpostService.getjobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center">Loading job posts...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center mt-8">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-lg shadow-lg p-6 m-4 w-full sm:w-80 transition-transform duration-300 hover:shadow-2xl"
        >
          <h2 className="text-xl font-bold text-[#2d545e] mb-2">{job.tittle}</h2>
          <p className="text-gray-600 mb-4">{job.description}</p>
          <div className="flex items-center text-gray-600 mb-2">
            <FiBriefcase className="mr-2 text-[#d27511]" />
            <span>{job.jobType === 0 ? "Full-time" : job.jobType === 1 ? "Part-time" : "Internship"}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <FiMapPin className="mr-2 text-[#d27511]" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FiCalendar className="mr-2 text-[#d27511]" />
            <span>{new Date(job.deadline).toLocaleDateString()}</span>
          </div>
          <button className="bg-[#d27511] hover:bg-[#b85b0d] text-white font-semibold py-2 px-4 rounded">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobPostShow;
