import React from "react";
import { useTimerContext } from "../context/TimerContext";
import ProgressBar from "./ProgressBar";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const Timer = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer } = useTimerContext();

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.floor((timer.remainingTime / timer.duration) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-800">{timer.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            timer.status === "Running"
              ? "bg-green-100 text-green-800"
              : timer.status === "Paused"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {timer.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-gray-700">
          {formatTime(timer.remainingTime)}
        </span>
        <div className="flex space-x-2">
          {timer.status !== "Completed" && timer.status !== "Running" && (
            <button
              onClick={() => startTimer(timer.id)}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <FaPlay />
            </button>
          )}
          {timer.status === "Running" && (
            <button
              onClick={() => pauseTimer(timer.id)}
              className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              <FaPause />
            </button>
          )}
          <button
            onClick={() => resetTimer(timer.id)}
            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <ProgressBar percentage={calculateProgress()} status={timer.status} />
    </div>
  );
};

export default Timer;
