import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const toggleForm = (loginMode) => {
    setIsLogin(loginMode);
    // Reset form when toggling
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
    setRememberMe(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Login successful!");
      } else {
        if (!username.trim()) {
          toast.error("Please enter a username");
          setLoading(false);
          return;
        }
        await register(email, password, username);
        toast.success("Registration successful!");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Hidden on small screens, visible on md and up */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-6 md:p-12 flex-col relative">
        <div 
          className="text-white text-xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          &lt;/&gt; ExplainMyCode
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Write Better Code with<br />AI-Powered Analysis
          </h1>
          <p className="text-white text-base md:text-lg mb-8">
            Join thousands of developers who use<br />
            ExplainMyCode to debug faster and code smarter.
          </p>

          <div className="mt-8">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg" 
                  alt="Alex Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-medium">Alex Chen</div>
                <div className="text-indigo-200 text-sm">Senior Developer @ Tech Co</div>
              </div>
            </div>
            <blockquote className="text-white italic">
              "ExplainMyCode has become an essential tool 
              in my development workflow. It's like having a 
              senior developer looking over your shoulder 24/7."
            </blockquote>
          </div>
        </div>
      </div>

      {/* Mobile Header - Only visible on small screens */}
      <div className="md:hidden bg-indigo-600 p-4">
        <div 
          className="text-white text-xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          &lt;/&gt; ExplainMyCode
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white p-4 md:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="flex mb-6 md:mb-8">
            <button 
              className={`w-1/2 py-2 md:py-3 px-2 md:px-4 text-center font-medium ${isLogin ? 'bg-indigo-600 text-white rounded-md' : 'text-gray-600'}`}
              onClick={() => toggleForm(true)}
            >
              Sign In
            </button>
            <button 
              className={`w-1/2 py-2 md:py-3 px-2 md:px-4 text-center font-medium ${!isLogin ? 'bg-indigo-600 text-white rounded-md' : 'text-gray-600'}`}
              onClick={() => toggleForm(false)}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-1 md:mb-2">
                  Username 
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1 md:mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1 md:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 md:mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              {isLogin && (
                <div className="text-sm">
                  <a href="#" onClick={() => toast.error("This section is under development") } className="text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 md:py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
              >
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>

            <div className="mt-3 md:mt-4 text-center text-sm">
              {isLogin ? (
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                    onClick={() => toggleForm(false)}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                    onClick={() => toggleForm(true)}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>

            {/* Social Login Options */}
            <div className="mt-4 md:mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  onClick={() => toast.error("Feature not available yet")} 
                  className="w-full inline-flex justify-center py-2 px-3 md:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {/* GitHub Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12C0 17.303 3.438 21.8 8.205 23.385C8.805 23.48 9.025 23.145 9.025 22.845C9.025 22.575 9.015 21.905 9.01 21.065C5.672 21.785 4.968 19.525 4.968 19.525C4.422 18.135 3.633 17.765 3.633 17.765C2.546 17.045 3.717 17.06 3.717 17.06C4.922 17.145 5.555 18.305 5.555 18.305C6.63 20.105 8.408 19.595 9.048 19.295C9.138 18.515 9.45 17.985 9.795 17.685C7.14 17.385 4.344 16.315 4.344 11.635C4.344 10.295 4.824 9.205 5.63 8.365C5.505 8.065 5.085 6.805 5.745 5.105C5.745 5.105 6.765 4.785 8.995 6.355C9.975 6.075 11.025 5.935 12.075 5.93C13.125 5.935 14.175 6.075 15.155 6.355C17.385 4.785 18.405 5.105 18.405 5.105C19.065 6.805 18.645 8.065 18.52 8.365C19.33 9.205 19.805 10.295 19.805 11.635C19.805 16.325 17.005 17.38 14.34 17.675C14.775 18.045 15.165 18.795 15.165 19.935C15.165 21.555 15.15 22.515 15.15 22.845C15.15 23.15 15.375 23.49 15.985 23.385C20.755 21.795 24 17.295 24 12C24 5.373 18.627 0 12 0Z" />
                  </svg>
                </button>

                <button 
                  type="button" 
                  onClick={() => toast.error("Feature not available yet")} 
                  className="w-full inline-flex justify-center py-2 px-3 md:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {/* Google Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272v95.3h146.9c-6.3 34.1-25.3 63-53.9 82.3v68h86.9c50.8-46.8 81.6-115.8 81.6-195.3z"/>
                    <path fill="#34A853" d="M272 544.3c72.6 0 133.5-24.1 178-65.4l-86.9-68c-24.1 16.1-55 25.7-91.1 25.7-69.9 0-129.2-47.2-150.4-110.3H31.1v69.6c44.5 87.9 135.3 148.4 240.9 148.4z"/>
                    <path fill="#FBBC05" d="M121.9 271.1c0-13.5 1.3-26.4 3.7-38.4V164H31.1v68h58.5c-3.8 10.7-5.9 22.3-5.9 34.1 0 11.7 2.1 23.4 5.9 34.1H31.1v68h58.5c21.1-63.1 80.4-110.3 150.4-110.3z"/>
                    <path fill="#EA4335" d="M272 106.3c38.3 0 70.8 12.9 97.7 34.7l72.7-72.7C419.3 36.4 347.6 16.5 272 16.5c-105.5 0-196.4 60.5-240.9 148.4l58.5 68c21.2-63.1 80.5-110.3 150.4-110.3z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

