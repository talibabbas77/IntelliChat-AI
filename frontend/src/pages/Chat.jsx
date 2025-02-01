import React, { useState, useEffect, useRef } from "react";
import { Send, Loader, Copy, Edit, Trash2Icon, Bot } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { marked } from "marked";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : true;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (isAtBottomRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const savedChatsData = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(savedChatsData);

    if (savedChatsData.length > 0) {
      setCurrentChatId(savedChatsData.length - 1);
      setChatHistory(savedChatsData[savedChatsData.length - 1]);
    }
  }, []);

  // Save chats to localStorage whenever savedChats changes
  useEffect(() => {
    localStorage.setItem("savedChats", JSON.stringify(savedChats));
  }, [savedChats]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, currentResponse]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", checkIfAtBottom);
      return () => chatContainer.removeEventListener("scroll", checkIfAtBottom);
    }
  }, []);

  const checkIfAtBottom = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      isAtBottomRef.current = scrollHeight - scrollTop === clientHeight;
    }
  };

  const handleNewChat = () => {
    if (chatHistory.length > 0) {
      setSavedChats((prev) => [...prev, chatHistory]);
    }

    setChatHistory([]);
    setCurrentChatId(savedChats.length);
    setCurrentResponse("");
    setMessage("");
  };

  const handleDeleteChat = (index) => {
    setSavedChats((prev) => prev.filter((_, i) => i !== index));

    if (currentChatId === index) {
      const newIndex = Math.max(0, savedChats.length - 2);
      setCurrentChatId(newIndex);
      setChatHistory(savedChats[newIndex] || []);
    } else if (currentChatId > index) {
      setCurrentChatId(currentChatId - 1);
    }
  };

  const handleClearAllChats = () => {
    setSavedChats([]);
    setCurrentChatId(null);
    setChatHistory([]);
    localStorage.removeItem("savedChats"); // Clear chats from localStorage
  };

  const handleSelectChat = (index) => {
    if (chatHistory.length > 0) {
      setSavedChats((prev) => {
        const newChats = [...prev];
        if (currentChatId !== null) {
          newChats[currentChatId] = chatHistory;
        }
        return newChats;
      });
    }

    setCurrentChatId(index);
    setChatHistory(savedChats[index]);
    setMessage("");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please login first.");
      return;
    }

    if (!message.trim()) return;

    try {
      setIsTyping(true);
      setError("");
      setCurrentResponse("");

      const newChatHistory = [
        ...chatHistory,
        { type: "user", content: message },
      ];
      setChatHistory(newChatHistory);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/chat/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      let decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullResponse += chunk;
        setCurrentResponse((prev) => prev + chunk);
      }

      const updatedChatHistory = [
        ...newChatHistory,
        { type: "ai", content: fullResponse },
      ];
      setChatHistory(updatedChatHistory);

      setSavedChats((prev) => {
        const newChats = [...prev];
        if (currentChatId !== null) {
          newChats[currentChatId] = updatedChatHistory;
        } else {
          newChats.push(updatedChatHistory);
        }
        return newChats;
      });

      setCurrentResponse(""); // Clear currentResponse after adding to chatHistory
      setMessage("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!");
    });
  };

  const editMessage = (index) => {
    const messageToEdit = chatHistory[index];
    setMessage(messageToEdit.content);
  };

  const MessageBubble = ({ message, index }) => (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      } mb-4 w-full`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg overflow-x-auto ${
          message.type === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-200"
        }`}
      >
        {message.type === "ai" ? (
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: marked(message.content) }}
          />
        ) : (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => copyToClipboard(message.content)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <Copy className="w-4 h-4 text-gray-900 cursor-pointer" />
          </button>
          <button
            onClick={() => editMessage(index)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <Edit className="w-4 h-4 text-gray-900 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Sidebar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Chat Container */}
      <div
        className={`flex-1 flex flex-col transition-margin duration-300 absolute top-0 right-0 bottom-0 sm:left-0 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } sm:ml-16 md:ml-64 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div
          className={`p-4 pt-6 sm:p-7 border-b flex items-center ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Chat Title */}
          <h2
            className={`text-base sm:text-lg font-semibold flex items-center gap-1 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="whitespace-nowrap">Chat With AI...!</span>
          </h2>

          {/* Clear Conversation Button */}
          <button
            onClick={handleClearAllChats}
            className="flex items-center gap-1 ml-auto text-sm sm:text-lg text-red-500 hover:text-red-700 cursor-pointer"
          >
            <span className="hidden sm:inline">Clear Conversation</span>
            <Trash2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div
          ref={chatContainerRef}
          className={`flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          }`}
          style={{ overflowX: "hidden" }}
        >
          <div className="max-w-4xl mx-auto w-full">
            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}

            {chatHistory.map((msg, index) => (
              <MessageBubble key={index} message={msg} index={index} />
            ))}

            {isTyping && currentResponse && (
              <div className="flex justify-start mb-4 w-full">
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  } overflow-x-auto`}
                >
                  <div
                    className="prose dark:prose-invert max-w-full"
                    dangerouslySetInnerHTML={{
                      __html: marked(currentResponse),
                    }}
                  />
                </div>
              </div>
            )}

            {isTyping && !currentResponse && (
              <div
                className={`flex items-center gap-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Loader className="w-4 h-4 animate-spin" />
                AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={sendMessage}
          className={`flex gap-2 p-4 border-t flex-shrink-0 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
            }`}
          />
          <button
            type="submit"
            disabled={isTyping || !message.trim()}
            className={`px-4 py-2 rounded-lg transition-colors flex-shrink-0 ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
