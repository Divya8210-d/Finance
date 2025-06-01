import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-[600px] flex items-center justify-center bg-transparent">

      <div className="w-full max-w-sm backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-10 bg-white/40 backdrop-blur rounded-t-lg shadow-md"></div>
          <div className="flex border-b border-gray-300">
            <button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 py-3 text-center font-semibold text-white transition-colors border-b-2 ${
                activeTab === 'login' ? 'border-orange-600' : 'border-transparent'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 py-3 text-center font-semibold text-white transition-colors border-b-2 ${
                activeTab === 'register' ? 'border-orange-600' : 'border-transparent'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 min-h-[420px]">
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}


const LoginForm = () => {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = {
      email: lemail,
      password: lpassword
    };

    axios.post("http://localhost:5000/api/v1/users/login", data, {
      withCredentials: true
    })
    .then((res) => {
    toast.success("Logged in")
      setLemail("");
      setLpassword("");
      localStorage.setItem("logged", JSON.stringify(res.data.data.user));
      setTimeout(() => {
            navigate("/Dashboard/Insights");
      }, 3000);
  
    })
    .catch((err) => {
      const message = err.response?.data?.message || "An unknown error occurred";
      
  toast.error(message)
    });
  };

  return (
    <form onSubmit={login}>
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="login-email"
          name="email"
          required
          value={lemail}
          onChange={(e) => setLemail(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          required
          value={lpassword}
          onChange={(e) => setLpassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>
      <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
        Login
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const [remail, setRemail] = useState("");
  const [fullname, setFullname] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('profile', userImage);
    formData.append('email', remail);
    formData.append('password', rpassword);

    axios.post("http://localhost:5000/api/v1/users/register", formData)
      .then((res) => {
        toast.success("Registered");
        setFullname("");
        setRemail("");
        setRpassword("");
        setPreviewUrl(null);
        setUserImage(null);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "An unknown error occurred";
        console.error("Registration error:", message);
        alert(message);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-6" onSubmit={register}>
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="register-email"
          name="email"
          required
          value={remail}
          onChange={(e) => setRemail(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="register-username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="register-username"
          name="username"
          required
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="register-password"
          name="password"
          required
          value={rpassword}
          onChange={(e) => setRpassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="user-image" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
        <div className="flex items-center space-x-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border border-gray-300">
              No Image
            </div>
          )}
          <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Register
      </button>
    </form>
  );
};
