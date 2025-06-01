import { FiHome, FiSettings, FiUser, FiMenu, FiDollarSign, FiBarChart, FiBook, FiAward, FiGlobe, FiMoon } from "react-icons/fi";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import { CgMathPercent } from "react-icons/cg";

import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

export default function Sidebar({ collapsed, toggleCollapse, profile, username }) {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    try {
      await axios.post("https://finanlytic.onrender.com/api/v1/users/logout", null, { withCredentials: true });
  toast.success("Logged out successfuly")
      localStorage.removeItem("logged");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.error("Logout error:", message);
      alert(message);
    }
  };

  const deleteaccount = async () => {
    try {
      await axios.post("https://finanlytic.onrender.com/api/v1/users/delete", null, { withCredentials: true });
       toast.success("Account Deleted")
      localStorage.removeItem("logged");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred";
      console.error("Logout error:", message);
      alert(message);
    }
  };

  const menuItems = [
    { icon: <FiDollarSign />, label: "Expenses", name: "Update Expenses" },
    { icon: <GiTakeMyMoney />, label: "Transactions", name: "Transactions" },
    { icon: <FiBarChart />, label: "Insights", name: "Expenses Insights" },
    { icon: <FiAward />, label: "Progress", name: "Your Progress" },
    { icon: <FiGlobe />, label: "Tips", name: "Investment Tips" },
    { icon: <GiReceiveMoney />, label: "Debt", name: "Your Debt" },
    { icon: <CgMathPercent />, label: "Calculators", name: "Calculators" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`text-black dark:bg-gray-900 dark:text-white bg-orange-50 flex flex-col overflow-hidden`}
      style={{ minWidth: collapsed ? 64 : 256 }}
    >
      {/* Top bar with toggle button */}
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h1 className="text-lg font-bold ml-[14px]">Finanlytic</h1>}
        <button onClick={toggleCollapse} className={`text-black dark:text-white ${collapsed ? "ml-[7px]" : "ml-[0px]"}`}>
          <FiMenu />
        </button>
      </div>
      <hr />

      {/* Menu Items */}
      <ul className="flex-1 px-2 space-y-2 ml-[6px] mt-[10px]">
        {menuItems.map((item, idx) => (
          <motion.li
            key={idx}
          
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-4 p-2 rounded cursor-pointer  hover:bg-black hover:text-white"
            onClick={() => {
              navigate(`/Dashboard/${item.label}`);
            }}
            style={{ originX: 0 }}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </motion.li>
        ))}

        {/* Settings */}
        <li className="relative" ref={settingsRef}>
          <motion.div
            onClick={() => setSettingsOpen((prev) => !prev)}
        
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-black hover:text-white"
            style={{ originX: 0 }}
          >
            <span className="text-xl">
              <FiSettings />
            </span>
            {!collapsed && <span>Settings</span>}
          </motion.div>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute left-2 top-full mt-1 w-[200px] bg-white dark:bg-gray-700 text-black dark:text-white border rounded-xl shadow z-20"
              >
                <ul className="text-sm">
                  <li
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter"
                    onClick={() => {
                      navigate("/Dashboard/edit");
                      setSettingsOpen(false);
                    }}
                  >
                    Edit Profile
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter"
                    onClick={deleteaccount}
                  >
                    Delete Account
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Dark Mode */}
        <motion.li
         
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-4 p-2 rounded cursor-pointer  hover:bg-black hover:text-white"
          onClick={toggleDarkMode}
          style={{ originX: 0 }}
        >
          <span className="text-xl">
            <FiMoon />
          </span>
          {!collapsed && <span>Dark Mode</span>}
        </motion.li>
      </ul>
      <hr />

      {/* Profile section */}
      <div className={`p-3 flex items-center mb-2 gap-[10px] ${collapsed ? "ml-[0px]" : "ml-[8px]"}`}>
        <div
          className={`rounded-xl overflow-hidden border-2 border-white shadow-sm ${
            collapsed ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"
          }`}
        >
          <img src={profile} className="w-full h-full object-cover" />
        </div>
        {!collapsed && <h1 className="text-base">{username}</h1>}
      </div>
    </motion.div>
  );
}
