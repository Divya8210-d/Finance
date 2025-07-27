import React, { useState } from "react";
import { toast } from "react-toastify";

export default function MutualFunds({ onClose }) {
  const [fundName, setFundName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const newFund = {
      fundName,
      investmentAmount,
      investmentDate,
      
    
    };

     try {
          const res = await axios.post(
            "https://finanlytic.onrender.com/api/v1/dashboard/savemutualfunds",
            newFund,
            { withCredentials: true }
          );
          toast.success("Mutual funds saved")
          
         
    
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }

    // Optionally reset fields or close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Mutual Fund Tracker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fund Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Fund Name</label>
            <input
              type="text"
              value={fundName}
              required
              onChange={(e) => setFundName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none dark:bg-gray-700"
              placeholder="e.g. Axis Bluechip Fund"
            />
          </div>

          {/* Investment Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Investment Amount (₹)</label>
            <input
              type="number"
              value={investmentAmount}
              required
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 10000"
            />
          </div>

          {/* Investment Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Investment Date</label>
            <input
              type="date"
              value={investmentDate}
              required
              onChange={(e) => setInvestmentDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

      

          {/* Notes (optional) */}
        

          {/* Buttons */}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
