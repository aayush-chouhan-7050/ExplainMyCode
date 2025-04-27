import React, { useState } from "react";
import { ArrowRight, Search, ChevronRight, Book, Code, Terminal, Settings, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function DocsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Documentation sections
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="h-5 w-5" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-4">Welcome to ExplainMyCode</h3>
          <p className="mb-4">
            ExplainMyCode is an AI-powered code analysis tool that helps developers understand, debug, and improve their code. This documentation will help you get started with our platform.
          </p>
          <h4 className="text-xl font-semibold mt-6 mb-3">Quick Start</h4>
          <ol className="list-decimal ml-5 space-y-2 mb-6">
            <li>Create an account or log in to ExplainMyCode</li>
            <li>Navigate to the debug section</li>
            <li>Paste your code in the editor</li>
            <li>Click "Analyze" to get AI-powered insights</li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold">💡 Pro Tip</p>
            <p className="text-sm text-gray-600">
              For the best results, include all relevant code that might impact the execution of the specific section you want to analyze.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "features",
      title: "Features",
      icon: <Star className="h-5 w-5" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-4">Features</h3>
          <p className="mb-6">
            ExplainMyCode offers a wide range of features to help you understand and improve your code:
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Smart Error Detection</h4>
              <p className="text-gray-600">
                Our AI automatically identifies bugs, syntax errors, and potential issues in your code before they cause problems in production.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-2">Clear Explanations</h4>
              <p className="text-gray-600">
                Get human-friendly explanations of what your code does, how it works, and detailed breakdowns of complex functions and classes.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-2">Instant Fixes</h4>
              <p className="text-gray-600">
                Receive suggestions for fixing errors and improving code quality with one-click implementation.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-2">Code History</h4>
              <p className="text-gray-600">
                Access your previous debugging sessions and track your progress over time.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: <Code className="h-5 w-5" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-4">API Reference</h3>
          <p className="mb-6">
            Integrate ExplainMyCode directly into your development workflow with our powerful API.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <pre className="text-gray-100 text-sm overflow-x-auto">
              <code>
                {`// Example API request
fetch('https://api.explainmycode.com/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    code: 'your code here',
    language: 'javascript'
  })
})`}
              </code>
            </pre>
          </div>
          
          <h4 className="text-xl font-semibold mb-3">Authentication</h4>
          <p className="mb-4 text-gray-600">
            All API requests require authentication using your API key. You can find your API key in your account settings.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Rate Limits</h4>
          <p className="mb-4 text-gray-600">
            Free accounts are limited to 100 requests per day. Premium accounts have higher or unlimited API access depending on your subscription level.
          </p>
        </>
      ),
    },
    {
      id: "cli",
      title: "CLI Tool",
      icon: <Terminal className="h-5 w-5" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-4">Command Line Interface</h3>
          <p className="mb-6">
            Use ExplainMyCode directly from your terminal with our powerful CLI tool.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <pre className="text-gray-100 text-sm overflow-x-auto">
              <code>
                {`# Install the CLI tool
npm install -g explainmycode-cli

# Analyze a file
explainmycode analyze path/to/your/file.js

# Get help
explainmycode --help`}
              </code>
            </pre>
          </div>
          
          <h4 className="text-xl font-semibold mb-3">Installation</h4>
          <p className="mb-4 text-gray-600">
            Our CLI tool is available through npm and works on Windows, macOS, and Linux.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Configuration</h4>
          <p className="mb-4 text-gray-600">
            You can configure the CLI tool using a configuration file in your project directory or global settings.
          </p>
        </>
      ),
    },
    {
      id: "settings",
      title: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
      content: (
        <>
          <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
          <p className="mb-6">
            Manage your ExplainMyCode account and preferences.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Profile Information</h4>
          <p className="mb-4 text-gray-600">
            Update your name, email, and other profile information in the Profile section of your account settings.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Subscription Management</h4>
          <p className="mb-4 text-gray-600">
            View and manage your current subscription plan, billing information, and payment history.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">API Keys</h4>
          <p className="mb-4 text-gray-600">
            Generate and manage API keys for integrating ExplainMyCode with your development tools.
          </p>
          
          <h4 className="text-xl font-semibold mb-3">Notification Settings</h4>
          <p className="mb-4 text-gray-600">
            Configure email notifications and system alerts according to your preferences.
          </p>
        </>
      ),
    },
  ];

  // State to track active section
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        <a href="/">
          <div className="flex items-center">
            <div className="text-indigo-600 font-semibold text-xl">
              &lt;/&gt; ExplainMyCode
            </div>
          </div>
        </a>
        <nav className="hidden md:flex space-x-8">
          <a href="/#features" className="text-gray-700 hover:text-gray-900 transition-colors">Features</a>
          <a href="/#how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="/docs" className="text-indigo-600 font-medium">Docs</a>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <button 
              onClick={() => handleNavigation('/dashboard')} 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </button>
          ) : (
            <button 
              onClick={() => handleNavigation('/login')} 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign Up
            </button>
          )}
          <button 
            onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      {/* Documentation Hero */}
      <section className="bg-gray-50 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Documentation
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn how to use ExplainMyCode to improve your coding skills and productivity
          </p>
          
          {/* Search Box */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-sm transition-all"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-md mr-3">
                    {section.icon}
                  </div>
                  <span className="font-medium">{section.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Documentation Content */}
      <section className="flex-grow flex flex-col md:flex-row px-6 py-8">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <div className="sticky top-8">
            <h3 className="font-semibold mb-4 text-gray-900">Contents</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === section.id
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="mr-3">{section.icon}</div>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="w-full md:w-3/4 md:pl-8">
          <div className="max-w-3xl">
            {sections.find(section => section.id === activeSection)?.content}
            
            {/* Next/Previous Navigation */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
                  setActiveSection(sections[prevIndex].id);
                }}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  const nextIndex = (currentIndex + 1) % sections.length;
                  setActiveSection(sections[nextIndex].id);
                }}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Was this helpful */}
      <section className="bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Was this documentation helpful?</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => toast.success("Thank you for your feedback!")}
              className="bg-white border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => toast.info("We'll work on improving our documentation. Thanks for letting us know!")}
              className="bg-white border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              No
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Need more help? <a href="#" onClick={() => toast.info("Support coming soon!")} className="text-indigo-600 hover:text-indigo-700">Contact support</a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try ExplainMyCode?
          </h2>
          <p className="mb-8">
            Start debugging and improving your code with our AI-powered tool today.
          </p>
          <button 
            onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-md inline-flex items-center hover:bg-gray-100 transition-colors"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-semibold mb-4">
              &lt;/&gt; ExplainMyCode
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered code analysis tool that helps developers write better code.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/docs"  className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about"  className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" onClick={() => toast.info("Blog is coming soon!")} className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" onClick={() => toast.info("Careers are coming soon!")} className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://www.linkedin.com/in/aayush-chouhan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy"  className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms"  className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="/security"  className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 ExplainMyCode. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/aayush-chouhan-7050" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aayush-chouhan/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}