import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function BudgetInsight(params) {
  const [insight, setInsight] = useState("");

  const getinsight = async () => {
    const currentMonth = new Date().toLocaleString("default", { month: "long" }); // e.g., "July"

    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/budgetinsight",
        { month: currentMonth },
        { withCredentials: true }
      );

      console.log(res.data);
      const { aiRaw } = res.data.data;
      setInsight(aiRaw || "Sorry, can't fetch insight.");
    } catch (error) {
      setInsight(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getinsight();
  }, []);

  return (
    <div className="max-w-6xl w-full bg-orange-100 dark:bg-orange-900 rounded-xl p-4 ml-10">
      <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
        Suggestions and tips regarding your Budget for current month
      </h2>
      <p className="text-gray-700 dark:text-orange-100">{insight}</p>
    </div>
  );
}


