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
  const [expenses, setExpenses] = useState(
    defaultCategories.map(() => [0, 0, 0, 0])
  );
  const [operation, setOperation] = useState("Add Expenses");

  
  // Budget Goal States
  const [budgetMonth, setBudgetMonth] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [categoryAllocations, setCategoryAllocations] = useState(
    defaultCategories.map(() => ({ amount: "", priority: 0 }))
  );
  const [savingTarget, setSavingTarget] = useState("");
  const [description, setDescription] = useState("");

  // Income Bifurcation States
  const [cash, setCash] = useState("");
  const [cashless, setCashless] = useState("");
  const [assets, setAssets] = useState("");
    const [cashinhand,setCashinHand] = useState();

  const handleExpenseChange = (categoryIndex, weekIndex, value) => {
    const newExpenses = [...expenses];
    newExpenses[categoryIndex][weekIndex] = Number(value);
    setExpenses(newExpenses);
  };

  const handleCategoryAllocationChange = (index, field, value) => {
    const updated = [...categoryAllocations];
    updated[index][field] = value;
    setCategoryAllocations(updated);
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

    const categoryFields = {};
    defaultCategories.forEach((cat, i) => {
      categoryFields[cat] = {
        weekly: expenses[i],
        monthlyTotal: calculateCategoryTotal(i),
      };
    });

    const expenseData = {
      month,
      cashinhand,
      cash,
      cashless,
      assets,
      monthlyincome: Number(income),
      ...categoryFields,
    };

    const url =
      operation === "Add Expenses"
        ? "https://finanlytic.onrender.com/api/v1/dashboard/expenses"
        : "https://finanlytic.onrender.com/api/v1/dashboard/updateexpenses";

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


const budgetsave = async () => {

   try {
     const budget ={
       savingtarget:savingTarget ,
     monthlybudget:budgetAmount,
      description,
     month:  budgetMonth,
     ...categoryAllocations
     
     }
    
     axios.post("https://finanlytic.onrender.com/api/v1/dashboard/setbudget",budget,{withCredentials:true})
 toast.success("Budget is saved");

   } catch (error) {
    const message =
        err.response?.data?.message || "Something went wrong";
      toast.error(message);
   }


  
}




  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 max-w-7xl mx-auto font-inter text-gray-800 dark:text-gray-200"
    >
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-extrabold text-center mb-6">
        Monthly Expenses Tracker
      </h1>

      {/* Input Controls */}
      <div className="grid md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-700 mb-6 w-full">
        <div>
          <label className="block mb-1 font-semibold">Changes</label>
          <select
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="Add Expenses">Add Expenses</option>
            <option value="Update Expenses">Update Expenses</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Select Month</label>
          <select
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Choose Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Monthly Income (₹)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Your Income"
          />
        </div>
      </div>

     {/*income bifurcation */}

     
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.1, duration: 0.6 }}
  className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-700"
>
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
    💰 Income Bifurcation
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
   <div>
      <label className="font-semibold">CashinHand (₹)</label>
      <input
        type="number"
        value={cashinhand}
        onChange={(e)=>{
                 setCashinHand(e.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        placeholder="Cash amount"
      />
    </div>
    <div>
      <label className="font-semibold">Cash (₹)</label>
      <input
        type="number"
          value={cash}
        onChange={(e)=>{
                 setCash(e.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        placeholder="Cash amount"
      />
    </div>
    <div>
      <label className="font-semibold">Cashless (UPI/Card) (₹)</label>
      <input
        type="number"
          value={cashless}
        onChange={(e)=>{
                 setCashless(e.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        placeholder="Cashless amount"
      />
    </div>
    <div>
      <label className="font-semibold">Other Assets (₹)</label>
      <input
        type="number"
          value={assets}
        onChange={(e)=>{
                 setAssets(e.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        placeholder="Other assets"
      />
    </div>
  </div>


</motion.div>







      {/* Expenses Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 w-full">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-orange-100 dark:bg-orange-800 text-gray-900 dark:text-orange-100 text-base">
            <tr>
              <th className="p-3">Category</th>
              <th className="p-3">Week 1</th>
              <th className="p-3">Week 2</th>
              <th className="p-3">Week 3</th>
              <th className="p-3">Week 4</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {defaultCategories.map((category, i) => (
              <tr key={category} className="hover:bg-orange-50 dark:hover:bg-orange-900">
                <td className="p-3 font-medium">{category}</td>
                {[0, 1, 2, 3].map((weekIndex) => (
                  <td key={weekIndex} className="p-2">
                    <input
                      type="number"
                      className="w-20 text-center border rounded-md px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
                      value={expenses[i][weekIndex]}
                      onChange={(e) => handleExpenseChange(i, weekIndex, e.target.value)}
                    />
                  </td>
                ))}
                <td className="p-2 font-semibold text-green-600 dark:text-green-400">
                  ₹{calculateCategoryTotal(i)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md dark:shadow-orange-700"
        >
          {operation}
        </motion.button>
      </div>





      {/* Include budget goal and bifurcation sections */}
      {/* Paste the modified budget and bifurcation JSX from the previous answer here */}
      {/* Budget Goal Setting */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.6 }}
  className="mt-10 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 dark:from-orange-900 dark:via-orange-800 dark:to-orange-900 p-6 rounded-xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-4 text-center text-orange-700 dark:text-orange-300">
    🎯 Set Your Budget Goal
  </h2>

  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <label className="font-semibold">Month</label>
      <select
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        value={budgetMonth}
        onChange={(e) => setBudgetMonth(e.target.value)}
      >
        <option value="">Choose Month</option>
        {months.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="font-semibold">Total Monthly Budget (₹)</label>
      <input
        type="number"
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
        placeholder="Total Budget"
      />
    </div>
  </div>

  {/* Category Allocations */}
  <div className="mt-6">
    <h3 className="font-semibold mb-3 text-lg">Category Allocations</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {defaultCategories.map((cat, idx) => (
        <div key={cat} className="flex flex-wrap items-center gap-3">
          <span className="w-28 font-medium">{cat}</span>
          <input
            type="number"
            placeholder="₹ Amount"
            className="w-32 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
            value={categoryAllocations[idx].amount}
            onChange={(e) => handleCategoryAllocationChange(idx, "amount", e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Priority"
            className="w-28 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
            value={categoryAllocations[idx].priority}
            onChange={(e) => handleCategoryAllocationChange(idx, "priority", e.target.value)}
          />
        </div>
      ))}
    </div>
  </div>

  {/* Savings and Description */}
  <div className="grid md:grid-cols-2 gap-4 mt-6">
    <div>
      <label className="font-semibold">Saving Target (₹)</label>
      <input
        type="number"
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        value={savingTarget}
        onChange={(e) => setSavingTarget(e.target.value)}
        placeholder="Savings target"
      />
    </div>
    <div>
      <label className="font-semibold">Description (optional)</label>
      <textarea
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-gray-200"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your budget plan..."
      ></textarea>
    </div>
  </div>

  {/* Set Budget Button */}
  <div className="text-center mt-6">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={budgetsave}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md dark:shadow-green-700"
    >
      Set Budget
    </motion.button>
  </div>
</motion.div>

{/* Monthly Income Bifurcation */}

    </motion.div>
  );
};

export default Expenses;
