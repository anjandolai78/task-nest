import React from 'react';
import {IoLogOutOutline} from "react-icons/io5";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Header = ({setAddTaskDiv}) => {
  const navigate = useNavigate();
  const logout = async () => {
    try{
   const res = await axios.post("https://task-nest-backend-2rr3.onrender.com/api/v1/logout", {},{withCredentials: true});
   alert(res.data.message);
   localStorage.clear("userLoggIn");
   navigate("/login");
    }catch(error){
      navigate("/login");
    }
  }
  return (
  <div className="flex px-12 py-4 items-center justify-between border">
    <div>
    <h1 className="text-2xl text-blue-800 font-semibold">TaskNest</h1>
    </div>
    <div className="flex gap-8">
      <button 
  onClick={() => setAddTaskDiv("block")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Add Task
</button>
        <button 
  onClick={logout}
  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-lg font-semibold bg-gray-900 text-white shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-all active:scale-95 duration-300"
>
  <IoLogOutOutline className="text-2xl" />
  <span>Logout</span>
</button>
    </div>
    </div>
  );
};

export default Header;