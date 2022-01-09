import React from "react";
import classNames from "classnames";
const Tab = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="mt-6">
      <div
        className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
        aria-label="Tabs"
      >
        <button
          className={classNames(
            currentTab === "rated"
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700",
            "rounded-l-lg",
            "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
          )}
          onClick={() => setCurrentTab("rated")}
        >
          <span>Rated</span>
          <span
            aria-hidden="true"
            className={classNames(
              currentTab === "rated" ? "bg-green-500" : "bg-transparent",
              "absolute inset-x-0 bottom-0 h-0.5"
            )}
          />
        </button>
        <button
          className={classNames(
            currentTab === "nonrated"
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700",
            "rounded-r-lg",
            "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
          )}
          onClick={() => setCurrentTab("negative")}
        >
          <span>Non Rated</span>
          <span
            aria-hidden="true"
            className={classNames(
              currentTab === "negative" ? "bg-red-500" : "bg-transparent",
              "absolute inset-x-0 bottom-0 h-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default Tab;
