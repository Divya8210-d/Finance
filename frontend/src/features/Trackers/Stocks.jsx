import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Stock({ onClose }) {
  const [stockSymbol, setStockSymbol] = useState("");
  const [numberOfShares, setNumberOfShares] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");


  const handleSubmit =  async (e) => {
    e.preventDefault();

    const newStock = {
     stocksymbol :stockSymbol,
      numberOfShares,
     buyprice: buyPrice,
      purchaseDate,
      
    };
       try {
              const res = await axios.post(
                "https://finanlytic.onrender.com/api/v1/dashboard/savestocks",
                newStock,
                { withCredentials: true }
              );
              toast.success("Stocks saved")
              
             
        
            } catch (error) {
              toast.error(error.response?.data?.message || "Something went wrong");
            }

  

    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Stock Tracker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Stock Symbol */}
          <div>
            <label className="block text-sm font-medium mb-1">Stock Symbol</label>
            <input
              type="text"
              value={stockSymbol}
              required
              onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. TCS"
            />
          </div>

          {/* Number of Shares */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Shares</label>
            <input
              type="number"
              value={numberOfShares}
              required
              onChange={(e) => setNumberOfShares(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 10"
            />
          </div>

          {/* Buy Price per Share */}
          <div>
            <label className="block text-sm font-medium mb-1">Buy Price (per share ₹)</label>
            <input
              type="number"
              value={buyPrice}
              required
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 3500"
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
