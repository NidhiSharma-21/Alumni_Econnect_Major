import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon, // Import the search icon
} from '@heroicons/react/24/outline';
import Dropdown from '../../components/Navbar/DropDown';
import SideDrawer from '../../components/Navbar/SideDrawer';
import { userService } from '../../services/userServices';

const DashNavbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [detailuser, setDetailUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const blogDropdownRef = useRef(null);
  const eventDropdownRef = useRef(null);
  const jobDropdownRef = useRef(null);

  const blogDropdownItems = [
    { label: 'Create Blog', link: '/dashboard/blog/create' },
    { label: 'View Blogs', link: '/dashboard/blog' },
  ];

  const eventDropdownItems = [
    { label: 'Create Event', link: '/dashboard/eventshow/eventCreate' },
    { label: 'Upcoming Events', link: '/dashboard/eventshow/upcoming' },
    { label: 'View Events', link: '/dashboard/eventshow' },
  ];

  const jobDropdownItems = [
    { label: 'Job post', link: '/dashboard/jobpost/jobform' },
    { label: 'View Jobs', link: '/dashboard/jobpost' },
  ];

  // Close specific dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (blogDropdownRef.current && !blogDropdownRef.current.contains(event.target)) {
        setIsBlogDropdownOpen(false);
      }
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target)) {
        setIsEventDropdownOpen(false);
      }
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(event.target)) {
        setIsJobDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  useEffect(() => {
    const getUserByToken = async () => {
      try {
        const response = await userService.getUserByToken();
        setUser(response);
        const Userid = response.id;
        const deresponse = await userService.getDetailsUserById(Userid);
        setDetailUser(deresponse);
      } catch (error) {
        console.log(error);
      }
    };
    getUserByToken();
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Brand and Search Bar */}
          <div className="flex-shrink-0 flex items-center space-x-8">
            <NavLink to="/" className="text-xl font-bold text-[#2D545E]">
              Alumni-Econnect
            </NavLink>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Alumni"
                className="pl-10 pr-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D545E] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Center: Nav Items */}
          <div className="hidden md:flex md:space-x-8">
            {/* Blog with Dropdown */}
            <div className="relative flex" ref={blogDropdownRef}>
              <NavLink
                to="/dashboard/blog"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <BookOpenIcon className="h-5 w-5 mr-1" />
                Blog
              </NavLink>
              <button
                onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                className="flex items-center px-1 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isBlogDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
              <Dropdown
                isOpen={isBlogDropdownOpen}
                items={blogDropdownItems}
                onItemClick={() => setIsBlogDropdownOpen(false)}
              />
            </div>

            {/* Events with Dropdown */}
            <div className="relative flex" ref={eventDropdownRef}>
              <NavLink
                to="/dashboard/eventshow"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <CalendarIcon className="h-5 w-5 mr-1" />
                Events
              </NavLink>
              <button
                onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
                className="flex items-center px-1 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isEventDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
              <Dropdown
                isOpen={isEventDropdownOpen}
                items={eventDropdownItems}
                onItemClick={() => setIsEventDropdownOpen(false)}
              />
            </div>

            {/* Jobpost with Dropdown */}
            <div className="relative flex" ref={jobDropdownRef}>
              <NavLink
                to="/dashboard/jobpost"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <BriefcaseIcon className="h-5 w-5 mr-1" />
                Jobs
              </NavLink>
              <button
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="flex items-center px-1 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isJobDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
              <Dropdown
                isOpen={isJobDropdownOpen}
                items={jobDropdownItems}
                onItemClick={() => setIsJobDropdownOpen(false)}
              />
            </div>
          </div>

          {/* Right Side: Profile and Logout */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <UserCircleIcon className="h-5 w-5 mr-1" />
                <span>Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Blog with Dropdown */}
            <div className="relative" ref={blogDropdownRef}>
              <NavLink
                to="/dashboard/blog"
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpenIcon className="h-5 w-5 mr-1" />
                Blog
              </NavLink>
              <button
                onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isBlogDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
              <Dropdown
                isOpen={isBlogDropdownOpen}
                items={blogDropdownItems}
                onItemClick={() => {
                  setIsBlogDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Events with Dropdown */}
            <div className="relative" ref={eventDropdownRef}>
              <NavLink
                to="/dashboard/eventshow"
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarIcon className="h-5 w-5 mr-1" />
                Events
              </NavLink>
              <button
                onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isEventDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1" />
              </button>
              <Dropdown
                isOpen={isEventDropdownOpen}
                items={eventDropdownItems}
                onItemClick={() => {
                  setIsEventDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Jobpost with Dropdown */}
            <div className="relative" ref={jobDropdownRef}>
              <NavLink
                to="/dashboard/jobpost"
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BriefcaseIcon className="h-5 w-5 mr-1" />
                Jobs
              </NavLink>
              <button
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isJobDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5 ml-1"/>
              </button>
              <Dropdown
                isOpen={isJobDropdownOpen}
                items={jobDropdownItems}
                onItemClick={() => {
                  setIsJobDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Profile */}
            <button
              onClick={() => {
                setIsDrawerOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <UserCircleIcon className="h-5 w-5 mr-1" />
              Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-5 w-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}

      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} user={user} detailuser={detailuser} />
    </nav>
  );
};

export default DashNavbar;
