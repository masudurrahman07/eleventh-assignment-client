
import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Footer = () => {
  return (
    <motion.footer
      className="
        bg-linear-to-r from-emerald-400 to-teal-500 
        shadow-lg text-white mt-16 
        transition-all duration-300 
        hover:from-teal-400 hover:to-emerald-500"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeUp}>
      <div className="max-w-7xl mx-auto py-12 px-4  grid md:grid-cols-3 gap-10">

        
        <motion.div
          variants={fadeUp}
          className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-white/90">LocalChefBazaar</p>
          <p className="text-white/90">Email: support@localchefbazaar.com</p>
          <p className="text-white/90">Phone: +880 123 456 789</p>
        </motion.div>

        
        <motion.div
          variants={fadeUp}
          className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6 text-3xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all">
              <FaFacebook />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all">
              <FaTwitter />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-all">
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        
        <motion.div
          variants={fadeUp}
          className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Working Hours</h2>
          <p className="text-white/90">Mon - Fri: 8:00 AM - 8:00 PM</p>
          <p className="text-white/90">Saturday: 9:00 AM - 5:00 PM</p>
          <p className="text-white/90">Sunday: Closed</p>
        </motion.div>
      </div>

    
      <div className="bg-black/20 text-center py-4 mt-6 backdrop-blur-sm">
        <p className="text-white/90 text-sm">
          © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </p>
      </div>
    </motion.footer>);
};

export default Footer;
