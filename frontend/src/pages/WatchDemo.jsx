import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function WatchDemo() {
  const navigate = useNavigate();
  const googleDriveFileId = "1u_qArVD6mmSZdR0Q6DvKFr28quI_NzNR";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-700 hover:text-indigo-600 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-indigo-600 font-semibold text-xl">
            &lt;/&gt; ExplainMyCode
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col py-8 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            ExplainMyCode Demo
          </h1>
          
          {/* Google Drive Video Player */}
          <div className="bg-black rounded-lg overflow-hidden shadow-xl mb-8 relative">
            <div className="aspect-video w-full">
              <iframe 
                src={`https://drive.google.com/file/d/${googleDriveFileId}/preview`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="ExplainMyCode Demo Video"
              ></iframe>
            </div>
          </div>
          
          {/* Video Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              How ExplainMyCode Works
            </h2>
            <p className="text-gray-600 mb-6">
              This demo walks you through how to use ExplainMyCode to analyze your code, 
              identify issues, and get clear explanations and suggested fixes. Learn how our 
              AI-powered platform can help you write better code and become a more effective developer.
            </p>
        
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="mb-8">
            Join thousands of developers who are writing better code with ExplainMyCode.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ExplainMyCode. All rights reserved.
          </div>
          <div className="flex space-x-4">
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