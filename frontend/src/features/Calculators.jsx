import React from "react";
import { motion } from "framer-motion";
import personal from "../Images/personal.png";
import gst from "../Images/gst.png";
import fixed from "../Images/fixed.png";
import credit from "../Images/credit.png";
import { useLocation, useNavigate } from "react-router-dom";
import FD from "./Calculators/FD";
import Gst from "./Calculators/Gst";
import EMI from "./Calculators/EMI";
import Credit from "./Calculators/Credit";

const calculators = [
  {
    title: "Gst Amount Calculator",
    description: "Calculate gst for different goods and services.",
    src: `${gst}`,
    type: "gst",
  },
  {
    title: "Personal Loan EMI Calculator",
    description: "Calculate your monthly EMI for a personal loan.",
    src: `${personal}`,
    type: "emi",
  },
  {
    title: "Fixed Deposit Interest Calculator",
    description: "Compute the interest earned on your fixed deposit.",
    src: `${fixed}`,
    type: "fd",
  },
  {
    title: "Credit Card Debt Payoff Calculator",
    description: "Plan how to pay off your credit card debt efficiently.",
    src: `${credit}`,
    type: "credit",
  },
];

export default function Calculator() {
  const location = useLocation();
  const navigate = useNavigate();

  const isfd = location.pathname.endsWith("/fd");
  const isgst = location.pathname.endsWith("/gst");
  const iscredit = location.pathname.endsWith("/credit");
  const isemi = location.pathname.endsWith("/emi");

  const closeModal = () => navigate("/Dashboard/Calculators");

  return (
    <div className="p-6 mx-auto font-inter dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      {/* Heading */}
      <motion.div
        className="mb-6 flex flex-col"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2 dark:text-gray-100">
          Calculators
        </h1>
        <hr className="w-full border-t border-gray-300 dark:border-gray-700" />
      </motion.div>

      {/* Cards */}
      <div className="space-y-6">
        {calculators.map((calc, idx) => (
          <motion.div
            key={idx}
            className="border border-gray-300 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center
              dark:border-gray-700 dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            {/* Text Section */}
            <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
              <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">
                {calc.title}
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{calc.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate(`/Dashboard/Calculators/${calc.type}`);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                Calculate
              </motion.button>
            </div>

            {/* Image Section */}
            <div className="w-full sm:w-32 flex justify-center">
              <img
                src={calc.src}
                alt="Calculator Icon"
                className="w-32 h-32 object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {isfd && <FD onClose={closeModal} />}
      {isgst && <Gst onClose={closeModal} />}
      {isemi && <EMI onClose={closeModal} />}
      {iscredit && <Credit onClose={closeModal} />}
    </div>
  );
}
