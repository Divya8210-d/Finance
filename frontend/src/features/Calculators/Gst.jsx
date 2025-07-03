import axios from "axios";
import React, { useState } from "react";

export default function Gst({ onClose }) {
  const [amount, setAmount] = useState("");
  const [gstrate, setRate] = useState("18");
  const [type, setType] = useState("exclusive");
  const [gstamount, setGstAmount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = { amount, gstrate, type };

    try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/gst", Data, {
        withCredentials: true,
      });
      const result = res.data?.data;

      if (result !== undefined) {
        setGstAmount(result);
      } else {
        setGstAmount("Unable to calculate. Invalid response.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.log("Calculating error", message);
      setGstAmount(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-center">GST Amount Calculator</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount input */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700"
              placeholder="Enter the amount"
            />
          </div>

          {/* GST Rate Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">GST Rate</label>
            <select
              value={gstrate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          {/* Inclusive/Exclusive Radio */}
          <div>
            <label className="block text-sm font-medium mb-1">GST Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="exclusive"
                  checked={type === "Exclusive"}
                  onChange={() => setType("Exclusive")}
                />
                Exclusive
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="inclusive"
                  checked={type === "Inclusive"}
                  onChange={() => setType("Inclusive")}
                />
                Inclusive
              </label>
            </div>
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
              Calculate
            </button>
          </div>
        </form>

        {/* Result Display */}
        {gstamount && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm text-center dark:bg-green-800 dark:text-white">
            <strong>GST Amount:</strong> ₹{gstamount}
          </div>
        )}
      </div>
    </div>
  );
}
