import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { toast, ToastContainer } from "react-toastify";

const COLORS = ["#FFA500", "#00C49F"]; // Color for Expense and Saving
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Saving() {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toLocaleString("default", { month: "long" })
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insight, setInsights] = useState(null);

  const fetchSavings = async (month) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/saving",
        { month },
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const { totalexpense, saving, aiRaw } = res.data.data;

      setData([
        { name: "Total Expense", value: totalexpense },
        { name: "Saving", value: saving },
      ]);
      setInsights(aiRaw);
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
      
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavings(selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="flex flex-col md:flex-row gap-4 dark:bg-gray-900 dark:text-gray-200 min-h-screen p-4">
      <ToastContainer />
      <div className="flex flex-col w-full md:w-1/2 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 shadow-lg rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-left dark:text-gray-100">Savings</h2>

        <select
          className="p-2 border border-gray-300 rounded-md w-48
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
          <p className="mt-4 dark:text-gray-300">Loading...</p>
        ) : data ? (
          <div className="">
            <PieChart width={650} height={400}>
              <Pie
                data={data}
                cx="40%"
                cy="48%"
                labelLine={false}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1a202c", borderColor: "#2d3748" }}
                itemStyle={{ color: "#e2e8f0" }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ marginLeft: -50 }}
                formatter={(value) => <span className="text-sm dark:text-gray-300">{value}</span>}
              />
            </PieChart>
          </div>
        ) : (
          <p className="mt-4 text-red-500 dark:text-red-400">
            No data available for {selectedMonth}
          </p>
        )}
      </div>

      <div className="max-w-5xl md:w-1/2 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
          Some Insights regarding your savings
        </h2>
        <p className="text-gray-700 dark:text-orange-100">{insight}</p>
      </div>
    </div>
  );
}

export default Saving;
