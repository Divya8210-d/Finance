import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvestmentTips() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [classification, setClassification] = useState();
  const [tips, setTips] = useState([]);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const unanswered = questions.find((q) => !answers[q.key]);
    if (unanswered) {
      toast.error(`"${unanswered.q}" is required`);
      return;
    }

    console.log("Submitted Answers:", answers);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/tips", answers, {
        withCredentials: true,
      });
      setClassification(res.data.data.classification);
      setTips(res.data.data.tips);
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.error("Tips error:", message);
      toast.error(message);
    }
  };

  const questions = [
    {
      key: "age",
      q: "What's your age?",
      input: (key) => (
        <input
          type="number"
          name={key}
          value={answers[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="mt-2 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      ),
    },
    {
      key: "dependents",
      q: "Do you have dependents?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["1", "2", "3", "4", "5", "More than 5"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "goal",
      q: "What's your primary goal for investing?",
      input: (key) => (
        <input
          type="text"
          name={key}
          value={answers[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="mt-2 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      ),
    },
    {
      key: "risktolerance",
      q: "What's your risk tolerance?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {[1, 2, 3, 4, 5].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === String(val)}
                onChange={() => handleChange(key, String(val))}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "monthlyInvestmentCapacity",
      q: "What percentage of your income are you able to invest monthly?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["0-10", "10-20", "20-30", "30-40", "40-50", "Greater than 50"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "pastinvestments",
      q: "Have you invested before?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Yes", "No"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "longTermLockInComfort",
      q: "Would you be okay if your money is locked for 5-10 years?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Yes", "No"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "importance",
      q: "What's more important to you?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Avoiding losses", "Balanced growth", "Maximizing returns"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "returnpreference",
      q: "Do you want regular returns or is long term growth more important to you?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Regular return", "Long term growth"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "investmentHorizon",
      q: "When do you expect to need the money you are investing?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["< 1 yr", "2 yr", "3 yr", "4 yr", "5 yr", "More than 5 yrs"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 pl-10 text-gray-800 dark:text-gray-200 text-left font-inter">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Investment Tips
      </motion.h1>

      <hr className="mb-6 border-gray-300 dark:border-gray-600" />

      <motion.div
        className="text-black dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 text-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p>Welcome! Here are some key questions to guide your investment journey.</p>
      </motion.div>

      {questions.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            onClick={() => toggleQuestion(index)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2"
          >
            <p className="font-semibold text-lg">{index + 1}. {item.q}</p>
          </div>

          <AnimatePresence>
            {openQuestion === index && (
              <motion.div
                className="mt-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.input(item.key)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className="bg-orange-500 dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </motion.div>

      <AnimatePresence>
        {tips.length > 0 && classification && (
          <motion.div
            key="tips"
            className="dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="p-3">Looks like you are a <strong>{classification}</strong> Investor.</p>
            <p className="p-3">We would like to give you some tips regarding investment. Like:</p>
            <ul className="p-3 list-disc list-inside space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
