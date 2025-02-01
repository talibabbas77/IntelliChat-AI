import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/favicon.ico"
              alt="Logo"
              className="h-8 w-8 transition-transform hover:rotate-12"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
              IntelliChat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {/* Login and Sign Up Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
              >
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 transform"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Login and Sign Up Buttons */}
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
