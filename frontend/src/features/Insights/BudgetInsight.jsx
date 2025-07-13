import { useState } from "react";

export default function BudgetInsight(params) {

    const [insight,setInsight] = useState("")

const getinsight = async () => {
  
  try {
    //current month bhejna hai

      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/budgetinsight",
        {month},
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const {aiRaw} = res.data.data;
     
      setInsight(aiRaw||"Sorry can't fetch insight.")
    
    
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
        Suggestions and tips regarding your Budget for current month
        </h2>
        <p className="text-gray-700 dark:text-orange-100">{insight}</p>
      </div>

</>)
  
}






