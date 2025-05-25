import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Transactions() {

  const [amount,setAmount]=useState(0)
   const [category,setCategory]=useState("")
  const [weekIndex,setWeek]=useState(0)
  const [month,setMonth]=useState("")


  function getWeekIndexAndMonth(dateInput) {
  const date = new Date(dateInput); // Accepts string or Date object

  const dayOfMonth = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // e.g., "May"
  // const month = date.getMonth() + 1; // Optional: numerical month (1–12)

  // Determine week index (0-based)
  let weekIndex = 0;
  if (dayOfMonth > 7 && dayOfMonth <= 14) weekIndex = 1;
  else if (dayOfMonth > 14 && dayOfMonth <= 21) weekIndex = 2;
  else if (dayOfMonth > 21) weekIndex = 3;

  return { weekIndex, month };
}

const handlePayment = async (e) => {
  e.preventDefault()
  const finalamount = parseInt(amount) * 100;

  try {
    // Step 1: Create order from backend
    const { data } = await axios.post("http://localhost:5000/api/v1/createorder", { amount },{ withCredentials: true });

    const { id: order_id, currency } = data.data; // assuming ApiResponse format

    // Step 2: Open Razorpay Checkout
    const options = {
      key:"rzp_test_W5q6dvRFx7DDty", // frontend Razorpay key
     amount: finalamount,
      currency,
      order_id,
      name: "Expense Tracker",
      description: "Payment",
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
console.log(response)
        // Step 3: Verify and save payment
        const verifyRes = await axios.post("http://localhost:5000/api/v1/verifypay", {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
           amount: parseInt(amount),
          category,
          weekIndex,
          month
        },{ withCredentials: true });

        alert(verifyRes.data.data || "Payment successful!");
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error", error);
    alert("Payment failed. Please try again.");
  }
};













  return (
    <div className="p-4 max-w-md text-left">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Input Section */}
      <form onSubmit={handlePayment}>
      <div className="space-y-2 mb-6">
<select
  className="w-full p-2 border rounded"
  value={category}
  onChange={(e) => {setCategory(e.target.value)}}
>
  <option value="">Select Category</option>
  <option value="groceries">Groceries</option>
  <option value="rents">Rents</option>
  <option value="bills">Bills</option>
  <option value="shoppings">Shoppings</option>
  <option value="chilling">Chilling</option>
  <option value="vehicles">Vehicles</option>
  <option value="fees">Fees</option>
  <option value="personal">Personal</option>
  <option value="recharge">Recharge</option>
  <option value="others">Others</option>
</select>

        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={(e) => {  const { weekIndex, month } = getWeekIndexAndMonth(e.target.value)
                                   setMonth(month)
                                  setWeek(weekIndex)}}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          onChange={(e) => {setAmount(e.target.value)}}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        
        >
          Add
        </button>
      </div></form>

      {/* Filter Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Filter</h2>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => {}}
          >
            Last 24 Hours
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => {}}
          >
            Last 7 Days
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => {}}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <ul className="space-y-2">
          {/* Example transaction item */}
          <li className="p-2 border rounded flex flex-col text-sm">
            <span><strong>Category:</strong> Shopping</span>
            <span><strong>Date:</strong> 2025-05-20</span>
            <span><strong>Amount:</strong> $50.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
