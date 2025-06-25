import { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileLinkRefs = useRef([]);
  const desktopLinkRefs = useRef([]);

  const handleScroll = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  useEffect(() => {
    // Animate desktop nav links on mount
    gsap.fromTo(
      desktopLinkRefs.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  }, []);

  useEffect(() => {
    // Animate mobile links when menu opens
    if (isOpen) {
      gsap.fromTo(
        mobileLinkRefs.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Features', id: 'features' },
    { name: 'Contact Us', id: 'footer' },
  ];

  return (
    <>
      <div className="w-full bg-gradient-to-r from-orange-400 to-orange-600 p-6">
        <div className="flex items-center justify-center relative">
          {/* Hamburger Icon */}
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl z-40"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-12 mt-2 text-white text-lg">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                ref={(el) => (desktopLinkRefs.current[i] = el)}
                className="cursor-pointer"
                onClick={() => handleScroll(link.id)}
              >
                {link.name}
              </li>
            ))}
          </ul>

          {/* Mobile Nav Links */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-md text-white py-6 z-40 flex flex-col items-center gap-6 md:hidden"
              >
                {navLinks.map((link, i) => (
                  <li
                    key={link.id}
                    ref={(el) => (mobileLinkRefs.current[i] = el)}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      handleScroll(link.id);
                    }}
                  >
                    {link.name}
                  </li>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Navbar;
