import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const COLORS = ['#0088FE', '#00C49F'];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Cashflow() {
  const [data, setData] = useState([
    { name: 'Cash', value: 0 },
    { name: 'Cashless', value: 0 }
  ]);
  const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [insight, setInsight] = useState("");

  const getcashflow = async (month) => {
    try {
      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/cashflow",
        {month},
        { withCredentials: true }
      );
      console.log("Cashflow response:", res.data);

      const { cash, cashless, aiRaw } = res.data.data;

      setData([
        { name: "Cash", value: cash },
        { name: "Cashless", value: cashless },
      ]);

      setInsight(aiRaw || "No insight available for this month.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getcashflow(month);
  }, [month]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 mt-6">
      
      {/* Chart Section */}
      <div className="flex flex-col items-center">
        <select
          className="mb-4 p-2 rounded-md border shadow"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Insights Section */}
      <div className="max-w-xl w-full md:w-1/2 bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-orange-300">
          Insights regarding the income flow
        </h2>
        <p className="text-gray-700 dark:text-orange-100">{insight}</p>
      </div>
    </div>
  );
}
