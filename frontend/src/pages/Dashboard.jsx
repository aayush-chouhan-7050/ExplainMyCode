import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getDebugHistory, getCurrentUser } from "../api";
import {
  BugReport as BugIcon,
  Check as CheckIcon,
  LocalFireDepartment as FireIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";
import { formatDistanceToNow } from 'date-fns';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // from context
  const [userData, setUserData] = useState(null); // local fetched user
  const [loading, setLoading] = useState(true);
  const [recentHistory, setRecentHistory] = useState([]);
  const [userLoading, setUserLoading] = useState(true); // Separate loading state for user data
  const [fullHistory, setFullHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Don't proceed if no user data is available
      try {
        setLoading(true); // Set loading to true before making the API call
        const historyRes = await getDebugHistory();
        setFullHistory(historyRes);
        setRecentHistory(historyRes.slice(0, 3)); // Slice the history to get the most recent 3 items
      } catch (error) {
        console.error("Failed to fetch debug history:", error); // Improved error message
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchData();
  }, [user]); // Trigger this effect when `user` state changes

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true); // Set user loading to true
        const data = await getCurrentUser();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error); // Handle error during fetching user data
      } finally {
        setUserLoading(false); // Set user loading to false once the request completes
      }
    };
    fetchUser();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffHours = Math.round((now - date) / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.round((now - date) / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
  };

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Welcome back, {userData?.username || "User"}!
          </h1>
          <p className="text-gray-600">
            Here's your coding activity overview
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-normal md:space-x-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <NotificationsIcon />
          </button>
          <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={user?.avatar || "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"}
              alt="User Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Total Debugs */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center mb-2">
            <div className="bg-indigo-100 p-2 rounded-md flex items-center justify-center mr-3">
              <BugIcon className="text-indigo-600" />
            </div>
            <span className="text-gray-600 text-sm">This month</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{fullHistory.length}</h2>
          <p className="text-gray-600">Total Debugs</p>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-md flex items-center justify-center mr-3">
              <CheckIcon className="text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Average</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">N/A</h2>
          <p className="text-gray-600">Success Rate</p>
        </div>

        {/* Active Streak */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center mb-2">
            <div className="bg-amber-100 p-2 rounded-md flex items-center justify-center mr-3">
              <FireIcon className="text-amber-600" />
            </div>
            <span className="text-gray-600 text-sm">Current</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">N/A</h2>
          <p className="text-gray-600">Active Streak</p>
        </div>
      </div>

      {/* Recent Debug History */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Recent Debug History
          </h2>
          
          <button 
            onClick={() => handleNavigation('/history')}
            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {recentHistory.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentHistory.map((entry) => (
                <div key={entry._id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleNavigation(`/history`)}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <span className="px-2 py-1 text-xs border border-indigo-500 text-indigo-600 rounded-full w-fit">
                      {entry.language}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-sm overflow-hidden max-h-32">
                    <SyntaxHighlighter 
                      language={entry.language?.toLowerCase() || 'javascript'} 
                      style={materialLight}
                      customStyle={{
                        margin: 0,
                        padding: '0.75em',
                        fontSize: '0.8rem',
                        lineHeight: '1.2',
                        borderRadius: '0.375rem',
                        maxHeight: '8rem'
                      }}
                    >
                      {entry.code.length > 150 ? `${entry.code.substring(0, 150)}...` : entry.code}
                    </SyntaxHighlighter>
                  </div>
                  
                  {entry.result?.explanation && (
                    <div className="mt-2 text-xs text-gray-600 line-clamp-2">
                      <strong>Issue:</strong> {entry.result.explanation.substring(0, 100)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 md:p-6 text-center text-gray-600">
              You haven't debugged any code yet. Start debugging to see your history!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;