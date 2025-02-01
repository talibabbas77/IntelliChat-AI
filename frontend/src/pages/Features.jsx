import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Zap,
  Lock,
  Globe,
  MessageSquare,
  Code,
  Database,
  Cpu,
  ArrowRight,
  Check,
} from "lucide-react";

const FeatureCard = ({ icon, title, description, isMain }) => (
  <div
    className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl ${
      isMain ? "bg-blue-50 border-2 border-blue-200" : "bg-white shadow-md"
    }`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-blue-100 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const mainFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI Understanding",
      description:
        "Powered by Google's Gemini, our AI understands context, nuances, and complex queries with remarkable accuracy.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Natural Conversations",
      description:
        "Engage in fluid, human-like conversations with contextual awareness and memory of previous interactions.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Processing",
      description:
        "Get instant responses with minimal latency, making conversations feel natural and immediate.",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multilingual Support",
      description:
        "Communicate in multiple languages with accurate translations and cultural understanding.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Security First",
      description:
        "Enterprise-grade encryption and privacy protection for all your conversations.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Understanding",
      description:
        "Analyze, explain, and help debug code across multiple programming languages.",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Knowledge Base",
      description:
        "Access to vast knowledge covering science, history, technology, and more.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Custom Integration",
      description:
        "Easy integration with your existing systems through our robust API.",
    },
  ];

  const capabilities = [
    "Advanced language understanding",
    "Context-aware responses",
    "Code analysis and generation",
    "Data analysis and visualization",
    "Document summarization",
    "Mathematical problem-solving",
    "Real-time language translation",
    "Custom knowledge base integration",
  ];

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
              Intelligent Conversations
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how IntelliChat's advanced features can transform your
            interaction with AI, making conversations more natural, efficient,
            and productive.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} isMain={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities List */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            More Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Start using IntelliChat today and discover how our advanced
              features can transform your AI interactions.
            </p>
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

export default Features;
