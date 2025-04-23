import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavbarSelector from "./components/Navbar/NavbarSelector";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateAccount from "./pages/AdminRegistration";
import CollegeRegistration from "./pages/CollegeFunctionalites";
import AboutUs from "./pages/AboutUs";
import UserRegistration from "./pages/UserRegistration";
import AlumniFeatures from "./pages/Features";
import FacultyRegistration from "./pages/FacultyRegistration";
import BlogsPage from "./pages/BlogsPage";
import BlogEditor from "./pages/BlogCreate";
import DashboardPage from "./pages/DashBoard/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventShow from "./pages/DashBoard/EventShow";
import EventForm from "./pages/DashBoard/CreateEvent";
import JobPostForm from "./pages/JobPostForm";
import JobPostShow from "./pages/JobPostCard";
import ProfilePage from "./pages/DashBoard/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import ContactUs from "./pages/ContactUsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (
    <div className="">
      {/* NavbarSelector automatically shows the appropriate navbar */}
      <NavbarSelector />

      {/* Define application routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminaccount" element={<CreateAccount />} />
        <Route path="/features" element={<AlumniFeatures />} />
        <Route path="/collegefunctions" element={<CollegeRegistration />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/userregistration" element={<UserRegistration />} />
        <Route path="/facultyregistration" element={<FacultyRegistration />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="blog" replace />} />
          <Route path="blog" element={<BlogsPage />}>
            <Route path="create" element={<BlogEditor />} />
          </Route>
          <Route path="eventshow" element={<EventShow />} />
          <Route path="eventshow/eventCreate" element={<EventForm />} />
          <Route path="jobpost" element={<JobPostShow />} />
          <Route path="jobpost/jobform" element={<JobPostForm />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 Page route */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

// Wrap App with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;