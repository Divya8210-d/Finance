import React, { useState } from "react";

export default function Crypto({ onClose }) {
  const [cryptoName, setCryptoName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCrypto = {
      cryptoName,
      symbol,
      quantity,
      purchasePrice,
      purchaseDate,
      notes,
    };

    console.log("Submitted Crypto Asset:", newCrypto);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Crypto Asset Tracker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cryptocurrency Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Cryptocurrency Name</label>
            <input
              type="text"
              value={cryptoName}
              required
              onChange={(e) => setCryptoName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. Bitcoin"
            />
          </div>

          {/* Symbol */}
          <div>
            <label className="block text-sm font-medium mb-1">Symbol</label>
            <input
              type="text"
              value={symbol}
              required
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. BTC"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 0.5"
              step="any"
            />
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Purchase Price (₹ or $)</label>
            <input
              type="number"
              value={purchasePrice}
              required
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="e.g. 30000"
              step="any"
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
          <div>
            <label className="block text-sm font-medium mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="Wallet used, exchange info, etc."
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
