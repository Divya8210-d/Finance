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
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false, // no extra space added below
        scrub: true
      });
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />

      <div>
        <section ref={el => sectionsRef.current[0] = el}>
          <Hero />
        </section>
        <section ref={el => sectionsRef.current[1] = el}>
          <About />
        </section>
        <section ref={el => sectionsRef.current[2] = el}>
          <Features />
        </section>
        <section >
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Home;
