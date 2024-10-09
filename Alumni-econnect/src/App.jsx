import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavDash from "./components/Navbar/NavDash"; // Import Navbar
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import CreateAccount from "./pages/AdminRegistration";
import CollegeRegistration from "./pages/CollegeFunctionalites";
import AboutUs from "./pages/AboutUs";
import UserRegistration from "./pages/UserRegistration";
import FeatureSection from "./components/FeaturesCard/Feature";
import AlumniFeatures from "./pages/Features";
import FacultyRegistration from "./pages/FacultyRegistration";

import Event from "./pages/DashBoard/Event";
import BlogsPage from "./pages/BlogsPage";
import BlogEditor from "./pages/BlogCreate";
// import DashNavbar from "./pages/DashBoard/DashboardNav";
import DashboardPage from "./pages/DashBoard/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="">
      {/* Pass the login state to NavDash */}
      <NavDash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Define application routes */}
      <Routes>
        {/* Home route (accessible to all users) */}
        <Route path="/" element={<Home />} />
        
        {/* Login route (passes setIsLoggedIn to change login state upon login) */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Signup route (passes setIsLoggedIn to change login state upon signup) */}
        <Route path="/adminaccount" element={<CreateAccount/>} />
        <Route path="/features" element={<AlumniFeatures/>} />
        <Route path="/collegefunctions" element={<CollegeRegistration/>} />
        <Route path="/about" element={<AboutUs/>}/>
        
        {/* User Registration route */}
        <Route path="/userregistration" element={<UserRegistration/>}/>
        {/* <Route path="/event" element={<Event/>} /> */}
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        {/* Nested Routes */}
        <Route index element={<Navigate to="blog" replace />} /> {/* Default when /dashboard is accessed */}
        <Route path="blog" element={<BlogsPage />} >
        <Route path="create" element={<BlogEditor />} />

        </Route>
        <Route path="events" element={<Event />} />
        {/* <Route path="jobpost" element={<Jobpost />} /> */}
      </Route>

        {/* Faculty Registration route */}
        <Route path="/facultyregistration" element={<FacultyRegistration/>}/>
          
        {/* 404 Page route */}
        <Route path="/*" element={<PageNotFound />} />
        {/*Bloge route*/ }
        
        

      </Routes>
    </div>
  );
};

export default App;
 