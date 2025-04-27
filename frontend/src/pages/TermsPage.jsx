import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
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

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Terms of Service</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using ExplainMyCode ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              ExplainMyCode provides AI-powered code analysis, explanation, and debugging services. We reserve the right to modify or discontinue, temporarily or permanently, the Service with or without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are owned by ExplainMyCode and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">5. User Content</h2>
            <p className="text-gray-700 mb-4">
              You retain all rights to the code you submit to our Service. However, by submitting code, you grant us the right to analyze, process, and store it for the purpose of providing our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall ExplainMyCode, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Last updated: April 27, 2025
            </p>
          </div>
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