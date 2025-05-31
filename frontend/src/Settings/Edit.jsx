import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Edit({ onClose }) {
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // handle submission logic
 const formData = new FormData();
    formData.append('fullname', fullName);   
    formData.append('profile', profilePic);  



  await   axios.post("http://localhost:5000/api/v1/users/edit",formData,{withCredentials:true})
.then((res)=>{
        toast.success("Profile Updated")
})

.catch((err)=>{   const message = err.response?.data?.message || "Fields are required";
  toast.warning(message)
      console.log("Editing error",message)
})


 
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <motion.div initial={{ opacity: 0,  }}
        animate={{ opacity: 1,  }}  className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 ">
         <ToastContainer  position="top-center"/>
     
      <motion.div   initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}  className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800 border-2 border-orange-300">
      
      <h2 className="text-xl font-bold mb-4 text-center ">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 ">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full "
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
