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
  const aboutRef = useRef();
  const featuresRef = useRef();

  useEffect(() => {
    // Pin About section
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top top",
      end: "+=500",  // How long it stays pinned (adjust as needed)
      pin: true,
      scrub: true,
      markers: false // set true to debug
    });

    // Pin Features section (optional)
    ScrollTrigger.create({
      trigger: featuresRef.current,
      start: "top top",
      end: "+=500",
      pin: true,
      scrub: true,
      markers: false
    });

  }, []);

  return (
    <>
      <main>
        <ToastContainer position="top-center" />
        <Navbar />
        <Hero />
        
        <section ref={aboutRef}>
          <About />
        </section>

        <section ref={featuresRef}>
          <Features />
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Home;
