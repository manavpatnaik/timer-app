import React from "react";
import { useTimerContext } from "../context/TimerContext";
import { exportData } from "../utils/storage";
import { FaDownload, FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

const History = () => {
  const { history } = useTimerContext();

  // Sort history by completion date (newest first)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  // Handle export
  const handleExport = () => {
    const success = exportData();
    if (success) {
      alert("Data exported successfully!");
    } else {
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Timer History</h1>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FaDownload className="mr-2" />
          Export Data
        </button>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No history available. Complete some timers to see them here!
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {sortedHistory.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.timerName}
                    </h3>
                    <div className="flex flex-wrap mt-2">
                      <span className="inline-flex items-center mr-3 text-sm text-gray-600">
                        <FaTag className="mr-1 text-gray-400" />
                        {item.category}
                      </span>
                      <span className="inline-flex items-center mr-3 text-sm text-gray-600">
                        <FaClock className="mr-1 text-gray-400" />
                        {formatDuration(item.duration)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-400" />
                    {formatDate(item.completedAt)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default History;
