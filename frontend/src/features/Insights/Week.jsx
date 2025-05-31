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
  const [insight,setInsights] = useState(null)

  const fetchWeeklyData = async (month) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/weeklytrend",
        { month },
        { withCredentials: true }
      );
           setInsights(res.data.data.aiRaw)
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
    toast.error("Something went wrong")
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyData(selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <ToastContainer position="top-center"/>
      <h2 className="text-xl font-semibold mb-4 text-left">Weekly Expense Trends</h2>

      <select
        className="p-2 border border-gray-300 rounded-md mb-4"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {MONTHS.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-red-500">No data available for {selectedMonth}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
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
      <div className="bg-orange-100 rounded-xl p-4 w-full mt-4">
        <h2 className="text-xl font-semibold mb-2">Weekly Expense Insights</h2>
        <p className="text-gray-700 mb-2">
       {insight}
        </p>
      
      </div>

    </div>
  );
}

export default Week;
