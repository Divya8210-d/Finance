import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  return (
    <section id="about">
      <main className="min-h-[700px] bg-gradient-to-r from-orange-100 to-orange-300 px-6 md:px-16 py-16 text-orange-900">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl font-bold text-center mb-12"
        >
          Finanlyics: A Personal Finance Dashboard
        </motion.h2>

        {/* Section container */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {[
            {
              title: "Collaborating AI and Finance",
              desc: "With power of AI and tools, Finanlyics provides efficient tips and plans for managing your expenses.",
            },
            {
              title: "Our Mission",
              desc: "Empower every individual to take charge of their financial future using reliable data, insights, and intuitive tools.",
            },
            {
              title: "Smart Tools",
              desc: "Access calculators, trend predictors, and savings analyzers – designed for beginner investors and seasoned traders alike.",
            },
            {
              title: "Safe and Secure Environment",
              desc: "All the data and finance stats of a user are safely secured and used wisely — alterable only by the user.",
            },
          ].map((block, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative pl-6 border-l-4 border-orange-500"
            >
              <div className="absolute -left-3 top-1 w-6 h-6 bg-orange-500 rounded-full shadow-md"></div>
              <h3 className="text-2xl font-semibold mb-2">{block.title}</h3>
              <p className="text-base leading-relaxed">{block.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
