import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { toast, ToastContainer } from "react-toastify";

const CATEGORIES = [
  "Groceries", "Rents", "Bills", "Shoppings", "Chilling",
  "Vehicles", "Fees", "Personal", "Recharge", "Others"
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

function Week() {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toLocaleString("default", { month: "long" })
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [insight, setInsights] = useState(null);

  const fetchWeeklyData = async (month) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/weeklytrend",
        { month },
        { withCredentials: true }
      );
      setInsights(res.data.data.aiRaw);
      const spendingDoc = res.data.data.spendingDoc[0];
      if (!spendingDoc) return;

      const formattedData = CATEGORIES.map((cat) => {
        const weekly = spendingDoc[cat]?.weekly || [0, 0, 0, 0];
        return {
          category: cat,
          Week1: weekly[0],
          Week2: weekly[1],
          Week3: weekly[2],
          Week4: weekly[3],
        };
      });

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching weekly data", error);
      toast.error("Something went wrong");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyData(selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mt-6 dark:text-gray-200">
      <ToastContainer position="top-center" />
      <h2 className="text-xl font-semibold mb-4 text-left dark:text-gray-100">Weekly Expense Trends</h2>

      <select
        className="p-2 border border-gray-300 rounded-md mb-4
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {MONTHS.map((month) => (
          <option key={month} value={month} className="dark:bg-gray-700">
            {month}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="dark:text-gray-300">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-red-500 dark:text-red-400">No data available for {selectedMonth}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={document.body.classList.contains('dark') ? "#4B5563" : "#ccc"} />
            <XAxis dataKey="category" stroke={document.body.classList.contains('dark') ? "#D1D5DB" : "#333"} />
            <YAxis stroke={document.body.classList.contains('dark') ? "#D1D5DB" : "#333"} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a202c", borderColor: "#2d3748" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Legend
              wrapperStyle={{ color: document.body.classList.contains('dark') ? "#D1D5DB" : "#333" }}
            />
            {["Week1", "Week2", "Week3", "Week4"].map((week, idx) => (
              <Line
                key={week}
                type="monotone"
                dataKey={week}
                stroke={COLORS[idx % COLORS.length]}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="bg-orange-100 dark:bg-orange-900 rounded-xl p-4 w-full mt-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">Weekly Expense Insights</h2>
        <p className="text-gray-700 dark:text-orange-100 mb-2">
          {insight}
        </p>
      </div>
    </div>
  );
}

export default Week;
