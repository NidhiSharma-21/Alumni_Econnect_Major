import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavDash from "./components/Navbar/NavDash"; // Import Navbar
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
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
        {/* <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} /> */}
       
        {/* <Route path="/about" element={<AboutUsComponent />} /> */}
        {/* 404 Page route */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
 