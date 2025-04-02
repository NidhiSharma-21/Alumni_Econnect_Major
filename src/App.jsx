// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import NavDash from './components/Navbar/NavDash'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateAccount from './pages/AdminRegistration'
import CollegeRegistration from './pages/CollegeFunctionalites'
import AboutUs from './pages/AboutUs'
import UserRegistration from './pages/UserRegistration'
import AlumniFeatures from './pages/Features'
import FacultyRegistration from './pages/FacultyRegistration'
import BlogsPage from './pages/BlogsPage'
import BlogEditor from './pages/BlogCreate'
import DashboardPage from './pages/DashBoard/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import EventShow from './pages/DashBoard/EventShow'
import EventForm from './pages/DashBoard/CreateEvent'
import JobPostForm from './pages/JobPostForm'
import JobPostShow from './pages/JobPostCard'
import ProfilePage from './pages/DashBoard/ProfilePage'
import PageNotFound from './pages/PageNotFound'
import { useState } from 'react'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="app-container">
      <NavDash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/adminaccount" element={<CreateAccount />} />
          <Route path="/features" element={<AlumniFeatures />} />
          <Route path="/collegefunctions" element={<CollegeRegistration />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/facultyregistration" element={<FacultyRegistration />} />

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

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App