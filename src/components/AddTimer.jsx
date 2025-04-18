import React, { useState } from "react";
import { useTimerContext } from "../context/TimerContext";

const AddTimer = () => {
  const { addTimer, timers } = useTimerContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [error, setError] = useState("");

  // Extract existing categories
  const existingCategories = [
    ...new Set(timers.map((timer) => timer.category)),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!name.trim()) {
      setError("Timer name is required");
      return;
    }

    if (!duration || isNaN(duration) || duration <= 0) {
      setError("Please enter a valid duration in seconds");
      return;
    }

    const finalCategory = category === "new" ? newCategory.trim() : category;

    if (!finalCategory) {
      setError("Category is required");
      return;
    }

    // Add new timer
    addTimer({
      name: name.trim(),
      duration: parseInt(duration),
      category: finalCategory,
      halfwayAlert: halfwayAlert,
    });

    // Reset form
    setName("");
    setDuration("");
    setCategory("");
    setNewCategory("");
    setHalfwayAlert(false);
    setError("");
    setIsFormOpen(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full p-4 bg-indigo-600 text-white text-center font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Add New Timer</span>
        </button>
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create New Timer
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Timer Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Workout Timer"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 font-medium mb-2"
              >
                Duration (seconds)
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 300 (for 5 minutes)"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="new">+ Add new category</option>
              </select>
            </div>

            {category === "new" && (
              <div className="mb-4">
                <label
                  htmlFor="newCategory"
                  className="block text-gray-700 font-medium mb-2"
                >
                  New Category Name
                </label>
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Study"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={halfwayAlert}
                  onChange={(e) => setHalfwayAlert(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Enable halfway alert</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Timer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTimer;
