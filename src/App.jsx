import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavDash from "./components/Navbar/NavDash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateAccount from "./pages/AdminRegistration";
import CollegeRegistration from "./pages/CollegeFunctionalites";
import AboutUs from "./pages/AboutUs";
import UserRegistration from "./pages/UserRegistration";
import FeatureSection from "./components/FeaturesCard/Feature";
import AlumniFeatures from "./pages/Features";
import FacultyRegistration from "./pages/FacultyRegistration";

import BlogsPage from "./pages/BlogsPage";
import BlogEditor from "./pages/BlogCreate";
// import DashNavbar from "./pages/DashBoard/DashboardNav";
import DashboardPage from "./pages/DashBoard/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventShow from "./pages/DashBoard/EventShow";
import EventForm from "./pages/DashBoard/CreateEvent";
import JobPostForm from "./pages/JobPostForm";
import JobPostShow from "./pages/JobPostCard";
import ProfilePage from "./pages/DashBoard/ProfilePage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <NavDash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/adminaccount" element={<CreateAccount />} />
            <Route path="/features" element={<AlumniFeatures />} />
            <Route path="/collegefunctions" element={<CollegeRegistration />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/userregistration" element={<UserRegistration />} />
            <Route path="/facultyregistration" element={<FacultyRegistration />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
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

            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
 