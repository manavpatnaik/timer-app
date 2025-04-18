import React from "react";

const ProgressBar = ({ percentage, status }) => {
  // Determine color based on status
  const getBarColor = () => {
    switch (status) {
      case "Running":
        return "bg-green-500";
      case "Paused":
        return "bg-yellow-500";
      case "Completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
      <div
        className={`h-2.5 rounded-full ${getBarColor()}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
