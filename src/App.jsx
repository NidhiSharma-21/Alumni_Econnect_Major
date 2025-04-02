import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavDash from "./components/Navbar/NavDash";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check auth status on initial load and route changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Replace with your actual auth check logic
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);



  return (
    <div className="app-container">
      <NavDash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            } 
          />
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
            <Route path="blog">
              <Route index element={<BlogsPage />} />
              <Route path="create" element={<BlogEditor />} />
            </Route>
            <Route path="eventshow">
              <Route index element={<EventShow />} />
              <Route path="eventCreate" element={<EventForm />} />
            </Route>
            <Route path="jobpost">
              <Route index element={<JobPostShow />} />
              <Route path="jobform" element={<JobPostForm />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Error Handling */}
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;