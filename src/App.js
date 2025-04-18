import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TimerProvider } from "./context/TimerContext";
import Home from "./pages/Home";
import History from "./pages/History";
import { FaHistory, FaClock } from "react-icons/fa";

function App() {
  return (
    <TimerProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <nav className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <FaClock className="h-8 w-8" />
                    <span className="ml-2 text-xl font-bold">TimerApp</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                    >
                      Timers
                    </Link>
                    <Link
                      to="/history"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
                    >
                      <FaHistory className="mr-1" />
                      History
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>

          <footer className="bg-white py-4 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} TimerApp. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </TimerProvider>
  );
}

export default App;
