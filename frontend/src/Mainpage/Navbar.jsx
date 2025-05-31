import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <div className="w-full bg-gradient-to-r from-orange-400 to-orange-600 p-6">
        <div className="flex items-center justify-center relative">
          {/* Hamburger Icon - Visible on Small Screens */}
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-12 mt-2 text-white text-lg">
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Contact Us</li>
          </ul>

          {/* Mobile Nav Links - Animated */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-md text-white py-6 z-40 flex flex-col items-center gap-6 md:hidden"
              >
                <li className="cursor-pointer" onClick={() => setIsOpen(false)}>Home</li>
                <li className="cursor-pointer" onClick={() => setIsOpen(false)}>About</li>
                <li className="cursor-pointer" onClick={() => setIsOpen(false)}>Features</li>
                <li className="cursor-pointer" onClick={() => setIsOpen(false)}>Contact Us</li>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Navbar;
