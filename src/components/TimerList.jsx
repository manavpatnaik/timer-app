import React, { useState } from "react";
import { useTimerContext } from "../context/TimerContext";
import CategoryGroup from "./CategoryGroup";
import { FaFilter } from "react-icons/fa";

const TimerList = () => {
  const { timers } = useTimerContext();
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get all unique categories
  const categories = [...new Set(timers.map((timer) => timer.category))];

  // Filter timers based on selected category
  const filteredCategories = categoryFilter ? [categoryFilter] : categories;

  return (
    <div className="mt-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Timers</h2>

        <div className="relative">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <CategoryGroup
            key={category}
            category={category}
            timers={timers.filter((timer) => timer.category === category)}
          />
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No timers available. Create your first timer!
          </p>
        </div>
      )}
    </div>
  );
};

export default TimerList;
