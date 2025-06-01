import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const defaultCategories = [
  'Groceries', 'Rents', 'Bills', 'Shoppings',
  'Chilling', 'Vehicles', 'Fees', 'Personal',
  'Recharge', 'Others'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Expenses = () => {
 const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  // Initialize expenses array with 4 weeks of zero for each category
  const [expenses, setExpenses] = useState(
    defaultCategories.map(() => [0, 0, 0, 0])
  );
  const [operation, setOperation] = useState("Add Expenses");

  const handleExpenseChange = (categoryIndex, weekIndex, value) => {
    const newExpenses = [...expenses];
    newExpenses[categoryIndex][weekIndex] = Number(value);
    setExpenses(newExpenses);
  };

  const calculateCategoryTotal = (categoryIndex) =>
    expenses[categoryIndex].reduce((acc, curr) => acc + curr, 0);

  const resetFields = () => {
    setExpenses(defaultCategories.map(() => [0, 0, 0, 0]));
    setIncome("");
    setMonth("");
  };

  const handleSubmit = async () => {
    if (month === "" || income === "") {
      toast.warning("Info fields are required!!");
      return;
    }

    // Build the payload with category names as keys and weekly/monthlyTotal values
    const categoryFields = {};
    defaultCategories.forEach((cat, i) => {
      categoryFields[cat] = {
        weekly: expenses[i],
        monthlyTotal: calculateCategoryTotal(i),
      };
    });

    const expenseData = {
      month,
      monthlyincome: Number(income),
      ...categoryFields,
    };

    const url =
      operation === "Add Expenses"
        ? "http://localhost:5000/api/v1/dashboard/expenses"
        : "http://localhost:5000/api/v1/dashboard/updateexpenses";

    try {
      await axios.post(url, expenseData, { withCredentials: true });
      toast.success("Changes done successfully");
      resetFields();
    } catch (err) {
      const message =
        err.response?.data?.message || "Spends already exist you can update it";
    
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 max-w-6xl mx-auto font-inter text-gray-800"
    >
      <ToastContainer position='top-center'/>
      <h1 className="text-3xl font-extrabold text-center mb-6">
        Monthly Expenses Tracker
      </h1>
    

      {/* Input Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-md mb-6"
      >
        {/* Operation */}
        <div>
          <label className="block mb-1 font-semibold">Changes</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="Add Expenses">Add Expenses</option>
            <option value="Update Expenses">Update Expenses</option>
          </select>
        </div>

        {/* Month */}
        <div>
          <label className="block mb-1 font-semibold">Select Month</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Choose Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Income */}
        <div>
          <label className="block mb-1 font-semibold">Monthly Income (₹)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Your Income"
          />
        </div>
      </motion.div>

      {/* Expenses Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="overflow-x-auto bg-white rounded-xl shadow-lg"
      >
        <table className="min-w-full text-sm text-center">
          <thead className="bg-orange-100 text-gray-900 text-base">
            <tr>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Week 1</th>
              <th className="p-3 border">Week 2</th>
              <th className="p-3 border">Week 3</th>
              <th className="p-3 border">Week 4</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {defaultCategories.map((category, i) => (
              <motion.tr
                key={category}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-orange-50"
              >
                <td className="p-3 border font-medium">{category}</td>
                {[0, 1, 2, 3].map((weekIndex) => (
                  <td key={weekIndex} className="p-2 border">
                    <div className="relative flex items-center justify-center">
                      {operation === "Update Expenses" && (
                        <span className="absolute left-1 text-gray-500 text-sm">+</span>
                      )}
                      <input
                        type="number"
                        className={`w-20 text-center border rounded-md px-2 py-1 focus:ring-1 focus:ring-orange-400 ${operation === "Update Expenses" ? "pl-4" : ""}`}
                        value={expenses[i][weekIndex]}
                        onChange={(e) => handleExpenseChange(i, weekIndex, e.target.value)}
                      />
                    </div>
                  </td>
                ))}
                <td className="p-2 border font-semibold text-green-600">
                  ₹{calculateCategoryTotal(i)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md"
        >
          {operation}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Expenses;
