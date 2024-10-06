import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
        <Route path="/event" element={<Event/>} />

        {/* Faculty Registration route */}
        <Route path="/facultyregistration" element={<FacultyRegistration/>}/>
          
        {/* 404 Page route */}
        <Route path="/*" element={<PageNotFound />} />
        {/*Bloge route*/ }
        <Route path="/blog" element={<BlogsPage />} />
        

      </Routes>
    </div>
  );
};

export default App;
 