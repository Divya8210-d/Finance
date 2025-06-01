import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";

const CATEGORY_KEYS = [
  "Groceries",
  "Rents",
  "Bills",
  "Shoppings",
  "Chilling",
  "Vehicles",
  "Fees",
  "Personal",
  "Recharge",
  "Others",
];

function SpendingTrends() {
  const [chartData, setChartData] = useState([]);
  const [months, setMonths] = useState([]);
  const [insight,setInsights] = useState(null)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/v1/dashboard/spendingtrends",{}, {
          withCredentials: true,
        });

        const docs = res.data.data.spendingDoc;
                    setInsights(res.data.data.aiRaw)
        const categoryTotalsByMonth = {};

        // Transform the data
        docs.forEach((doc) => {
          const month = doc.month;
          if (!categoryTotalsByMonth[month]) {
            categoryTotalsByMonth[month] = {};
          }

          CATEGORY_KEYS.forEach((key) => {
            categoryTotalsByMonth[month][key] = doc[key]?.monthlyTotal || 0;
          });
        });

        // Prepare chart data: one object per category with monthly values
        const finalChartData = CATEGORY_KEYS.map((category) => {
          const entry = { category };
          Object.keys(categoryTotalsByMonth).forEach((month) => {
            entry[month] = categoryTotalsByMonth[month][category];
          });
          return entry;
        });

        setChartData(finalChartData);
        setMonths(Object.keys(categoryTotalsByMonth));
      } catch (error) {
        console.error("Error fetching spending trends", error);
        toast.error("Something went wrong ")
      }
    };

    fetchTrends();
  }, []);

  return (<div>
 <div className=" h-[400px] mt-2 bg-white shadow-lg rounded-xl p-14 w-full">
  <ToastContainer position="top-center"/>
      <h2 className="text-xl font-semibold mb-4 text-left">Spending Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          {months.map((month, index) => (
            <Line
              key={month}
              type="monotone"
              dataKey={month}
              stroke={getColor(index)}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>



    </div>
      <div className="bg-orange-100 rounded-xl p-4 w-full mt-4">
        <h2 className="text-xl font-semibold mb-2">A analysis of your monthly expense</h2>
        <p className="text-gray-700 mb-2">
       {insight}
        </p>
      
      </div>





  </div>
   
  );
}

// Helper function to generate colors for each month line
const getColor = (index) => {
  const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28",
    "#0088FE", "#FF6666", "#A28EFF", "#00A8E8", "#E86F00", "#D7263D"
  ];
  return COLORS[index % COLORS.length];
};

export default SpendingTrends;
