import React from "react";
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, Clock, FileCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SecurityPage() {
  const navigate = useNavigate();

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
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Security at ExplainMyCode
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            We prioritize the security of your code and personal data. Learn about the measures we take to protect your information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Our Security Commitment</h2>
            <p className="text-gray-700 mb-6">
              At ExplainMyCode, we understand that your code is valuable intellectual property. We've implemented comprehensive security measures to ensure that your data remains safe, private, and accessible only to you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex">
                <div className="mr-4">
                  <ShieldCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Data Protection</h3>
                  <p className="text-gray-700">
                    All your code and personal information is encrypted both in transit and at rest using industry-standard encryption protocols.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <Lock className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Authentication</h3>
                  <p className="text-gray-700">
                    We employ robust authentication mechanisms, including multi-factor authentication options to protect your account.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <Eye className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Privacy Controls</h3>
                  <p className="text-gray-700">
                    You maintain full control over your data with granular privacy settings and code visibility options.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <Server className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Infrastructure</h3>
                  <p className="text-gray-700">
                    Our application is hosted on enterprise-grade cloud infrastructure with regular security audits and penetration testing.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Code Security</h2>
            
            <div className="flex mb-6">
              <div className="mr-4">
                <FileCode className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">How We Handle Your Code</h3>
                <p className="text-gray-700 mb-4">
                  We understand that your code is sensitive intellectual property. Here's how we protect it:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your code is encrypted during transmission and storage</li>
                  <li>Access to your code is strictly limited to you and those you explicitly authorize</li>
                  <li>We do not use your code to train our AI models without your explicit consent</li>
                  <li>You can delete your code from our systems at any time</li>
                </ul>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Data Retention</h3>
                <p className="text-gray-700 mb-4">
                  We only retain your code for as long as necessary to provide our services or as required by law. You can request deletion of your data at any time through your account settings.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Security Practices</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Regular Security Audits</h3>
                <p className="text-gray-700">
                  We conduct regular security audits and vulnerability assessments to identify and address potential security issues before they can be exploited.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Employee Access Controls</h3>
                <p className="text-gray-700">
                  Our team operates on a strict need-to-know basis with limited access to production systems and customer data. All employee access is logged and monitored.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Incident Response</h3>
                <p className="text-gray-700">
                  We have a comprehensive incident response plan in place to quickly address any security incidents and minimize potential impact.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Security Updates</h3>
                <p className="text-gray-700">
                  We maintain a rigorous patch management process to ensure that all systems are up-to-date with the latest security patches.
                </p>
              </div>
            </div>
          </section>
          
          {/* <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Have a Security Concern?</h3>
            <p className="text-gray-700 mb-6">
              If you discover a potential security issue, please contact us immediately at <a href="mailto:security@explainmycode.com" className="text-indigo-600 hover:text-indigo-800">security@explainmycode.com</a>
            </p>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ExplainMyCode. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}