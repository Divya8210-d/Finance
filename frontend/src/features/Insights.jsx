import React from "react";
import Saving from "./Insights/Saving";
import SpendingTrends from "./Insights/SpendingTrends";
import Week from "./Insights/Week";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

function Insights() {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      
         <div className="bg-orange-100 dark:bg-orange-900 rounded-xl p-4 w-full mt-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
          A analysis of your monthly expense
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2"></p>
      </div>
       <div className="flex">
        <Cashflow/>
       </div>

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
