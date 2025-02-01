import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance"; // Use axiosInstance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      toast.success("Access granted...!", {
        icon: "🎉",
      });

      setTimeout(() => {
        navigate("/chat");
      }, 100);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen left-0 right-0 flex flex-col absolute">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 rounded-lg cursor-pointer"
      >
        <Home size={24} />
        <span className="text-sm font-medium">Home</span>
      </button>

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
                IntelliChat
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              IntelliChat is your AI-powered assistant for seamless
              communication and productivity. Whether you need help with general
              queries, summarization, or rephrasing, IntelliChat has got you
              covered.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-white p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="block md:hidden text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
                  IntelliChat
                </span>
              </h1>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Please sign in to continue</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  placeholder="Email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all duration-200 ${
                    isFocused.email
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  placeholder="Password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all duration-200 ${
                    isFocused.password
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg transform transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full bg-white text-blue-600 py-3 rounded-lg border-2 border-blue-600 transform transition-all duration-200 hover:bg-blue-50 active:scale-95 cursor-pointer"
              >
                Create New Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
