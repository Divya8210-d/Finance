import { useState,useEffect } from "react";
import { toast } from "react-toastify";

export default function FutureBudget(params) {

  const [insight,setInsight] = useState("")

const getinsight = async () => {
        
  try {
    

      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/futureprediction",
        
        { withCredentials: true }
      );
    console.log("Future",res.data);
    
      const {aiRaw} = res.data.data;
   setInsight(aiRaw||"Sorry can'y fetch the data.")
    
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  };
useEffect(() => {
    getinsight()
  }, [])

return (<>

  <div className="max-w-xl w-full md:w-1/2 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
      Based on your spending behaviour some suggestions regarding your budget.
        </h2>
        <p className="text-gray-700 dark:text-orange-100">{insight}</p>
      </div>

</>)
  
}






