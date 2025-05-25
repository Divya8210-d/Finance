import axios from 'axios';
import React, { useState } from 'react';

const defaultCategories = [
  'Grocery',
  'Shopping',
  'Utilities',
  'Transport',
  'Healthcare',
  'Entertainment',
  'Dining Out',
  'Education',
  'Savings',
  'Others'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Expenses = () => {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState(
    defaultCategories.map(() => [0, 0, 0, 0])
  );

  const handleExpenseChange = (categoryIndex, weekIndex, value) => {
    const newExpenses = [...expenses];
    newExpenses[categoryIndex][weekIndex] = Number(value);
    setExpenses(newExpenses);
  };

  const calculateCategoryTotal = (categoryIndex) => {
    return expenses[categoryIndex].reduce((acc, curr) => acc + curr, 0);
  };

const categorydata= defaultCategories.map((category, i) => ({
        category:{ weekly: expenses[i],
        monthlytotal: calculateCategoryTotal(i)}
       
      }))





  const handleAdding = async () => {
    const expenseData = {
      month,
      monthlyincome: Number(income),
 categorydata
    };

   

 await  axios.post("http://localhost:5000/api/v1/users/expenses",expenseData, {withCredentials: true} )
  .then((res)=>{
          alert("Added expenses")
setExpenses( defaultCategories.map(() => [0, 0, 0, 0]))
setIncome('')
setMonth('')



  }).catch((err)=>{
    const message = err.response?.data?.message || "An unknown error occurred";
    console.error("Adding error:", message);
    alert(message);
  }) 
  };


  const handleUpdating = async () => {
    const expenseData = {
      month,
      monthlyincome: Number(income),
    categorydata
    };


 await  axios.post("http://localhost:5000/api/v1/users/updateexpenses",expenseData, {withCredentials: true} )
  .then((res)=>{
          alert("Updated expenses")
setExpenses( defaultCategories.map(() => [0, 0, 0, 0]))
setIncome('')
setMonth('')




  }).catch((err)=>{
    const message = err.response?.data?.message || "An unknown error occurred";
    console.error("Updating error:", message);
    alert(message);
  }) 
  };












  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Monthly Expenses Tracker</h1>

      {/* Month Selector */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <label className="block mb-1 font-medium">Select Month:</label>
          <select
            className="border rounded px-3 py-2"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">-- Select Month --</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block mb-1 font-medium">Monthly Income:</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter income"
          />
        </div>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border mt-4 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Category</th>
              <th className="border p-2">Week 1</th>
              <th className="border p-2">Week 2</th>
              <th className="border p-2">Week 3</th>
              <th className="border p-2">Week 4</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {defaultCategories.map((category, i) => (
              <tr key={category}>
                <td className="border p-2 font-medium">{category}</td>
                {[0, 1, 2, 3].map((weekIndex) => (
                  <td className="border p-2" key={weekIndex}>
                    <input
                      type="number"
                        
                    
                      className="w-20 border rounded px-2 py-1"
                      value={expenses[i][weekIndex]}
                      onChange={(e) =>
                        handleExpenseChange(i, weekIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td className="border p-2 font-semibold">
                  ₹{calculateCategoryTotal(i)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Button */}
      <div className="text-center flex gap-4 justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          onClick={handleAdding}
        >
          Add Expenses
        </button>
                <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          onClick={handleUpdating}
        >
          Update Expenses
        </button>
      </div>
    </div>
  );
};

export default Expenses;
