import React, { useState } from "react";
import Timer from "./Timer";
import { useTimerContext } from "../context/TimerContext";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CategoryGroup = ({ category, timers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { startCategory, pauseCategory, resetCategory } = useTimerContext();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const activeCategoryTimers = timers.filter(
    (timer) => timer.status !== "Completed"
  ).length;

  return (
    <div className="mb-6 bg-gray-50 rounded-lg shadow-sm">
      <div
        className="p-4 flex items-center justify-between bg-gray-100 rounded-t-lg cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
          <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-700">
            {activeCategoryTimers} active
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                startCategory(category);
              }}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
              aria-label="Start all timers"
            >
              <FaPlay className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                pauseCategory(category);
              }}
              className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none"
              aria-label="Pause all timers"
            >
              <FaPause className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetCategory(category);
              }}
              className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none"
              aria-label="Reset all timers"
            >
              <FaRedo className="h-3 w-3" />
            </button>
          </div>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {timers.map((timer) => (
            <Timer key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGroup;
