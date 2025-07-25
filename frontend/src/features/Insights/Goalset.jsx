
import axios from "axios";
import { useState,useEffect } from "react";
import { use } from "react";
import { toast } from "react-toastify";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
      console.log("Monthly response:", res.data);
      const {aiRaw} = res.data.data;

    setPlan(aiRaw||"Sorry could not give your plan")
    
    } catch (error) {
         setPlan(error.response?.data?.message||"Something went wrong ")
    }


  };

  useEffect(() => {
    getcashflow();
  }, [month]);

    return (<>
  <div className="max-w-6xl w-full  bg-orange-100 dark:bg-orange-900 rounded-xl p-4 ml-10">
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