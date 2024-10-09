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

import BlogsPage from "./pages/BlogsPage";
import BlogEditor from "./pages/BlogCreate";
import EventShow from "./pages/DashBoard/EventShow";
import EventForm from "./pages/DashBoard/CreateEvent";
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
        <Route path="/blogCreate" element={<BlogEditor/>}/>
        {/* User Registration route */}
        <Route path="/userregistration" element={<UserRegistration/>}/>
        <Route path="/eventCreate" element={<EventForm/>} />
        <Route path="/eventShow" element={<EventShow/>} />
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
 