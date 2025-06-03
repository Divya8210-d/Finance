import React, { useState, useEffect } from "react";
import axios from "axios";
import paidseal from "../Images/paidseal.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Transactions() {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [weekIndex, setWeek] = useState(0);
  const [month, setMonth] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  function getWeekIndexAndMonth(dateInput) {
    const date = new Date(dateInput);
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    let weekIndex = 0;
    if (dayOfMonth > 7 && dayOfMonth <= 14) weekIndex = 1;
    else if (dayOfMonth > 14 && dayOfMonth <= 21) weekIndex = 2;
    else if (dayOfMonth > 21) weekIndex = 3;

    return { weekIndex, month };
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    const finalAmount = parseInt(amount) *100;

    try {
      const { data } = await axios.post(
        "https://finanlytic.onrender.com/api/v1/payment/createorder",
        { amount: finalAmount },
        { withCredentials: true }
      );
        
         
      const { id: order_id, currency } = data.data;

      const options = {
        key: "rzp_test_W5q6dvRFx7DDty",
        amount: finalAmount,
        currency,
        order_id,
        name: "Expense Tracker",
        description: "Payment",
        handler: async function (response) {
          const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          } = response;

          const verifyRes = await axios.post(
            "https://finanlytic.onrender.com/api/v1/payment/verifypay",
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              amount: parseInt(amount),
              category,
              weekIndex,
              month,
              date: selectedDate,
            },
            { withCredentials: true }
          );

          toast.success(verifyRes.data.data || "Payment successful!");
          todayTransactions();
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      
      toast.error("Payment failed. Please try again.");
    }
  };

  const todayTransactions = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/payment/todaytransaction",
        { date: today },
        { withCredentials: true }
      );
      setTransactions(res.data.data);
    } catch (err) {
      toast.error(
        "Something went wrong: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    todayTransactions();
  }, []);

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 pt-4 font-inter">
  <ToastContainer position="top-center" autoClose={3000} />
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6"
  >
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center sm:text-left lg:ml-64 sm:ml-10">
        Transactions
      </h1>
      <motion.img
        src={paidseal}
        alt="Paid Seal"
        className="h-[110px] w-[110px] mt-4 mx-auto sm:mt-0 sm:ml-20 sm:mx-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>

    <form onSubmit={handlePayment} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {/* ...options */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            const { weekIndex, month } = getWeekIndexAndMonth(e.target.value);
            setMonth(month);
            setWeek(weekIndex);
            setSelectedDate(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Amount (₹)
        </label>
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setAmount(e.target.value)}
          required
          min={1}
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Pay
      </motion.button>
    </form>

    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-5 text-center">
        Today's Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No transactions found today.
        </p>
      ) : (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {transactions.map((txn, index) => (
            <motion.div
              key={index}
              className="hover:bg-orange-100 dark:hover:bg-gray-700 transition flex justify-between items-center p-4 bg-orange-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                {txn.category}
              </div>
              <div className="text-green-600 dark:text-green-400 font-semibold">
                ₹{txn.amount}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
</div>

  );
}
