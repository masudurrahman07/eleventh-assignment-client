import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className="shadow-lg text-white transition-all duration-300"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to right, #047857, #0d9488)' 
          : 'linear-gradient(to right, #10b981, #14b8a6)' }}>

      <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-3 gap-10">
        <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link 
              to="/contact" 
              className="block text-white/90 hover:text-yellow-300 transition-colors duration-300">
              Contact Us
            </Link>
            <Link 
              to="/cookies" 
              className="block text-white/90 hover:text-yellow-300 transition-colors duration-300">
              Cookie Policy</Link>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6 text-3xl">

            <a
              href="https://www.facebook.com/mdmasudur.rahman.1800721"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-110">
              <FaFacebook />
            </a>

            <a
              href="https://github.com/masudurrahman07/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-110">
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/masudurrahman07/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Working Hours</h2>
          <p className="text-white/90">Mon - Fri: 8:00 AM - 8:00 PM</p>
          <p className="text-white/90">Saturday: 9:00 AM - 5:00 PM</p>
          <p className="text-white/90">Sunday: Closed</p>
        </div>
      </div>

      <div 
        className="text-center py-4 mt-6 backdrop-blur-sm border-t border-white/20"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'
        }}>
        <p className="text-white/90 text-sm">
          © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;