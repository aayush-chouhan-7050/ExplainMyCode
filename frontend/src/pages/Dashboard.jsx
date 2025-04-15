import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDebugHistory } from "../api";
import api from "../api";
import {
  BugReport as BugIcon,
  Check as CheckIcon,
  LocalFireDepartment as FireIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDebugs: 0,
    successRate: 0,
    activeStreak: 0
  });
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, statsRes] = await Promise.all([
          getDebugHistory(),
          api.get("/api/stats")
        ]);
        setRecentHistory(historyRes.slice(0, 3));
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Here's your coding activity overview
          </p>
        </div>

        <div className="flex items-center space-x-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Debugs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-2">
            <div className="bg-indigo-100 p-2 rounded-md flex items-center justify-center mr-3">
              <BugIcon className="text-indigo-600" />
            </div>
            <span className="text-gray-600 text-sm">This month</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {stats.totalDebugs}
          </h2>
          <p className="text-gray-600">Total Debugs</p>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-md flex items-center justify-center mr-3">
              <CheckIcon className="text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Average</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {stats.successRate}%
          </h2>
          <p className="text-gray-600">Success Rate</p>
        </div>

        {/* Active Streak */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-2">
            <div className="bg-amber-100 p-2 rounded-md flex items-center justify-center mr-3">
              <FireIcon className="text-amber-600" />
            </div>
            <span className="text-gray-600 text-sm">Current</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {stats.activeStreak} Days
          </h2>
          <p className="text-gray-600">Active Streak</p>
        </div>
      </div>

      {/* Recent Debug History */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Recent Debug History
        </h2>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {recentHistory.length > 0 ? (
            recentHistory.map((item, index) => (
              <div key={index}>
                {index > 0 && <hr className="border-gray-100" />}
                <div
                  className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleNavigation(`/history/${item.id}`)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-md flex items-center justify-center mr-4 text-indigo-600 text-lg">
                      &lt;/&gt;
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.languages.join(" • ")}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-600">
              No recent debug history
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
