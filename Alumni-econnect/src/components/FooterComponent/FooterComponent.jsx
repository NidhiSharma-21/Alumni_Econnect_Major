import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function AlumniEconnectFooter() {
  return (
    <footer className="bg-gray-900 text-white text-center">
      <div className="p-4">
        <section className="mb-4 flex justify-center items-center space-x-4">
          {/* Social Media Buttons */}
          <a href="#!" className="text-white hover:text-gray-400" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#!" className="text-white hover:text-gray-400" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#!" className="text-white hover:text-gray-400" aria-label="Google">
            <FaGoogle />
          </a>
          <a href="#!" className="text-white hover:text-gray-400" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#!" className="text-white hover:text-gray-400" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="#!" className="text-white hover:text-gray-400" aria-label="GitHub">
            <FaGithub />
          </a>
        </section>
      </div>
      <div className="p-3 bg-gray-800">
        <p>
          © 2024 Alumni-Econnect. All right reserved.
        </p>
      </div>
    </footer>
  );
}
