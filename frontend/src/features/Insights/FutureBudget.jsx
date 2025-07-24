import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FutureBudget() {
  const [insight, setInsight] = useState("");

  const getinsight = async () => {
    console.log("Inside getinsight");

    try {
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/futureprediction",
        {}, // empty body
        { withCredentials: true }
      );
      console.log("Future", res.data);

      const { aiRaw } = res.data.data;
      setInsight(aiRaw || "Sorry can't fetch the data.");
    } catch (error) {
      console.error("Future Budget API Error", error);
    setInsight(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    console.log("Calling getinsight...");
    getinsight();
  }, []);

  return (
    <div className="max-w-6xl w-full ml-6 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
        Based on your spending behaviour some suggestions regarding your budget.
      </h2>
      <p className="text-gray-700 dark:text-orange-100">{insight}</p>
    </div>
  );
}

