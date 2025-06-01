import React, { useEffect, useState } from "react";
import axios from "axios";
import Debtlogo from "../Images/Debtlogo.png";
import { motion } from "framer-motion"; // Import Framer Motion
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function DebtTracker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [takenOn, setTakenOn] = useState();
  const [returnOn, setReturnOn] = useState();
  const [debts,setDebts]= useState([])



  async function submitdebt(e) {
    e.preventDefault();

    const submitdata = {
      name,
      amount,
      takenOn,
      returnOn,
    };

    if (name === '' || amount === ''||takenOn===""||returnOn==="") {
      toast.warning("Detail fields are required!!");
      return;
    }




    await axios
      .post("https://finanlytic.onrender.com/api/v1/dashboard/adddebt", submitdata, { withCredentials: true })
      .then((res) => {
            toast.success("Your Debt was updated!!");
        setAmount(0);
        setName("");
        setReturnOn(0);
        setTakenOn(0);
        getdebts()
      })
      .catch((err) => {
        toast.error( err.response?.data?.message || err.message);
      });


      
  }

async function getdebts(params) {



  await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/getdebt",{},{withCredentials:true})
  .then((res)=>{
    setDebts(res.data.data)
  }).catch((err)=>{
    toast.error(err.response?.data?.message)
    
  })
}



useEffect(()=>{
  getdebts()
},[])





  return (
    <div className="mx-auto p-5 font-inter">
      {/* Top Heading */}
      <ToastContainer position="top-center"/>
      <motion.div
        className="mb-6 flex flex-col"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Debt Tracker</h1>
        <hr className="w-full border-t-1 border-gray-300" />
      </motion.div>

      {/* Quote Box */}
      <motion.div
        className="bg-orange-100 border border-orange-300  rounded-md p-4 text-center max-w-5xl mx-auto mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="italic">
          “There are three kinds of people: the haves, the have-nots, and the have-not-paid-for-what-they-haves.”
        </p>
        <p>You choose to decide what kind of person you want to be so choose wisely.</p>
      </motion.div>

      {/* Add Debt Form */}
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Add Your Debts</h2>

          <form onSubmit={submitdebt} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name or Organization</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Divyanshu"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Taken On</label>
              <input
                type="date"
                name="takenOn"
                value={takenOn}
                onChange={(e) => setTakenOn(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Return On</label>
              <input
                type="date"
                name="returnOn"
                value={returnOn}
                onChange={(e) => setReturnOn(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-100"
              />
            </div>

            <div className="sm:col-span-2 flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
              >
                Add Debt
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>








<div className="w-full max-w-4xl mx-auto   mt-8">
  {debts.length > 0 ? (
    debts.map((debt, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className=" rounded-xl shadow-md p-5 border hover:shadow-lg transition mb-2"  style={{
    backgroundColor: debt.paid ? "lightgreen" : "white"
  }}
      >
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{debt.name}</h3>
          <p className="text-sm text-gray-600">Amount: ₹{debt.amount}</p>
          <p className="text-sm text-gray-600">Taken On: {new Date(debt.takenOn).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2 mt-3">
       <input
  type="checkbox"
  checked={debt.paid}
  onChange={async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/updatedebt",
        { name: debt.name, paid: !debt.paid ,amount:debt.amount},
        { withCredentials: true }
      );
      getdebts(); 
    } catch (err) {
      console.log("Debt updating error:", err.response?.data?.message || err.message);
    }
  }}
  className="w-4 h-4"
/>
          <span className="text-sm text-gray-700">
            {debt.paid ? "Paid" : "Unpaid"}
          </span>
        </div>
      </motion.div>
    ))
  ) : (
    <p className="col-span-2 text-center text-gray-600">No debts found.</p>
  )}
</div>










      {/* Logo - Centered and Animated */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <img src={Debtlogo} alt="Debt Logo" className="w-32 h-auto" />
      </motion.div>
    </div>
  );
}
