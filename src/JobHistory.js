import React from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobHistory = ({ theme }) => {
  const dummyJobs = [
    { id: 1, name: 'Sanskrit Grammar Dataset', date: '2023-06-15', status: 'Completed', duration: '2h 15m' },
    { id: 2, name: 'Ancient Astronomy Data', date: '2023-06-14', status: 'In Progress', duration: '1h 30m' },
    { id: 3, name: 'Vedic Mathematics Corpus', date: '2023-06-13', status: 'Failed', duration: '45m' },
    { id: 4, name: 'Ayurvedic Herbs Dataset', date: '2023-06-12', status: 'Completed', duration: '3h 20m' },
    { id: 5, name: 'Classical Indian Music Notations', date: '2023-06-11', status: 'Completed', duration: '1h 55m' },
  ];

  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-gradient-to-br from-[#e6e6fa] to-[#b0e0e6]' : 'bg-gradient-to-br from-[#1e1e2f] to-[#2a1b3d]'} transition-colors duration-500`}>
      <div className="flex-grow p-8">
        <Link to="/" className={`flex items-center mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} hover:text-opacity-80`}>
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Job History</h1>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#2d2d44]'} rounded-lg shadow-lg p-6`}>
          <table className="w-full">
            <thead>
              <tr className={`${theme === 'light' ? 'bg-[#f0e6fa]' : 'bg-[#3d3d5c]'}`}>
                <th className={`px-4 py-2 text-left ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Job Name</th>
                <th className={`px-4 py-2 text-left ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Date</th>
                <th className={`px-4 py-2 text-left ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Status</th>
                <th className={`px-4 py-2 text-left ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {dummyJobs.map((job) => (
                <tr key={job.id} className={`${theme === 'light' ? 'border-b border-[#f0e6fa]' : 'border-b border-[#3d3d5c]'}`}>
                  <td className={`px-4 py-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'}`}>{job.name}</td>
                  <td className={`px-4 py-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} flex items-center`}>
                    <Calendar className="mr-2" size={16} />
                    {job.date}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded ${
                      job.status === 'Completed' ? 'bg-green-200 text-green-800' :
                      job.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className={`px-4 py-2 ${theme === 'light' ? 'text-[#4a90e2]' : 'text-[#7f7fd5]'} flex items-center`}>
                    <Clock className="mr-2" size={16} />
                    {job.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobHistory;