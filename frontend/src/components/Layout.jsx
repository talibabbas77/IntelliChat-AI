import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div
        className={`flex-1 ml-64 p-6 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
