import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjust the import path as needed
import { Loader2, Copy, Edit2, Check } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const Summarizer = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    // Reset previous states
    setSummary("");
    setError("");
    setCopied(false);

    // Validate input
    if (!inputText.trim()) {
      setError("Please enter text to summarize");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/api/ai/summarize", {
        text: inputText,
      });

      setSummary(response.data.summary);
    } catch (err) {
      console.error("Summarization error:", err);
      setError(
        err.response?.data?.error ||
          "Failed to summarize text. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5s
  };

  const handleEdit = () => {
    setInputText(summary);
    setSummary(""); // Clear summary text after editing
  };

  return (
    <div
      className={`flex ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Content Area */}
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
            Text Summarizer
          </h1>

          {/* Summarizer Content */}
          <div
            className={`rounded-lg p-6 ${
              isDarkMode ? "bg-gray-700" : "bg-white shadow-md"
            }`}
          >
            {/* Input Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`w-full p-4 border outline-none rounded-lg mb-4 resize-none ${
                isDarkMode
                  ? "bg-gray-600 text-white border-gray-500"
                  : "bg-white text-gray-800 border-gray-300 placeholder:text-gray-400"
              }`}
              placeholder="Enter text to summarize..."
              rows="6"
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {/* Summarize Button */}
            <button
              onClick={handleSummarize}
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
                  Summarizing...
                </>
              ) : (
                "Summarize"
              )}
            </button>

            {/* Summary Result */}
            {summary && (
              <div
                className={`mt-6 p-4 rounded-lg flex justify-between items-start ${
                  isDarkMode
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div>
                  <h2 className="text-xl font-semibold mb-3">Summary</h2>
                  <p>{summary}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg flex items-center justify-center transition ${
                      copied
                        ? "bg-green-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    title="Copy to Clipboard"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={handleEdit}
                    className={`p-2 rounded-lg flex items-center justify-center transition ${
                      isDarkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    title="Edit Text"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
