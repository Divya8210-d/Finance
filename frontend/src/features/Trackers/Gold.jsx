import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Gold({ onClose }) {
  const [goldType, setGoldType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerGram, setPricePerGram] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const newGold = {
      goldType,
      quantity,
     Pricepergram: pricePerGram,
      purchaseDate,
      
    };

     try {
              const res = await axios.post(
                "https://finanlytic.onrender.com/api/v1/dashboard/savegold",
                newGold,
                { withCredentials: true }
              );
              toast.success("Gold investment saved")
              
             
        
            } catch (error) {
             
            }

  

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Gold Asset Tracker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Gold Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Gold Type</label>
            <select
              value={goldType}
              onChange={(e) => setGoldType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              required
            >
              <option value="">Select Type</option>
              <option value="24K">24 Karat</option>
              <option value="22K">22 Karat</option>
              <option value="ETF">Gold ETF</option>
              <option value="Digital">Digital Gold</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity (in grams)</label>
            <input
              type="number"
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 10"
            />
          </div>

          {/* Price per gram */}
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Price per Gram (₹)</label>
            <input
              type="number"
              value={pricePerGram}
              required
              onChange={(e) => setPricePerGram(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 5800"
            />
          </div>

          {/* Purchase Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              required
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>

          {/* Notes */}
         

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
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
