import { motion } from 'framer-motion';
import Auth from '../auth';
import bull from '../Images/bull.png';

export default function Hero() {



  return (    <section id="home" >
    <main className="bg-gradient-to-r from-orange-400 to-orange-600 min-h-[700px] flex justify-center px-8 pt-2 relative overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-11 relative z-10">
        
        {/* Bull Image (unchanged) */}
        <motion.img
          src={bull}
             initial={{  opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          alt="Bull"
          className="
            absolute 
            opacity-80 
            transform -translate-x-1/2 -translate-y-1/2 
            z-0
            top-[300px] left-[250px] w-[800px] h-[800px] 
            md:top-[300px] md:left-[250px] md:w-[800px] md:h-[800px]
            sm:top-[250px] sm:left-[50%] sm:w-[400px] sm:h-[400px]
            max-sm:top-[200px] max-sm:left-[50%] max-sm:w-[300px] max-sm:h-[300px]
          "
        />

        {/* Left Text Section with motion */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left space-y-4 pt-40 z-10"
        >
          <h1 className="text-[60px] md:text-[80px] font-bold text-white">Finanlytic</h1>
          <p className="text-white text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, sed.
          </p>
        </motion.div>

        {/* Right Form Section with motion */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="flex-1 max-w-md w-full relative z-10"
        >
          <div className="relative z-10">
            <Auth />
          </div>
        </motion.div>
      </div>
    </main></section>
  );
}
