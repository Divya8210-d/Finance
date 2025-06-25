import { FaChartLine, FaPiggyBank, FaLock, FaUsers, FaRobot, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaChartLine className="text-5xl text-white" />,
    title: "Expense Management",
    desc: "Track your finances with live, insightful graphs and dashboards.",
  },
  {
    icon: <FaPiggyBank className="text-5xl text-white" />,
    title: "Smart Savings",
    desc: "Automatically get saving tips based on your spending habits.",
  },
  {
    icon: <FaLock className="text-5xl text-white" />,
    title: "Payment and Transactions",
    desc: "Track all your payments and transactions securely and efficiently.",
  },
  {
    icon: <FaUsers className="text-5xl text-white" />,
    title: "Collaborative Budgeting",
    desc: "Plan finances with your family or team in a shared environment.",
  },
  {
    icon: <FaRobot className="text-5xl text-white" />,
    title: "AI Insights",
    desc: "Get AI-generated suggestions to improve your financial habits.",
  },
  {
    icon: <FaLightbulb className="text-5xl text-white" />,
    title: "Financial Calculators",
    desc: "Use smart tools to calculate taxes, debts, EMIs, GST, and more.",
  },
];

export default function Features() {
  return (   <section id="features">
    <motion.div
      initial={{ backgroundPosition: "100% 0%" }}
      whileInView={{ backgroundPosition: "0% 0%" }}
      transition={{ duration: 2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="min-h-[700px] py-20 px-6 text-white bg-gradient-to-l from-orange-400 to-orange-600 bg-[length:200%_200%] bg-left"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-4xl font-bold">Explore Features in Our App</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:bg-opacity-20 transition-all duration-300"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-base opacity-90">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div></section>
  );
}
