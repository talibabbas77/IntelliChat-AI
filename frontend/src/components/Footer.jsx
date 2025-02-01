import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const resourceLinks = [
    { name: "Documentation", path: "/" },
    { name: "API Reference", path: "/" },
    { name: "Blog", path: "/" },
    { name: "Support", path: "/" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/" },
    { name: "Terms of Service", path: "/" },
    { name: "Cookie Policy", path: "/" },
    { name: "Security", path: "/" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, path: "/" },
    { icon: <Twitter className="h-5 w-5" />, path: "/" },
    { icon: <Linkedin className="h-5 w-5" />, path: "/" },
    { icon: <Instagram className="h-5 w-5" />, path: "/" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              {/* Replace MessageCircle with your custom logo */}
              <img
                src="/logo.png" // Replace with the path to your logo file
                alt="Logo"
                className="h-8 w-8 transition-transform hover:rotate-12"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-[#ff40dc] bg-clip-text text-transparent">
                IntelliChat
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Making AI conversations more human, one chat at a time. Experience
              the future of intelligent communication with IntelliChat.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>talibali303@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+92 318 4189654</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} IntelliChat. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-8">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
