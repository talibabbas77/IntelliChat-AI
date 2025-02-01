import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import GetStartedPage from "./pages/GetStarted";
import PrivateRoute from "./components/PrivateRoute";
import Chat from "./pages/Chat";
import Summarizer from "./pages/Summarizer";
import Rephraser from "./pages/Rephraser";
import CustomBot from "./pages/CustomBot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const AppContent = () => {
  const location = useLocation();
  const isChatPage = [
    "/chat",
    "/summarizer",
    "/rephraser",
    "/custom",
    "/login",
    "/signup",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#363636",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          success: {
            duration: 4000,
            style: {
              border: "1px solid #68D391",
            },
          },
          error: {
            duration: 5000,
            style: {
              border: "1px solid #FC8181",
            },
          },
        }}
      />
      {!isChatPage && <Navbar />}
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
          <Route
            path="/summarizer"
            element={<PrivateRoute element={<Summarizer />} />}
          />
          <Route
            path="/rephraser"
            element={<PrivateRoute element={<Rephraser />} />}
          />
          <Route
            path="/custom"
            element={<PrivateRoute element={<CustomBot />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={() => <h1>Page Not Found</h1>} />
        </Routes>
      </main>
      {!isChatPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
