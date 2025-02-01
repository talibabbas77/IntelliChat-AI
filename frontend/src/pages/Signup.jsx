import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Mail,
  Lock,
  User,
  AlertCircle,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", response.data.token);

      // Show success toast before navigation
      toast.success("Account created successfully!", {
        icon: "🎉",
      });

      // Add a small delay before navigation to ensure toast is visible
      setTimeout(() => {
        navigate("/chat");
      }, 100);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration";
      setError(errorMessage);
      toast.error(errorMessage, {
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen right-0 left-0 flex flex-col absolute">
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
              Join{" "}
              <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
                IntelliChat
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Create your account today and experience the power of AI-driven
              communication. Get instant help with your queries, summaries, and
              much more.
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
                Create Account
              </h2>
              <p className="text-gray-600">Join us today and start chatting</p>
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
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, username: true })}
                  onBlur={() => setIsFocused({ ...isFocused, username: false })}
                  placeholder="Username"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all duration-200 ${
                    isFocused.username
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg outline-none transition-all duration-200 ${
                    isFocused.password
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                  "Create Account"
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-3 text-gray-500 text-sm">OR</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full bg-white text-blue-600 py-3 rounded-lg border-2 border-blue-600 transform transition-all duration-200 hover:bg-blue-50 active:scale-95 cursor-pointer"
              >
                Already have an account? Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
