
import { FiHome, FiSettings, FiUser, FiMenu, FiDollarSign, FiBarChart, FiBook, FiAward, FiGlobe, FiMoon } from "react-icons/fi";

import { Link,NavLink, useNavigate } from "react-router";
import { useState ,useEffect,useRef} from "react";
import axios from "axios";

export default function Sidebar({ collapsed, toggleCollapse ,profile,username  }) {
    const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

const [settingsOpen, setSettingsOpen] = useState(false);
const settingsRef = useRef(null);
const navigate = useNavigate()

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


const logout = async ()=>{
 await  axios.post("http://localhost:5000/api/v1/users/logout",null, {withCredentials: true} )
  .then((res)=>{
          alert("Logged Out")
          localStorage.removeItem("logged")
          navigate("/")


  }).catch((err)=>{
    const message = err.response?.data?.message || "An unknown error occurred";
    console.error("Logout error:", message);
    alert(message);
  })
}

const deleteaccount = async ()=>{
 await  axios.post("http://localhost:5000/api/v1/users/delete",null, {withCredentials: true} )
  .then((res)=>{
          alert("Deleted Account")
          localStorage.removeItem("logged")
          navigate("/")


  }).catch((err)=>{
    const message = err.response?.data?.message || "An unknown error occurred";
    console.error("Logout error:", message);
    alert(message);
  })
}










  const menuItems = [
    { icon: <FiDollarSign />, label: "Expenses" , name:"Update Expenses"},

    { icon: <FiBarChart/>, label: "Transactions", name:"Transactions" },
    { icon: <FiBarChart />, label: "Insights", name:"Expenses Insights" },

    { icon: <FiAward/>, label: "Progress" , name:"Your Progress"},
    { icon: <FiGlobe/>, label: "Tips" , name:"Investment Tips"},
    { icon: <FiSettings />, label: "Debt" , name:"Your Debt"},
    { icon: <FiMenu/>, label: "Calculators" , name:"Calculators"},
  
  
  ];

  return (
    <div
      className={`text-black dark:bg-gray-900  dark:text-white  bg-gray-100 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top bar with toggle button */}
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h1 className="text-lg font-bold ml-[14px]">Finanlytic</h1>}
        <button onClick={toggleCollapse} className={`text-black dark:text-white ${collapsed? "ml-[7px]":"ml-[0px]"}`}>
          <FiMenu />
        </button>
      </div>
<hr></hr>
      {/* Menu Items */}
      <ul className="flex-1 px-2 space-y-2 ml-[6px] mt-[10px]">
        {menuItems.map((item, idx) => (
          <li
            
            className="flex items-center gap-4 hover:bg-black hover:text-white  dark:hover:bg-gray-600 p-2 rounded"
          onClick={()=>{navigate(`/Dashboard/${item.label}`)}}  >
            <span className="text-xl hover:text-white">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </li>
        ))}
   <li className="relative" ref={settingsRef}>
  <div
    onClick={() => setSettingsOpen(prev => !prev)}
    className="flex items-center gap-4 hover:bg-black hover:text-white dark:hover:bg-gray-600 p-2 rounded cursor-pointer"
  >
    <span className="text-xl"><FiSettings /></span>
    {!collapsed && <span>Settings</span>}
  </div>

  {settingsOpen  && (
    <div className="absolute left-2 top-full mt-1 w-[200px] bg-white dark:bg-gray-700 text-black dark:text-white border rounded-xl shadow z-20">
      <ul className="text-sm">
        <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter" onClick={()=>{navigate("/Dashboard/edit")}} >Edit Profile</li>
        <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter" onClick={deleteaccount}>Delete Account</li>
        <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer font-inter" onClick={logout} >Logout</li>
      </ul>
    </div>
  )}
</li>

             <li
            
            className="flex items-center gap-4 hover:bg-black hover:text-white  dark:hover:bg-gray-600 p-2 rounded"
          onClick={toggleDarkMode}  >
            <span className="text-xl hover:text-white"><FiMoon/></span>
            {!collapsed && <span>Dark Mode</span>}
          </li>
      </ul>
<hr></hr>
           <div className={`p-3 flex end items-center mb-2 gap-[10px]   ${collapsed ? "ml-[0px]":"ml-[8px]"}`}>
            
                <div
      className={`rounded-xl overflow-hidden border-2 border-white shadow-sm  ${collapsed ? "w-[40px]":"w-[50px]"}  ${collapsed ? "h-[40px]":"h-[50px]"}`}
   
    >
      <img
        src={profile}
      
        className="w-full h-full object-cover"

      />
    </div>
        {!collapsed && <h1 className="text-base ">{username}</h1>}
       
      </div>
    </div>
  );
}
