
import axios from "axios";
import { useState } from "react";
import { use } from "react";


export default function Goalset(params) {
    const [month,setMonth]= useState();
  const [data, setData] = useState([
    { name: 'Cash', value: 0 },
    { name: 'Cashless', value: 0 }
  ]);

  const getcashflow = async () => {
    // 🧠 Replace this dummy data with actual API or logic
  try {
    

      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/getbudgetmonthly",
        {month},
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const budget = res.data.data;

    
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  };

  useEffect(() => {
    getcashflow();
  }, []);

    return (<>
    <div>

    </div>
    
<div>

    
</div>

    
    </>)


}