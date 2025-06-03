import React from "react";
import Saving from "./Insights/Saving";
import SpendingTrends from "./Insights/SpendingTrends";
import Week from "./Insights/Week";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

function Insights() {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      {/* Saving Chart and Insight Summary */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Saving />
      </motion.div>

      {/* Spending Trends */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SpendingTrends />
      </motion.div>

      {/* Weekly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Week />
      </motion.div>

      <ToastContainer />
    </div>
  );
}

export default Insights;
