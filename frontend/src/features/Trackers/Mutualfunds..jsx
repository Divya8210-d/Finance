import React, { useState } from "react";

export default function MutualFunds({ onClose }) {
  const [fundName, setFundName] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can call API or update state here
    const newFund = {
      fundName,
      investmentAmount,
      investmentDate,
      currentValue,
      notes,
    };

    console.log("Submitted Fund:", newFund);

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
          <div>
            <label className="block text-sm font-medium mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="SIP details, exit load info, etc."
            />
          </div>

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
