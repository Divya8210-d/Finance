import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import paidseal from "../Images/paidseal.png";

const defaultCategories = [
  'Groceries', 'Rents', 'Bills', 'Shoppings',
  'Chilling', 'Vehicles', 'Fees', 'Personal',
  'Recharge', 'Others'
];

export default function Transactions() {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [weekIndex, setWeek] = useState(0);
  const [month, setMonth] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);

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
      toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    todayTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-inter">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Transactions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          ADD TRANSACTION
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 mx-auto mb-8"
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center sm:text-left">
              Transactions
            </h1>
            <motion.img
              src={paidseal}
              alt="Paid Seal"
              className="h-[110px] w-[110px] mt-4 mx-auto sm:mt-0 sm:ml-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handlePayment logic should go here if you add Razorpay integration back
              toast.info("Payment handler not implemented in this minimal code!");
            }}
            className="space-y-6"
          >
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
                {defaultCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
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
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Payment Mode</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No transactions found today.
                </td>
              </tr>
            ) : (
              transactions.map((txn, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2">{txn.category}</td>
                  <td className="p-2">{txn.date || "N/A"}</td>
                  <td className="p-2">{txn.paymentMode || "N/A"}</td>
                  <td className="p-2">{txn.description || "N/A"}</td>
                  <td className={`p-2 ${txn.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
                    ₹{txn.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
