import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AboutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former software engineer with 15+ years of experience in AI and machine learning. Passionate about making code more accessible.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Samantha Chen",
      role: "CTO",
      bio: "AI researcher and full-stack developer with a focus on natural language processing and code analysis.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Marcus Williams",
      role: "Lead Developer",
      bio: "Full-stack engineer specialized in building scalable web applications and developer tools.",
      image: "/api/placeholder/150/150"
    }
  ];

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
          <a href="/docs" className="text-gray-700 hover:text-gray-900 transition-colors">Docs</a>
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

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About ExplainMyCode
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building the future of code understanding with AI-powered tools that help developers debug faster, learn better, and code smarter.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Story</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-full md:w-1/2">
              <img src="https://w0.peakpx.com/wallpaper/588/656/HD-wallpaper-people-doing-office-works.jpg" alt="Team working together" className="rounded-lg shadow-md w-full" />
            </div>
            
            <div className="w-full md:w-1/2">
              <p className="text-gray-600 mb-4">
                ExplainMyCode was born out of frustration. As developers, we've all been there—staring at obscure error messages, trying to understand why our code isn't working, or spending hours debugging a complex function.
              </p>
              <p className="text-gray-600">
                We built ExplainMyCode to solve these problems. By combining advanced AI with deep programming knowledge, we created a tool that not only fixes code but explains it in human terms. Our mission is to make coding more accessible and less frustrating for everyone, from beginners to seasoned pros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We believe that understanding code should be accessible to everyone. Our mission is to democratize programming knowledge through intuitive AI tools that explain code in human terms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Empowering Beginners</h3>
              <p className="text-gray-600">
                Making programming more accessible by explaining code concepts in simple, understandable terms.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Boosting Productivity</h3>
              <p className="text-gray-600">
                Helping experienced developers debug faster and write cleaner code with instant analysis.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Continuous Learning</h3>
              <p className="text-gray-600">
                Creating tools that don't just fix problems but explain why they work, fostering deeper understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      {/* <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Meet the Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We're constantly pushing the boundaries of what's possible with AI and code analysis.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🔑</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Transparency</h3>
                <p className="text-gray-600">
                  We explain our processes and decisions clearly, both in our product and as a company.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">👥</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Community</h3>
                <p className="text-gray-600">
                  We believe in fostering a supportive community of developers helping each other grow.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">📈</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from our code to our customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Us on Our Mission
          </h2>
          <p className="mb-8">
            Be part of the community that's changing how developers understand and write code.
          </p>
          <button 
            onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-md inline-flex items-center hover:bg-gray-100 transition-colors"
          >
            Get Started Today
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
              <li><a href="/docs" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" onClick={() => toast.info("Blog is coming soon!")} className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" onClick={() => toast.info("Careers are coming soon!")} className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://www.linkedin.com/in/aayush-chouhan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
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