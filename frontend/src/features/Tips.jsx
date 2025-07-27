import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router";
import MutualFunds from "./Trackers/Mutualfunds.";
import Stock from "./Trackers/Stocks";
import Gold from "./Trackers/Gold";
import Crypto from "./Trackers/Crypto";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function InvestmentTips() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [classification, setClassification] = useState();
  const [tips, setTips] = useState([]);

  const location = useLocation();
  const navigate = useNavigate(); 

  const ismutualfunds = location.pathname.endsWith("/mutualfunds");
  const isstocks = location.pathname.endsWith("/stocks");
  const isgold = location.pathname.endsWith("/gold");
  const iscrypto = location.pathname.endsWith("/crypto");


 const closeModal = () => navigate("/Dashboard/Tips");


  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const unanswered = questions.find((q) => !answers[q.key]);
    if (unanswered) {
      toast.error(`"${unanswered.q}" is required`);
      return;
    }

    console.log("Submitted Answers:", answers);
    try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/tips", answers, {
        withCredentials: true,
      });
      setClassification(res.data.data.classification);
      setTips(res.data.data.tips);
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
    
      toast.error(message);
    }
  };

  const questions = [
    {
      key: "age",
      q: "What's your age?",
      input: (key) => (
        <input
          type="number"
          name={key}
          value={answers[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="mt-2 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      ),
    },
    {
      key: "dependents",
      q: "Do you have dependents?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["1", "2", "3", "4", "5", "More than 5"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "goal",
      q: "What's your primary goal for investing?",
      input: (key) => (
        <input
          type="text"
          name={key}
          value={answers[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="mt-2 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      ),
    },
    {
      key: "risktolerance",
      q: "What's your risk tolerance?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {[1, 2, 3, 4, 5].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === String(val)}
                onChange={() => handleChange(key, String(val))}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "monthlyInvestmentCapacity",
      q: "What percentage of your income are you able to invest monthly?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["0-10", "10-20", "20-30", "30-40", "40-50", "Greater than 50"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "pastinvestments",
      q: "Have you invested before?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Yes", "No"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "longTermLockInComfort",
      q: "Would you be okay if your money is locked for 5-10 years?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Yes", "No"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "importance",
      q: "What's more important to you?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Avoiding losses", "Balanced growth", "Maximizing returns"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "returnpreference",
      q: "Do you want regular returns or is long term growth more important to you?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["Regular return", "Long term growth"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
    {
      key: "investmentHorizon",
      q: "When do you expect to need the money you are investing?",
      input: (key) => (
        <div className="mt-2 space-y-1">
          {["< 1 yr", "2 yr", "3 yr", "4 yr", "5 yr", "More than 5 yrs"].map((val) => (
            <label key={val} className="block">
              <input
                type="radio"
                name={key}
                value={val}
                checked={answers[key] === val}
                onChange={() => handleChange(key, val)}
                className="mr-2"
              />
              {val}
            </label>
          ))}
        </div>
      ),
    },
  ];
const [mutualFundsData, setMutualFundsData] = useState([]);//importnat array of mutual funds backend se le aaye abb uspe map laga ke display kardenge
const [goldData, setGoldData] = useState([]);
const [stocksData,setStocksData] =useState([]);
const [cryptoData,setCryptoData]=useState([])
const [mutualchart,setmutualchart] = useState([])
const [stockchart,setstockchart] = useState([])
const [goldchart,setgoldchart] = useState([])
const [cryptochart,setcryptochart] = useState([])

  const getmutualfunds = async () => {
     try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/mutualfunds", {}, {
        withCredentials: true,
      });
     setMutualFundsData(res.data.data)
     const chartdata = res.data.data.map((fund)=>{//direct res.data.data par map lagaya kyunki  utual fund data asycnromously update ho ga to empty bhi hosakta hai
      return {
       fundName: fund.fundName,
       CurrentValue:fund.CurrentValue
      }
        
     })

     setmutualchart(chartdata)
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
    
      toast.error(message);
    }
  }
    const getstocks = async () => {
      try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/stocks", {}, {
        withCredentials: true,
      });
       setStocksData(res.data.data)
         const chartdata = res.data.data.map((stock)=>{
      return {
       StockSymbol: stock.stocksymbol,
       CurrentValue:stock.currentValue
      }
        
     })

     setstockchart(chartdata)
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
    
      toast.error(message);
    }
  }
    const getgolds = async () => {
      try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/golds", {}, {
        withCredentials: true,
      });
       setGoldData(res.data.data)
         const chartdata = res.data.data.map((gold)=>{
      return {
       GoldType: gold.goldType,
       CurrentValue:gold.currentValue
      }
        
     })

     setgoldchart(chartdata)
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
    
      toast.error(message);
    }
  }
    const getcrypto = async () => {
      try {
      const res = await axios.post("https://finanlytic.onrender.com/api/v1/dashboard/crypto", {}, {
        withCredentials: true,
      });
        setCryptoData(res.data.data)
          const chartdata = res.data.data.map((crypto)=>{
      return {
       CryptoName: crypto.cryptoname,
       CurrentValue:crypto.currentValue
      }
        
     })

     setcryptochart(chartdata)
     
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
    
      toast.error(message);
    }
  }


  useEffect(()=>{
    getmutualfunds()
    getgolds()
    getstocks()
    getcrypto()
  })
  return (
    <div className="p-6 pl-10 text-gray-800 dark:text-gray-200 text-left font-inter">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Investments
      </motion.h1>

      <hr className="mb-6 border-gray-300 dark:border-gray-600" />

      <motion.div
        className="flex gap-16 ml-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
<div className="p-8 mb-6 rounded-lg bg-green-300 font-inter font-bold shadow-lg hover:cursor-pointer hover:scale-105 transform transition duration-300 dark:text-white"
  onClick={()=>{
    navigate("mutualfunds")
  }}>
  Mutual funds Tracker
</div>

<div
onClick={()=>{
    navigate("stocks")
  }}

 className="p-8 mb-6 rounded-lg bg-red-500 font-inter font-bold shadow-lg hover:cursor-pointer hover:scale-105 transform transition duration-300 dark:text-white">
  Stocks update
</div>

<div
onClick={()=>{
    navigate("gold")
  }} 
className="p-8 mb-6 rounded-lg bg-yellow-300 font-inter font-bold shadow-lg hover:cursor-pointer hover:scale-105 transform transition duration-300 dark:text-white">
  Gold assets tracker
</div>

<div 
    onClick={()=>{
    navigate("crypto")
  }}
className="p-8 mb-6 rounded-lg bg-blue-300 font-inter font-bold shadow-lg hover:cursor-pointer hover:scale-105 transform transition duration-300 dark:text-white">
  Crypto assets tracker
</div>



      </motion.div>
<div>
  {mutualFundsData.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Your Mutual Fund Investments</h2>
    <div className="overflow-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Fund Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Investment Amount</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Investment Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Current Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {mutualFundsData.map((fund, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2">{fund.fundname}</td>
              <td className="px-4 py-2">₹{fund.investmentAmount}</td>
              <td className="px-4 py-2">{new Date(fund.investmentDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                {fund.currentvalue ? `₹${fund.currentvalue}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

</div>
<div>
{mutualchart.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Mutual Fund Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mutualchart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fundName" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="CurrentValue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}
</div>

{goldData.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Your Gold Investments</h2>
    <div className="overflow-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-yellow-100 dark:bg-yellow-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Gold Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Quantity (g)</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Purchase Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Price/gram</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Current Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {goldData.map((gold, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2">{gold.goldType}</td>
              <td className="px-4 py-2">{gold.quantity}</td>
              <td className="px-4 py-2">{new Date(gold.purchaseDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">₹{gold.Pricepergram}</td>
              <td className="px-4 py-2">
                {gold.currentvalue ? `₹${gold.currentvalue}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
<div>
  {goldchart.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Gold Investment Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={goldchart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="GoldType" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="CurrentValue" stroke="#FFD700" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}

</div>

{stocksData.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Your Stock Holdings</h2>
    <div className="overflow-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-red-100 dark:bg-red-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Stock Symbol</th>
            <th className="px-4 py-2 text-left text-sm font-medium">No. of Shares</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Purchase Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Buy Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Current Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {stocksData.map((stock, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2">{stock.stocksymbol}</td>
              <td className="px-4 py-2">{stock.numberofShares}</td>
              <td className="px-4 py-2">{new Date(stock.purchaseDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">₹{stock.buyPrice}</td>
              <td className="px-4 py-2">
                {stock.currentvalue ? `₹${stock.currentvalue}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
<div>
  {stockchart.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Stock Investment Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockchart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="StockSymbol" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="CurrentValue" stroke="#FF6347" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}

</div>

{cryptoData.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Your Crypto Holdings</h2>
    <div className="overflow-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-red-100 dark:bg-red-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">CryptoName</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Symbol</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Purchase Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Buy Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Quantity </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {cryptoData.map((crypto, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2">{crypto.cryptoname}</td>
              <td className="px-4 py-2">{crypto.symbol}</td>
               <td className="px-4 py-2">{crypto.quantity}</td>
              <td className="px-4 py-2">{new Date(crypto.purchaseDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">₹{crypto.purchasePrice}</td>
              <td className="px-4 py-2">
                {crypto.currentvalue ? `₹${crypto.currentvalue}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
<div>{cryptochart.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Crypto Investment Chart</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={cryptochart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="CryptoName" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="CurrentValue" stroke="#00BFFF" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}
</div>


      <motion.div
        className="text-black dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 text-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p>Want some assistance in investing provide us your few details and get best tips regarding your investments!!</p>
      </motion.div>

      {questions.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            onClick={() => toggleQuestion(index)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2"
          >
            <p className="font-semibold text-lg">{index + 1}. {item.q}</p>
          </div>

          <AnimatePresence>
            {openQuestion === index && (
              <motion.div
                className="mt-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.input(item.key)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className="bg-orange-500 dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </motion.div>

      <AnimatePresence>
        {tips.length > 0 && classification && (
          <motion.div
            key="tips"
            className="dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="p-3">Looks like you are a <strong>{classification}</strong> Investor.</p>
            <p className="p-3">We would like to give you some tips regarding investment. Like:</p>
            <ul className="p-3 list-disc list-inside space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>


      {ismutualfunds&&<MutualFunds onClose={closeModal}/>}
      {isstocks&&<Stock onClose={closeModal}/>}
      {isgold&&<Gold onClose={closeModal}/>}
      {iscrypto&&<Crypto onClose={closeModal}/>}

    </div>
  );
}
