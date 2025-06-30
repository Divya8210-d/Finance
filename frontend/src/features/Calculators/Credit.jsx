import axios from "axios";
import React, { useState } from "react";

export default function Credit({ onClose }) {
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [minimumMonthlyPayment, setMinimumMonthlyPayment] = useState(0);
  const [fixedMonthlyPayment, setFixedMonthlyPayment] = useState(0);
  const [monthlyPaymentType, setMonthlyPaymentType] = useState("minimum");

  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = {
      outstandingBalance: parseFloat(outstandingBalance),
      annualInterestRate: parseFloat(annualInterestRate),
      monthlyPaymentType,
      minimumMonthlyPayment,
  
      fixedMonthlyPayment
    };

    try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/credit", Data, {
        withCredentials: true,
      });

      if (res.data?.data) {
        setResult(res.data.data);
      } else {
        setResult("Unable to calculate. Invalid response.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.error("Calculation error:", message);
      setResult(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-center">
          Credit Card Payoff Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Outstanding Balance</label>
            <input
              type="number"
              value={outstandingBalance}
              required
              onChange={(e) => setOutstandingBalance(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="Enter your outstanding balance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={annualInterestRate}
              required
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="E.g., 18"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monthly Payment Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="minimum"
                  checked={monthlyPaymentType === "Minimum"}
                  onChange={() => setMonthlyPaymentType("Minimum")}
                />
                Minimum
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="fixed"
                  checked={monthlyPaymentType === "Fixed"}
                  onChange={() => setMonthlyPaymentType("Fixed")}
                />
                Fixed
              </label>
            </div>
          </div>

          {monthlyPaymentType === "Minimum" && (
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Monthly Payment</label>
              <input
                type="number"
                value={minimumMonthlyPayment}
                required
                onChange={(e) => setMinimumMonthlyPayment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                placeholder="Enter minimum payment"
              />
            </div>
          )}

          {monthlyPaymentType === "Fixed" && (
            <div>
              <label className="block text-sm font-medium mb-1">Fixed Monthly Payment</label>
              <input
                type="number"
                value={fixedMonthlyPayment}
                required
                onChange={(e) => setFixedMonthlyPayment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                placeholder="Enter fixed payment"
              />
            </div>
          )}

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

        {result && typeof result === "object" ? (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm dark:bg-green-800 dark:text-white">
            <p><strong>Months to Payoff:</strong> {result.monthsToPayoff}</p>
            <p><strong>Total Interest Paid:</strong> ₹{result.totalInterestPaid}</p>
            <p><strong>Total Amount Paid:</strong> ₹{result.totalAmountPaid}</p>
            <p><strong>Monthly Payment:</strong> ₹{result.monthlyPayment}</p>
          </div>
        ) : (
          result && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg shadow-sm dark:bg-red-800 dark:text-white">
              {result}
            </div>
          )
        )}
      </div>
    </div>
  );
}
