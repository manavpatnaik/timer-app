import React from "react";
import AddTimer from "../components/AddTimer";
import TimerList from "../components/TimerList";
import CompletionModal from "../components/CompletionModal";

const Home = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Timer App
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Create and manage your timers for various activities
        </p>
      </div>

      <AddTimer />
      <TimerList />
      <CompletionModal />
    </div>
  );
};

export default Home;
