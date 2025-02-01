import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  LogOut,
  MessageSquare,
  FileText,
  RefreshCw,
  BrainCog,
  MessageCircle,
} from "lucide-react";

const Sidebar = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const bots = [
    {
      name: "General Chat",
      path: "/chat",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: "Summarizer",
      path: "/summarizer",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Rephraser",
      path: "/rephraser",
      icon: <RefreshCw className="w-5 h-5" />,
    },
    {
      name: "Custom Bot",
      path: "/custom",
      icon: <BrainCog className="w-5 h-5" />,
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col fixed left-0 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } sm:w-16 md:w-64 h-screen p-4 border-r ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {/* Logo */}
      <div className="mt-0 sm:mt-5">
        <Link
          to="/"
          className={`flex items-center justify-start space-x-1 mb-8 border-b pb-4 w-full ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {/* Replace MessageCircle with your custom logo */}
          <img
            src="/logo.png" // Replace with the path to your logo file
            alt="Logo"
            className={`h-8 w-8 transition-transform hover:rotate-12 ${
              isDarkMode ? "filter brightness-75" : ""
            }`}
          />
          <span
            className={`text-xl font-bold ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-300 to-[#fc03cf]"
                : "bg-gradient-to-r from-blue-600 to-[#fc03cf]"
            } bg-clip-text text-transparent hidden md:block`}
          >
            IntelliChat
          </span>
        </Link>

        {/* Bot Navigation */}
        <nav className="space-y-1">
          {bots.map((bot) => (
            <Link
              key={bot.name}
              to={bot.path}
              className={`flex items-center p-2 rounded-lg transition-all duration-300 ${
                location.pathname === bot.path
                  ? isDarkMode
                    ? "bg-blue-800 text-white"
                    : "bg-blue-100 text-blue-800"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {bot.icon}
              <span className={`ml-2 hidden md:block`}>{bot.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings Section */}
      <div className="mt-auto space-y-2">
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 cursor-pointer ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 mr-2" />
          ) : (
            <Moon className="w-5 h-5 mr-2" />
          )}
          <span className={`hidden md:block`}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 cursor-pointer ${
            isDarkMode
              ? "text-red-400 hover:bg-gray-800"
              : "text-red-600 hover:bg-gray-100"
          }`}
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span className={`hidden md:block`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
