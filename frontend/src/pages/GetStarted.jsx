import React from "react";
import { Link } from "react-router-dom";
import { Zap, MessageSquare, Clock, ArrowRight } from "lucide-react";

const GetStartedPage = () => {
  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
              IntelliChat
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Your AI-powered chatbot designed to provide fast, accurate, and
            intelligent responses. Get started today and experience the future
            of conversational AI.
          </p>
          <Link
            to="/chat"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto w-fit"
          >
            Start Conversation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose IntelliChat?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Responses</h3>
              <p className="text-gray-600">
                IntelliChat uses advanced AI to provide accurate and
                context-aware responses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Chat with IntelliChat anytime, anywhere. It's always ready to
                assist you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast and Efficient</h3>
              <p className="text-gray-600">
                Get instant responses without any delays. IntelliChat is built
                for speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">
                Start a Conversation
              </h3>
              <p className="text-gray-600">
                Click "Get Started" and begin chatting with IntelliChat.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Ask Questions</h3>
              <p className="text-gray-600">
                Type your questions or prompts, and IntelliChat will respond
                instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Get Answers</h3>
              <p className="text-gray-600">
                Receive accurate and helpful answers powered by the Gemini API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Chat with IntelliChat?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven conversations. Click below to
              get started!
            </p>
            <Link
              to="/chat"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto w-fit"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedPage;
