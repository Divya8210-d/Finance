export default function BudgetInsight(params) {

    

const getinsight = async () => {
        // 🧠 Replace this dummy data with actual API or logic
  try {
    

      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/budgetinsight",
        {month},
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const {aiRaw} = res.data.data;

    
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  };
useEffect(() => {
    getcashflow();
  }, [])

return (<>



</>)
  
}






