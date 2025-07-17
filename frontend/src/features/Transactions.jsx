import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import paidseal from "../Images/paidseal.png";

const defaultCategories = [
  'Groceries', 'Rents', 'Bills', 'Shoppings',
  'Chilling', 'Vehicles', 'Fees', 'Personal',
  'Recharge', 'Others'
];

export default function Transactions() {
  const [insight,setInsight]=useState("")
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [weekIndex, setWeek] = useState(0);
  const [month, setMonth] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);
   const [paymentshowForm, setPaymentShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("");
  const transactionsPerPage = 10;

  function getWeekIndexAndMonth(dateInput) {
    const date = new Date(dateInput);
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    let weekIndex = 0;
    if (dayOfMonth > 7 && dayOfMonth <= 14) weekIndex = 1;
    else if (dayOfMonth > 14 && dayOfMonth <= 21) weekIndex = 2;
    else if (dayOfMonth > 21) weekIndex = 3;

    return { weekIndex, month };
  }

  const todayTransactions = async () => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/payment/transactions",
        { date: today },
        { withCredentials: true }
      );
      setTransactions(res.data.data);
      setCurrentPage(1);
    } catch (err) {
      toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const dopayment = async () => {
    if (mode === "Cashless") {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/payment/createorder",
        { amount: amount * 100 },
        { withCredentials: true }
      );

      const order = res.data.data;
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: "rzp_test_W5q6dvRFx7DDty",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Finanlytic",
        description: "Transaction",
        handler: async (response) => {
          try {
            await axios.post(
              "https://finanlytic.onrender.com/api/v1/payment/verifypay",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                month,
                category,
                mode,
                amount,
                date: selectedDate,
                weekIndex
              },
              { withCredentials: true }
            );
            toast.success("Payment verified successfully");
            todayTransactions();
          } catch (err) {
            toast.error("Verification failed: " + (err.response?.data?.message || err.message));
          }
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } else {
      try {
        await axios.post(
          "https://finanlytic.onrender.com/api/v1/payment/cashpayment",
          {
            month,
            category,
            mode,
            amount,
            date: selectedDate,
            weekIndex
          },
          { withCredentials: true }
        );
        toast.success("Cash transaction added successfully");
        todayTransactions();
      } catch (err) {
        toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
      }
    }
  };


const updatepayment = async () => {

if(mode === "Cashless"){
  try {
        await axios.post(
          "https://finanlytic.onrender.com/api/v1/payment/onlinesavepayment",
          {
            month,
            category,
            mode,
            amount,
            date: selectedDate,
            weekIndex
          },
          { withCredentials: true }
        );
        toast.success("Transaction added successfully");
        todayTransactions();
      } catch (err) {
        toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
      }
}else{
  try {
        await axios.post(
          "https://finanlytic.onrender.com/api/v1/payment/cashpayment",
          {
            month,
            category,
            mode,
            amount,
            date: selectedDate,
            weekIndex
          },
          { withCredentials: true }
        );
        toast.success("Transaction added successfully");
        todayTransactions();
      } catch (err) {
        toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
      }
}

}


const costcutting = async () => {

   try {
    const res =    await axios.post(
          "https://finanlytic.onrender.com/api/v1/dashboard/suggestions",
          {},
          { withCredentials: true }
        );
        
        setInsight(res.data.data)
    
      } catch (err) {
        toast.error("Something went wrong: " + (err.response?.data?.message || err.message));
      }


}



  useEffect(() => {
    todayTransactions();
    costcutting()
  }, []);

  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 font-inter relative">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Transactions</h1>
        <div className="flex gap-2">
         <button
          onClick={() => setPaymentShowForm(true)}
          className="bg-orange-500  hover:bg-orange-600  text-white font-semibold px-4 py-2 rounded"
        >
          Do payment
        </button>
         <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500  hover:bg-orange-600  text-white font-semibold px-4 py-2 rounded"
        >
          Update Transactions
        </button>

        </div>
       
      </div>

      {paymentshowForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative"
          >
            <button
              onClick={() => setPaymentShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Transaction
              </h1>
              <motion.img
                src={paidseal}
                alt="Paid Seal"
                className="h-16 w-16 mt-2 sm:mt-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dopayment();
                setPaymentShowForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {defaultCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Mode
                </label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Cashless">Cashless</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  onChange={(e) => {
                    const { weekIndex, month } = getWeekIndexAndMonth(e.target.value);
                    setMonth(month);
                    setWeek(weekIndex);
                    setSelectedDate(e.target.value);
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  min={1}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
              >
                Pay
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}












      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Transaction
              </h1>
              <motion.img
                src={paidseal}
                alt="Paid Seal"
                className="h-16 w-16 mt-2 sm:mt-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatepayment()
                setShowForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {defaultCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Mode
                </label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Cashless">Cashless</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  onChange={(e) => {
                    const { weekIndex, month } = getWeekIndexAndMonth(e.target.value);
                    setMonth(month);
                    setWeek(weekIndex);
                    setSelectedDate(e.target.value);
                  }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  min={1}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition"
              >
                Update Transaction
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-orange-100 border  shadow-sm rounded-md">
          <thead className="bg-gray-100  dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Payment Mode</th>
              <th className="p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500  dark:bg-gray-800">
                  No transactions found today.
                </td>
              </tr>
            ) : (
              currentTransactions.map((txn, idx) => (
                <tr key={idx} className="border-t hover:bg-orange-50  dark:bg-gray-800">
                  <td className="p-2">{txn.category}</td>
                  <td className="p-2">{txn.dateofpurchase || "N/A"}</td>
                  <td className="p-2">{txn.mode || "N/A"}</td>
                  <td className={`p-2 ${txn.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
                    ₹{txn.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {transactions.length > transactionsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
           <div className="max-w-xl w-full md:w-1/2 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
                <h1 className="font-semibold">AI insight</h1>
               <p className="text-gray-700 dark:text-orange-100 font-bold">{insight}</p>
               </div>
    </motion.div>
  );
}
