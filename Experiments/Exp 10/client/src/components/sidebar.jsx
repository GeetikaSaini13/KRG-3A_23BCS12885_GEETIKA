import React from "react";
import {
  FiMenu,
  FiSearch,
  FiHeart,
  FiUpload,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import DarkLogo from "../assets/Logo/Dark-Logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function SideBar({ handleLogin, isOpen, openUpload }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full bg-[#F5F5F5] text-[#333333] flex flex-col justify-between p-2 transition-all duration-300">
      <div className="flex items-center justify-center text-[#333333]">
        {isOpen && <img src={DarkLogo} alt="PodTube" />}
      </div>

      <div className="flex-grow mt-4 flex flex-col w-full space-y-2">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-[#333333] space-x-3 px-3 py-2 text-lg font-medium rounded-lg hover:bg-[#FF5722]"
        >
          <FiHome size={24} />
          {isOpen && <span>Dashboard</span>}
        </button>
        <button
          onClick={() => navigate("/search")}
          className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722]"
        >
          <FiSearch size={24} />
          {isOpen && <span>Search</span>}
        </button>
        <button
          onClick={() => navigate("favourite")}
          className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722]"
        >
          <FiHeart size={24} />
          {isOpen && <span>Favourite</span>}
        </button>

        <hr className="border-[#333333] my-2" />

        {isLoggedIn && (
          <button
            onClick={openUpload}
            className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722]"
          >
            <FiUpload size={24} />
            {isOpen && <span>Upload</span>}
          </button>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => {
              handleLogin();
            }}
            className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722]"
          >
            <FiUpload size={24} />
            {isOpen && <span>Upload</span>}
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={() => navigate("profile")}
            className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722]"
          >
            <FiUser size={24} />
            {isOpen && <span>Profile</span>}
          </button>
        )}
      </div>

      <div className="space-y-2 w-full">
        {!isLoggedIn && (
          <button
            onClick={handleLogin}
            className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722] w-full"
          >
            <FiLogIn size={24} />
            {isOpen && <span>Login</span>}
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 text-lg font-medium rounded-lg text-[#333333] hover:bg-[#FF5722] w-full"
          >
            <FiLogOut size={24} />
            {isOpen && <span>Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
