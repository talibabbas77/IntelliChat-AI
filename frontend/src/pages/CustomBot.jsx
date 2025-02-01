import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Loader2 } from "lucide-react";

const CustomBot = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [inputText, setInputText] = useState("");
  const [customBotResponse, setCustomBotResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCustomBotQuery = async () => {
    setCustomBotResponse("");
    setError("");

    if (!inputText.trim()) {
      setError("Please enter a query for the custom bot.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ai/custom-bot`,
        { query: inputText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Format response with markdown-style structure
      const formattedResponse = response.data.response
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
        .replace(/## (.*?)\n/g, "<h2>$1</h2>") // Headings
        .replace(/\n- (.*?)/g, "<li>$1</li>") // Bullet points
        .replace(/\n/g, "<br />"); // Line breaks for paragraph spacing

      setCustomBotResponse(formattedResponse);
    } catch (err) {
      console.error("Custom Bot error:", err);
      setError(
        err.response?.data?.error ||
          "Failed to get a response from the Custom Bot. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div
        className={`ml-16 sm:ml-64 flex-grow min-h-screen p-4 sm:p-8 absolute left-0 bottom-0 top-0 right-0 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-3xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Custom AI Bot
          </h1>

          <div
            className={`rounded-lg p-6 ${
              isDarkMode ? "bg-gray-700" : "bg-white shadow-md"
            }`}
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`w-full p-4 border outline-none rounded-lg mb-4 resize-none ${
                isDarkMode
                  ? "bg-gray-600 text-white border-gray-500"
                  : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-400"
              }`}
              placeholder="Ask your custom AI bot a question..."
              rows="6"
            />

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCustomBotQuery}
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Ask Custom Bot"
              )}
            </button>

            {customBotResponse && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <h2 className="text-xl font-semibold mb-3">Bot Response</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: customBotResponse }}
                  className="leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBot;
