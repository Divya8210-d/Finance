import axios from "axios";
import React, { useState } from "react";

export default function EMI({ onClose }) {
  const [loanamount, setAmount] = useState();
  const [rate, setRate] = useState();
  const [tenure, setTenure] = useState();

  const [emi, setEMI] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = { loanamount, rate, tenure,  };

    try {
      const res = await axios.post("http://localhost:5000/api/v1/dashboard/emi", Data, {
        withCredentials: true,
      });
      const result = res.data?.data;

      if (result !== undefined) {
        setEMI(result);
      } else {
        setEMI("Unable to calculate. Invalid response.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.log("Calculating error", message);
      setEMI(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-center">Personal loan EMI Calculator</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Loan Amount</label>
            <input
              type="text"
              value={loanamount}
              required
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700"
              placeholder="What is the loan amount?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Interest Rate</label>
            <input
              type="text"
              value={rate}
              required
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700"
              placeholder="Interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tenure</label>
            <input
              type="text"
              value={tenure}
              required
              onChange={(e) => setTenure(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700"
              placeholder="What is the tenure of loan? (in years)"
            />
          </div>


          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>
        </form>

        {/* Result Display */}
        {emi && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm text-center dark:bg-green-800 dark:text-white">
            <strong>EMI:</strong> ₹{emi}
          </div>
        )}
      </div>
    </div>
  );
}
