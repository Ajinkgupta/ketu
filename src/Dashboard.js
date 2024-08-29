import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Home, History, ChevronDown } from 'lucide-react';

const Dashboard = ({ theme, toggleTheme }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const dummyHistory = [
    { id: 1, name: 'Sanskrit Grammar Dataset', date: '2023-06-15' },
    { id: 2, name: 'Ancient Astronomy Data', date: '2023-06-14' },
    { id: 3, name: 'Vedic Mathematics Corpus', date: '2023-06-13' },
  ];

  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-gradient-to-br from-[#e6e6fa] to-[#b0e0e6]' : 'bg-gradient-to-br from-[#1e1e2f] to-[#2a1b3d]'} transition-colors duration-500`}>
      {/* Sidebar */}
      <div className={`w-64 ${theme === 'light' ? 'bg-[#f0e6fa]' : 'bg-[#2d2d44]'} p-6 flex flex-col`}>
        <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} mb-8`}>Ketu AI</h1>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li>
              <button onClick={() => navigate('/')} className={`flex items-center ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
                <Home className="mr-2" /> Home
              </button>
            </li>
            <li>
              <Link to="/settings" className={`flex items-center ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
                <Settings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              <Link to="/job-history" className={`flex items-center ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
                <History className="mr-2" /> Job History
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={toggleTheme} className={`mt-auto p-2 rounded-full ${theme === 'light' ? 'bg-[#4a90e2] text-white' : 'bg-[#7f7fd5] text-[#2d2d44]'}`}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center justify-between w-64 px-4 py-2 ${theme === 'light' ? 'bg-[#4a90e2] text-white' : 'bg-[#7f7fd5] text-[#2d2d44]'} rounded-lg`}
            >
              <span>Create Workflow</span>
              <ChevronDown />
            </button>
            {showDropdown && (
              <div className={`absolute w-64 mt-2 py-2 ${theme === 'light' ? 'bg-white' : 'bg-[#3d3d5c]'} rounded-lg shadow-xl`}>
                <Link to="/chat" className={`block px-4 py-2 ${theme === 'light' ? 'text-[#4a90e2] hover:bg-[#f0e6fa]' : 'text-[#7f7fd5] hover:bg-[#2d2d44]'}`}>
                  Create using Assistant
                </Link>
                <Link to="/create-manually" className={`block px-4 py-2 ${theme === 'light' ? 'text-[#4a90e2] hover:bg-[#f0e6fa]' : 'text-[#7f7fd5] hover:bg-[#2d2d44]'}`}>
                  Create Manually
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#2d2d44]'} rounded-lg shadow-lg p-6`}>
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Recent History</h2>
          <ul className="space-y-4">
            {dummyHistory.map(item => (
              <li key={item.id} className={`flex items-center justify-between ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>
                <span>{item.name}</span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;