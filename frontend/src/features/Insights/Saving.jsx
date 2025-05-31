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
  const [insight,setInsights] =useState(null)

  const fetchSavings = async (month) => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/v1/saving", { month },{withCredentials:true});
          console.log("Savings response:", res.data);
      const { totalexpense, saving , aiRaw } = res.data.data;

      setData([
        { name: "Total Expense", value: totalexpense },
        { name: "Saving", value: saving },
      ]);
      setInsights(aiRaw)
    } catch (error) {
      console.error("Error fetching saving data", error);
      toast.error("Something went wrong")
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavings(selectedMonth);
  }, [selectedMonth]);
// Inside Saving.jsx
return (<div className="flex flex-col md:flex-row gap-4">
  <ToastContainer/>
 <div className="flex flex-col w-full md:w-1/2 bg-white shadow-lg rounded-xl p-4">
    <h2 className="text-xl font-semibold mb-4 text-left">Savings</h2>

    <select
      className=" p-2 border border-gray-300 rounded-md w-48"
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
    <Tooltip />
    <Legend
      verticalAlign="bottom"
      iconType="circle"
       wrapperStyle={{ marginLeft: -50 }}
      formatter={(value) => <span className="text-sm">{value}</span>}
    />
  </PieChart>
</div>

    ) : (
      <p className="text-red-500">No data available for {selectedMonth}</p>
    )}
  </div>



     <div className="max-w-5xl md:w-1/2 bg-orange-100 rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Some Insights regarding your savings</h2>
          <p className="text-gray-700">
      {insight}
          </p>
        </div>









</div>
 
);


}

export default Saving;
