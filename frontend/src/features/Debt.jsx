import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DebtTracker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [takenOn, setTakenOn] = useState("");
  const [returnOn, setReturnOn] = useState("");
  const [debts, setDebts] = useState([]);
  const [debtStatus, setDebtStatus] = useState("");
  const [amountFilter, setAmountFilter] = useState("");

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
        { status: debtStatus, amount: amountFilter },
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
    <div className="p-5 font-inter bg-white min-h-screen">
      <ToastContainer position="top-center" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Debt Tracker</h1>
        <button
          onClick={submitDebt}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Debt
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-3 py-2 rounded w-full sm:w-1/2"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setDebts(prev => prev.filter(d => d.name.toLowerCase().includes(searchTerm)));
          }}
        />
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

        <input
          type="number"
          placeholder="Max Amount"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={applyFilter}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Taken On</th>
              <th className="border p-2">Return On</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {debts.length > 0 ? (
              debts.map((debt, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{debt.name}</td>
                  <td className="border p-2">₹{debt.amount}</td>
                  <td className="border p-2">{new Date(debt.takenOn).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(debt.returnOn).toLocaleDateString()}</td>
                  <td className="border p-2">{debt.paid ? "Paid" : "Unpaid"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteDebt(debt.name)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">No debts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
