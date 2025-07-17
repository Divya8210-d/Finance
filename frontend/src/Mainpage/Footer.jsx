import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import sendmail from "../../utils/Contact.js";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Footer() {

  const handleScroll = (id) => {
  
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); 
  };

const [email,setEmail] = useState("")





  return (    <section id="footer">
    <footer className="bg-gradient-to-l from-orange-100 to-orange-200 text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="flex items-start gap-3 mb-2">
            <FaMapMarkerAlt className="mt-1 text-orange-600" />
            <p>Police Colony, Bihar, India</p>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <FaPhone className="text-orange-600" />
            <p>+91 8210320947</p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-orange-600" />
            <p>support@finanlytic.com</p>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li   onClick={() => handleScroll('home')} ><a  className="hover:text-orange-600 cursor-pointer">Home</a></li>
            <li   onClick={() => handleScroll('about')}><a  className="hover:text-orange-600 cursor-pointer">About</a></li>
            <li   onClick={() => handleScroll('features')}><a className="hover:text-orange-600 cursor-pointer">Features</a></li>
            <li   onClick={() => handleScroll('footer')}><a  className="hover:text-orange-600 cursor-pointer">Contact</a></li>
          </ul>
        </motion.div>

        {/* Newsletter / Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
          <p className="mb-3">Get updates about our latest features and feel free to reach out.</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>[
                   setEmail(e.target.value)
            ]}
            className="w-full px-3 py-2 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        
          >
            Contact us 
          </button>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="border-t mt-10 pt-5 text-center text-sm text-gray-600"
      >
        © {new Date().getFullYear()} Finanlytic. All rights reserved.
      </motion.div>
    </footer></section>
  );
}
