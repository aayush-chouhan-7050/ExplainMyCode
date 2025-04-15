import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
          <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#docs" className="text-gray-700 hover:text-gray-900 transition-colors">Docs</a>
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
              Sign In
            </button>
          )}
          <button 
            onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Try for Free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Understand Your Code Like Never Before
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered code analysis that helps you debug faster, learn better, and code smarter. Get
            instant explanations and fixes for your code.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
            >
              Start Debugging Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              className="flex items-center justify-center px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Watch product demo video"
            >
              Watch Demo
              <Play className="ml-2 h-5 w-5 fill-current" />
            </button>
          </div>
          
          {/* Code Example */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 text-left max-w-2xl mx-auto">
            <div className="flex gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-auto text-xs text-gray-400">main.js</div>
            </div>
            <pre className="text-gray-100 text-sm overflow-x-auto">
              <code>
                {`function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}`}
              </code>
            </pre>
          </div>

          {/* Error Explanation Hint */}
          <button className="flex items-center justify-center mt-4 text-indigo-600 hover:text-indigo-700 mx-auto transition-colors">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-indigo-600 text-xs">?</span>
            </div>
            <span className="text-sm">Error Explanation</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6" id="features" aria-labelledby="features-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-4 text-gray-900">
            Powerful Features for Developers
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to understand and improve your code
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Error Detection</h3>
              <p className="text-gray-600">
                Automatically identifies bugs and potential issues in your code before they cause problems.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Clear Explanations</h3>
              <p className="text-gray-600">
                Get human-friendly explanations of what your code does and how to improve it.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-indigo-600 text-xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant Fixes</h3>
              <p className="text-gray-600">
                Get suggestions for fixing errors and improving code quality with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6 bg-gray-50" id="how-it-works" aria-labelledby="how-it-works-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-center mb-4 text-gray-900">
            How ExplainMyCode Works
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Three simple steps to better code understanding
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4">
                <span>1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Paste Your Code</h3>
              <p className="text-gray-600">
                Simply paste your code snippet into our editor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4">
                <span>2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your code for errors and improvements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4">
                <span>3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed explanations and suggested fixes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Write Better Code?
          </h2>
          <p className="mb-8">
            Join thousands of developers who are writing better code with ExplainMyCode.
          </p>
          <button 
            onClick={() => user ? handleNavigation('/debug') : handleNavigation('/login')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-md inline-flex items-center hover:bg-gray-100 transition-colors"
          >
            Start Using ExplainMyCode
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
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
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