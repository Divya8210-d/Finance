import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import axios from "axios";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Edit from "../Settings/Edit";
import { ToastContainer } from "react-toastify";

function Dashboard(params) {
    const [username,setUsername]=useState()
    const [profileurl,setProfile]=useState()

  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname.endsWith("/edit");

  const closeModal = () => navigate("/Dashboard/Insights");





useEffect(()=>{
  axios.get("https://finanlytic.onrender.com/api/v1/users/profile", {withCredentials: true} )
  .then((res)=>{
    setUsername(res.data.data.fullname)
    
    setProfile(res.data.data.profile)

  })
},[isEdit])




 const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50 dark:bg-gray-900 font-inter  ">
      <ToastContainer position="top-center"/>
      <Sidebar collapsed={isCollapsed} toggleCollapse={() => setIsCollapsed(!isCollapsed)} profile={profileurl} username={username} />
      <Main collapsed={isCollapsed} />

     

      {isEdit && (
        <Edit onClose={closeModal} /> // 👈 make sure your modal supports `onClose`
      )}
    </div>

)}

export default Dashboard