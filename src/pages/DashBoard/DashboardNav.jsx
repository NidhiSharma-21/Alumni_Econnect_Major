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
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../../components/Navbar/DropDown';
import SideDrawer from '../../components/Navbar/SideDrawer';
import { userService } from '../../services/userServices';
import ChatWindow from '../../components/Chats/ChatWindow';

const DashNavbar = () => {
  const navigate = useNavigate();
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
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
    // Add any other items you need to clear
    navigate('/login');
    window.location.reload(); 
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Brand and Search Bar */}
          <div className="flex items-center flex-shrink-0 md:space-x-4 lg:space-x-8">
            <NavLink to="/" className="text-lg sm:text-xl font-bold text-[#2D545E] whitespace-nowrap">
              Alumni-Econnect
            </NavLink>
            
            {/* Search Bar - Hidden on small screens, shown on medium and up */}
            <div className="hidden md:block relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Alumni"
                className="pl-10 pr-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D545E] focus:border-transparent w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Search - Shown only on small screens */}
          <div className="md:hidden flex-1 mx-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D545E] focus:border-transparent w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Center: Nav Items - Hidden on small screens */}
          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4 xl:space-x-6">
            {/* Blog with Dropdown */}
            <div className="relative flex" ref={blogDropdownRef}>
              <NavLink
                to="/dashboard/blog"
                className={({ isActive }) =>
                  `flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <BookOpenIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Blog</span>
              </NavLink>
              <button
                onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                className="flex items-center px-1 py-1 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isBlogDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5" />
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
                  `flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <CalendarIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Events</span>
              </NavLink>
              <button
                onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
                className="flex items-center px-1 py-1 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isEventDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5" />
              </button>
              <Dropdown
                isOpen={isEventDropdownOpen}
                items={eventDropdownItems}
                onItemClick={() => setIsEventDropdownOpen(false)}
              />
            </div>

            {/* Chat Button */}
            <button
              onClick={handleChatToggle}
              className="flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none whitespace-nowrap"
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="hidden sm:inline">Messaging</span>
            </button>

            {/* Jobpost with Dropdown */}
            <div className="relative flex" ref={jobDropdownRef}>
              <NavLink
                to="/dashboard/jobpost"
                className={({ isActive }) =>
                  `flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <BriefcaseIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Jobs</span>
              </NavLink>
              <button
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="flex items-center px-1 py-1 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isJobDropdownOpen}
              >
                <ChevronDownIcon className="h-5 w-5" />
              </button>
              <Dropdown
                isOpen={isJobDropdownOpen}
                items={jobDropdownItems}
                onItemClick={() => setIsJobDropdownOpen(false)}
              />
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none whitespace-nowrap"
            >
              <UserCircleIcon className="h-5 w-5 mr-1" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none whitespace-nowrap"
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
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button - Shown only on small screens */}
          <div className="md:hidden flex items-center">
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

      {/* Mobile Menu - Shown only on small screens */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Blog with Dropdown */}
            <div className="relative" ref={blogDropdownRef}>
              <div className="flex items-center justify-between">
                <NavLink
                  to="/dashboard/blog"
                  className={({ isActive }) =>
                    `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  Blog
                </NavLink>
                <button
                  onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isBlogDropdownOpen}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
              <Dropdown
                isOpen={isBlogDropdownOpen}
                items={blogDropdownItems}
                onItemClick={() => {
                  setIsBlogDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                mobile
              />
            </div>

            {/* Events with Dropdown */}
            <div className="relative" ref={eventDropdownRef}>
              <div className="flex items-center justify-between">
                <NavLink
                  to="/dashboard/eventshow"
                  className={({ isActive }) =>
                    `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Events
                </NavLink>
                <button
                  onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isEventDropdownOpen}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
              <Dropdown
                isOpen={isEventDropdownOpen}
                items={eventDropdownItems}
                onItemClick={() => {
                  setIsEventDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                mobile
              />
            </div>

            {/* Chat Button */}
            <button
              onClick={() => {
                handleChatToggle();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Messaging
            </button>

            {/* Jobpost with Dropdown */}
            <div className="relative" ref={jobDropdownRef}>
              <div className="flex items-center justify-between">
                <NavLink
                  to="/dashboard/jobpost"
                  className={({ isActive }) =>
                    `flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  Jobs
                </NavLink>
                <button
                  onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isJobDropdownOpen}
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
              <Dropdown
                isOpen={isJobDropdownOpen}
                items={jobDropdownItems}
                onItemClick={() => {
                  setIsJobDropdownOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                mobile
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
              <UserCircleIcon className="h-5 w-5 mr-2" />
              Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-5 w-5 mr-2"
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
      {isChatOpen && <ChatWindow onClose={handleChatToggle} />}
    </nav>
  );
};

export default DashNavbar;