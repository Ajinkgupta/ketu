import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = ({ theme }) => {
  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-gradient-to-br from-[#e6e6fa] to-[#b0e0e6]' : 'bg-gradient-to-br from-[#1e1e2f] to-[#2a1b3d]'} transition-colors duration-500`}>
      <div className="flex-grow p-8">
        <Link to="/" className={`flex items-center mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Settings</h1>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#2d2d44]'} rounded-lg shadow-lg p-6`}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`} htmlFor="username">
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`} htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-bold mb-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`} htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'light' ? 'text-[#4a90e2] bg-[#f0e6fa]' : 'text-[#7f7fd5] bg-[#3d3d5c]'} leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`flex items-center justify-between px-4 py-2 ${theme === 'light' ? 'bg-[#4a90e2] text-white' : 'bg-[#7f7fd5] text-[#2d2d44]'} rounded-lg`}
              type="button"
            >
              <Save className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;