import React, { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import About from "./Mainpage/About";
import Features from "./Mainpage/Features";
import Footer from "./Mainpage/Footer";
import Hero from "./Mainpage/Hero";
import Navbar from "./Mainpage/Navbar";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  



  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />

      <div>
        <section>
          <Hero />
        </section>
        <section >
          <About />
        </section>
        <section >
          <Features />
        </section>
      
          <Footer />
    
      </div>
    </>
  );
}

export default Home;
