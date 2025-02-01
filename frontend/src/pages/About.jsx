import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Heart,
  Shield,
  ArrowRight,
  MessageSquare,
  Award,
  Clock,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Conversations" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Security",
      description:
        "We prioritize user privacy and data security in every conversation.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "User-Centric",
      description:
        "Every feature we develop is inspired by user needs and feedback.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Innovation",
      description: "Continuously pushing the boundaries of AI technology.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "IntelliChat Launch",
      description: "Successfully launched our AI chatbot platform.",
    },
    {
      year: "2024",
      title: "Gemini Integration",
      description: "Integrated Google's Gemini for enhanced capabilities.",
    },
    {
      year: "2024",
      title: "50K Users Milestone",
      description: "Reached 50,000 active users globally.",
    },
  ];

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making AI Conversations{" "}
            <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
              Human-Centric
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            IntelliChat was born from a vision to make AI interactions more
            natural, intuitive, and meaningful for everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                IntelliChat began with a simple yet powerful idea: to make AI
                conversations as natural and helpful as talking to a
                knowledgeable friend. We believed that AI should be accessible,
                understanding, and truly helpful to everyone.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of AI experts, developers, and user experience
                designers came together to create a platform that combines
                cutting-edge technology with intuitive design, making advanced
                AI accessible to users worldwide.
              </p>
              <p className="text-gray-600">
                Today, we're proud to help thousands of users engage with AI in
                meaningful ways, whether they're learning, problem-solving, or
                exploring new ideas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl bg-white shadow-md ${
                    index === 2 ? "col-span-2" : ""
                  }`}
                >
                  <div className="text-blue-600 font-bold mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the future of AI conversation with IntelliChat. Start
              your journey today and be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-white px-8 py-3 rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
