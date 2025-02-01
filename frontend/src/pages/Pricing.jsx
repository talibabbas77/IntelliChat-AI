import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Zap,
  Users,
  MessageSquare,
  Clock,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: {
        monthly: 0,
        annual: 0,
      },
      description: "Perfect for trying out IntelliChat",
      features: [
        "Up to 100 messages per month",
        "Basic AI responses",
        "Standard response time",
        "Community support",
        "Basic integrations",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: {
        monthly: 29,
        annual: 19,
      },
      description: "Ideal for professionals and small teams",
      features: [
        "Unlimited messages",
        "Priority response time",
        "Advanced AI capabilities",
        "Email + Live chat support",
        "Advanced integrations",
        "Custom AI training",
        "Analytics dashboard",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "primary",
      popular: true,
    },
    {
      name: "Enterprise",
      price: {
        monthly: 99,
        annual: 79,
      },
      description: "For organizations requiring maximum capabilities",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI model training",
        "99.9% SLA",
        "Advanced security features",
        "API access",
        "SSO integration",
        "24/7 phone support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
    },
  ];

  const PricingCard = ({ plan }) => (
    <div
      className={`bg-white rounded-2xl p-8 shadow-lg ${
        plan.popular ? "ring-2 ring-blue-600 relative" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">
          ${isAnnual ? plan.price.annual : plan.price.monthly}
        </span>
        <span className="text-gray-600">/month</span>
      </div>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      <Link
        to="/get-started"
        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg mb-6 transition-colors duration-300 ${
          plan.buttonVariant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
        }`}
      >
        {plan.buttonText}
      </Link>
      <ul className="space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-blue-600 to-[#fc03cf] bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm ${
                !isAnnual ? "text-gray-600" : "text-blue-600 font-medium"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform duration-300 ${
                  isAnnual ? "right-1" : "left-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                isAnnual ? "text-gray-600" : "text-blue-600 font-medium"
              }`}
            >
              Annual
              <span className="ml-1 text-green-500 font-medium">Save 35%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Try IntelliChat free for 14 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent text-white px-8 py-3 rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
