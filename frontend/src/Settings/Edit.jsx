import axios from "axios";
import React, { useState } from "react";

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
         alert("Profile edited")
})

.catch((err)=>{   const message = err.response?.data?.message || "An unknown error occurred";
      console.log("Editing error",message)
})


 
    onClose(); // Close modal after save
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 ">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md dark:bg-gray-800">
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
