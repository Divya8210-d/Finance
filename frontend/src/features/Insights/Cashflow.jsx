import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F'];

export default function Cashflow() {
  const [data, setData] = useState([
    { name: 'Cash', value: 0 },
    { name: 'Cashless', value: 0 }
  ]);

  const getcashflow = async () => {
    // 🧠 Replace this dummy data with actual API or logic
  try {
    

      const res = await axios.get(
        "https://finanlytic.onrender.com/api/v1/dashboard/cashflow",
        
        { withCredentials: true }
      );
      console.log("Savings response:", res.data);
      const { cash, cashless } = res.data.data;

      setData([
        { name: "Cash", value: cash },
        { name: "Cashless", value: cashless },
      ]);
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  };

  useEffect(() => {
    getcashflow();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
  );
}
