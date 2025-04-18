import React from "react";
import { useTimerContext } from "../context/TimerContext";

const CompletionModal = () => {
  const { showCompletionModal, completedTimerName, closeModal } =
    useTimerContext();

  if (!showCompletionModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Timer Completed!
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Congratulations! You've completed the timer:
            <span className="font-semibold block mt-2">
              {completedTimerName}
            </span>
          </p>
          <button
            onClick={() => {
              closeModal();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
