import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

export default function DebtTracker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [takenOn, setTakenOn] = useState("");
  const [returnOn, setReturnOn] = useState("");
  const [debts, setDebts] = useState([]);
  const [debtStatus, setDebtStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status,setStatus] = useState(false)

  useEffect(() => {
    getDebts();
  }, []);

  async function submitDebt(e) {
    e.preventDefault();
    if (!name || !amount || !takenOn || !returnOn) {
      toast.warning("All fields are required!");
      return;
    }
    try {
      await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/adddebt",
        { name, amount, takenOn, returnOn },
        { withCredentials: true }
      );
      toast.success("Debt added successfully!");
      setName("");
      setAmount("");
      setTakenOn("");
      setReturnOn("");
      setShowForm(false);
      getDebts();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }

  async function getDebts() {
    try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/getdebt", {}, { withCredentials: true });
      setDebts(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }

  async function applyFilter() {
    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/filterdebt",
        { status: debtStatus },
        { withCredentials: true }
      );
      setDebts(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }

  async function deleteDebt(name) {
    try {
      await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/deletedebt",
        { name },
        { withCredentials: true }
      );
      toast.success("Debt deleted");
      getDebts();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="p-5 font-inter min-h-screen flex justify-center items-start bg-gray-50">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Debt Tracker</h1>

          <div className="flex gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <input
              type="text"
              placeholder="Search by name"
              className="border px-3 py-2 rounded w-full sm:w-80"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setDebts(prev =>
                  prev.filter(d => d.name.toLowerCase().includes(searchTerm))
                );
              }}
            />
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Debt
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-4 flex-wrap">
          <select
            value={debtStatus}
            onChange={(e) => setDebtStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <button
            onClick={applyFilter}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Apply Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 rounded">
              <tr>
                <th className="text-left p-2">Select</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Taken On</th>
                <th className="text-left p-2">Return On</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {debts.length > 0 ? (
                debts.map((debt, index) => (
                  <motion.tr
                    key={index}
                    className="bg-white shadow-sm rounded-lg mb-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="p-2">
                      <input type="checkbox" value={status} onChange={async(e)=>{  setStatus(e.target.value)
                             await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/updatedebt",{
                              paid:status,id:debt._id
                             },{withCredentials:true})
                      }} />
                    </td>
                    <td className="p-2">{debt.name}</td>
                    <td className="p-2">₹{debt.amount}</td>
                    <td className="p-2">{new Date(debt.takenOn).toLocaleDateString()}</td>
                    <td className="p-2">{new Date(debt.returnOn).toLocaleDateString()}</td>
                    <td className="p-2">{debt.paid ? "Paid" : "Unpaid"}</td>
                    <td className="p-2">
                      <button
                        onClick={() => deleteDebt(debt.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">No debts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Debt Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Add Your Debt</h2>
            <form onSubmit={submitDebt} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name or Organization</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Divyanshu"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Taken On</label>
                <input
                  type="date"
                  value={takenOn}
                  onChange={(e) => setTakenOn(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Return On</label>
                <input
                  type="date"
                  value={returnOn}
                  onChange={(e) => setReturnOn(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}


  /*
    <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black/40 rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">Add Your Debts</h2>

          <form onSubmit={submitdebt} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Name or Organization</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Divyanshu"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Taken On</label>
              <input
                type="date"
                name="takenOn"
                value={takenOn}
                onChange={(e) => setTakenOn(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Return On</label>
              <input
                type="date"
                name="returnOn"
                value={returnOn}
                onChange={(e) => setReturnOn(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-orange-500"
              />
            </div>

            <div className="sm:col-span-2 flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 transition duration-200"
              >
                Add Debt
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
  
  
  
  
  
  
  
  */ 