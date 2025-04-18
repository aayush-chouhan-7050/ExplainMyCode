// src/components/MainLayout.jsx
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Code as CodeIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const MainLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar after navigation on mobile
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10 flex justify-between items-center">
        <a href="/dashboard" className="text-indigo-600 font-semibold text-xl">
          &lt;/&gt; ExplainMyCode
        </a>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-60 flex-shrink-0 bg-white border-r border-gray-200 
        flex flex-col p-6 transition-all duration-300 transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <a href="/dashboard" className="md:block hidden">
          <div className="text-indigo-600 font-semibold text-xl mb-8">
            &lt;/&gt; ExplainMyCode
          </div>
        </a>

        <div className="flex-grow mt-14 md:mt-0">
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

      {/* Main Content - Add padding-top on mobile for the header */}
      <div className="flex-grow bg-gray-50 p-6 overflow-y-auto pt-20 md:pt-6 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
