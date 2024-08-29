import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import ChatInterface from './ChatInterface';
import CreateManually from './CreateManually';
import Settings from './Settings';
import JobHistory from './JobHistory';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/chat" element={<ChatInterface theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/create-manually" element={<CreateManually theme={theme} />} />
          <Route path="/settings" element={<Settings theme={theme} />} />
          <Route path="/job-history" element={<JobHistory theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;