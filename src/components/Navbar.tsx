import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, Heart, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col h-full items-center py-6">
        <div className="mb-8">
          <Heart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <div className="space-y-6 flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }
            title="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </NavLink>
          
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }
            title="Contacts"
          >
            <Users className="w-5 h-5" />
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </NavLink>
        </div>

        <div className="mt-auto space-y-6">
          <ThemeToggle />
          
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;