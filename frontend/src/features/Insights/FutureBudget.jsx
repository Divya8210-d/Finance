export default function FutureBudget(params) {

    

const getinsight = async () => {
        // 🧠 Replace this dummy data with actual API or logic
  try {
    

      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/futureprediction",
        
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const prediction = res.data.data;

    
    
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






