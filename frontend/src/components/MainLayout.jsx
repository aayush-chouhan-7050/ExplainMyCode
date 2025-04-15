// src/components/MainLayout.jsx
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Code as CodeIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

const MainLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {/* Sidebar  */}
      <div className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col p-6">
        <div className="text-indigo-600 font-semibold text-xl mb-8">
          &lt;/&gt; ExplainMyCode
        </div>

        <div className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  isActive("/dashboard")
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
                onClick={() => handleNavigation("/dashboard")}
              >
                <DashboardIcon className="mr-3" fontSize="small" />
                <span>Dashboard</span>
              </button>
            </li>

            <li>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  isActive("/debug")
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
                onClick={() => handleNavigation("/debug")}
              >
                <CodeIcon className="mr-3" fontSize="small" />
                <span>Code Debugger</span>
              </button>
            </li>

            <li>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  isActive("/history")
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
                onClick={() => handleNavigation("/history")}
              >
                <HistoryIcon className="mr-3" fontSize="small" />
                <span>Debug History</span>
              </button>
            </li>

            <li>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  isActive("/profile")
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
                onClick={() => handleNavigation("/profile")}
              >
                <PersonIcon className="mr-3" fontSize="small" />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={logout}
          className="flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-indigo-50 transition-colors"
        >
          <LogoutIcon className="mr-3" fontSize="small" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
