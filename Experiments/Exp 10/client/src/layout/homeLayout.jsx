import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import NavBar from "../components/navbar";
import Login from "../screen/auth/auth";
import Upload from "../screen/upload";
import AudioPlayer from "../screen/audioPlayer";

function HomeLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleUpload = () => {
    setShowUploadModal(!showUploadModal);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex h-screen ">
        <div
          className={`bg-[#F5F5F5] lg:block hidden block text-[#333333] transition-all duration-300 ${
            isOpen ? "w-64" : "w-16"
          } h-full`}
        >
          <SideBar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            handleLogin={handleLogin}
            openUpload={handleUpload}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-[#FFFF] text-[#333333]">
            <NavBar
              toggleSidebar={toggleSidebar}
              isOpen={isOpen}
              handleLogin={handleLogin}
              openUpload={handleUpload}
            />
          </div>

          <div className="flex-1 overflow-scrollbar p-4 bg-[#FAFAFA] overflow-auto">
            <Outlet />
          </div>

          <div className="w-full bg-[#FFFF] text-[#333333]">
            <AudioPlayer />
          </div>
        </div>
      </div>
      <div>
        <Login isLogin={isLogin} handleLogin={handleLogin} />
      </div>
      <div>
        <Upload showUploadModal={showUploadModal} openUpload={handleUpload} />
      </div>
    </div>
  );
}

export default HomeLayout;
