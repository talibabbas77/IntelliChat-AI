import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Sparkles,
  Brain,
  Zap,
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";

const Home = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const chatMessages = [
    "How can I help you today?",
    "I can assist with data analysis.",
    "Let me help with your research.",
    "I can answer your questions.",
  ];

  // Auto-rotate chat messages
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % chatMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI",
      description:
        "Powered by Google's Gemini, offering cutting-edge language understanding and generation",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Responses",
      description:
        "Get instant, accurate answers to your questions with minimal latency",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Learning",
      description:
        "Adapts to your interaction style for more personalized responses",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
                Experience the Future of Conversation with IntelliChat
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Harness the power of Gemini AI for intelligent, natural, and
                meaningful conversations. Your personal AI assistant is just a
                message away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/get-started"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Try Now <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/features"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right side chat demo */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-1 mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold">IntelliChat Demo</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="bg-blue-100 rounded-lg p-3 flex-1">
                      <p className="text-gray-800">
                        {chatMessages[currentMessage]}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onFocus={() => setIsMessageVisible(true)}
                    />
                    <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <Link to={"/get-started"}>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose IntelliChat?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-10 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience Smarter Conversations?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent text-white px-8 py-3 rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
