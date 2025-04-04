import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavDash = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoggedIn(true);
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  // Close the menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl text-[#2d545e] hover:text-[#3f7b88] font-bold whitespace-nowrap dark:text-white">
            Alumni-Econnect
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ? (
            <>
              <div className="hidden md:flex space-x-3">
                <Link to="/userregistration">
                  <button
                    type="button"
                    className="text-white bg-[#2d545e] hover:bg-[#3f7b88] font-semibold rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-[#2d545e]"
                  >
                    Create Account
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    type="button"
                    className="text-[#2d545e] bg-white hover:bg-gray-100 border border-[#2d545e] font-semibold rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-[#2d545e] dark:hover:bg-[#3f7b88]"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="hidden md:block text-[#2d545e] dark:text-white font-medium"
              >
                {userData?.name || "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 font-semibold rounded-lg text-sm px-4 py-2 text-center"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          ref={menuRef}
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#d27511] md:p-0 dark:text-white dark:hover:bg-gray-700 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#d27511] md:p-0 dark:text-white dark:hover:bg-gray-700 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#d27511] md:p-0 dark:text-white dark:hover:bg-gray-700 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#d27511] md:p-0 dark:text-white dark:hover:bg-gray-700 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="md:hidden">
                  <Link
                    to="/userregistration"
                    className="block py-2 px-3 text-white bg-[#2d545e] rounded hover:bg-[#3f7b88] md:p-0 dark:text-white font-semibold my-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-[#2d545e] bg-white border border-[#2d545e] rounded hover:bg-gray-100 md:p-0 dark:text-white dark:bg-[#2d545e] font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="md:hidden">
                  <Link
                    to="/dashboard"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#d27511] md:p-0 dark:text-white dark:hover:bg-gray-700 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="md:hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block py-2 px-3 text-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 dark:text-red-400 dark:hover:bg-gray-700 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavDash;