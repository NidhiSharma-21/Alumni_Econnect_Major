import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../components/Shared/Input/Input';
import { userService } from '../services/userServices';
import { instance } from '../services/axiosInstance';

const FacultyRegistration = () => {
  const { register, control, handleSubmit } = useForm();
  const [branches, setBranches] = useState([]);
  //const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  // api for college
  // useeffect
  const colleges = [
    {
      id: "5c390669-6085-456f-9b37-08dcd938babd",
      name: "Gyan Ganga College of Technology"
    }
  ]
  // Submit form: Register Faculty
  const onSubmit = async (formData) => {
    try {
      const {data} = await instance.post("User/AddFaculty", formData);
      console.log("Faculty Registered: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCollegeChange = async(data) => {
    try{
      console.log("College Id : ", data);
      const response = await userService.getCollegeCourse(data);
      console.log("Courses : ", response);
      setCourses(response);
    }catch(errror) {
      console.error(error);
    }
  }
  const handleCourseChange = async(data) => {
    try{
      console.log("Course Id : ", data);
      const response = await userService.getCollegeBranchUnderCourse(data);
      console.log("Branches : ", response);
      setBranches(response);
    }catch(errror) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-2xl h-auto mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-center text-4xl font-extrabold mb-4 text-[#2d545e]">
            Faculty Registration
          </h1>
          <h2 className="text-center text-2xl font-bold mb-6 text-[#d27511]">
            Please Fill Your Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  label="Name: "
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                />
              )}
            />

            {/* Gmail Field */}
            <Controller
              name="gmail"
              control={control}
              defaultValue=""
              rules={{ required: "Gmail is required" }}
              render={({ field }) => (
                <Input
                  label="Gmail: "
                  placeholder="Enter your Gmail"
                  {...register("gmail", { required: true })}
                />
              )}
            />

            {/* College ID as Select */}
            <Controller
              name="collegeId"
              control={control}
              rules={{ required: "College ID is required" }}
              render={({ field }) => (
                <div>
                  <label>College: </label>
                  <select {...field} {...register("collegeId", { required: true })} className="w-full p-2 border rounded" onChange={(e) => {
                          field.onChange(e.target.value); // Update form state
                          handleCollegeChange(e.target.value); // Call your custom method
                        }}>
                  <option value="">
                          Select your college
                        </option>
                        {colleges && colleges.length > 0 ? (
                          colleges.map((college) => (
                            <option key={college.id} value={college.id}>
                              {college.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No colleges available</option>
                        )}
                  </select>
                </div>
              )}
            />

            {/* Course ID as Select */}
            <Controller
              name="courseId"
              control={control}
              rules={{ required: "Course ID is required" }}
              render={({ field }) => (
                <div>
                  <label>Course: </label>
                  <select {...field} {...register("courseId", { required: true })} className="w-full p-2 border rounded" onChange={(e) => {
                          field.onChange(e.target.value); // Update form state
                          handleCourseChange(e.target.value); // Call your custom method
                        }}>
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
                </div>
              )}
            />

            {/* Branch ID as Select */}
            <Controller
              name="branchId"
              control={control}
              rules={{ required: "Branch ID is required" }}
              render={({ field }) => (
                <div>
                  <label>Branch: </label>
                  <select {...field} {...register("branchId", { required: true })} className="w-full p-2 border rounded">
                  <option value="">
                          Select your Branch
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
                </div>
              )}
            />

            {/* Teaching Since Field */}
            <Controller
              name="teachingSince"
              control={control}
              defaultValue=""
              rules={{ required: "Teaching Since is required" }}
              render={({ field }) => (
                <Input
                  label="Teaching Since: "
                  type="number"
                  placeholder="Enter your teaching experience (years)"
                  {...register("teachingSince", { required: true })}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
              )}
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#d27511] to-[#ff7e5f] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
            >
              Register Faculty
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegistration;