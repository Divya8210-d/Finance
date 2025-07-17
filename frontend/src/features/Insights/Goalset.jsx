
import axios from "axios";
import { useState,useEffect } from "react";
import { use } from "react";
import { toast } from "react-toastify";

export default function Goalset(params) {
const [plan,setPlan]=useState("")
const [month,setMonth]=useState()
  const getcashflow = async () => {
    // 🧠 Replace this dummy data with actual API or logic
  try {
    

      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/getbudgetmonthly",
        {month},
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const budget = res.data.data;

    setPlan(budget||"Sorry could not give your plan")
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  };

  useEffect(() => {
    getcashflow();
  }, []);

    return (<>
  <div className="max-w-xl w-full md:w-1/2 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
   <select
          className="mb-4 p-2 rounded-md border shadow"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
    Your Detailed Budget Plans
        </h2>
        <p className="text-gray-700 dark:text-orange-100">{plan}</p>
      </div>

    
    </>)


}