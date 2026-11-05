"use client";

import { useState } from "react";

const filters = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const EventFilters = () => {
  const [activeFilter, setActiveFilter] = useState("All");

    return (
    <div
      aria-label="Filter events by category"
      className="flex flex-wrap items-center gap-2"
      role="group"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-1 ${
              isActive
                ? "bg-violet-700 text-white shadow-sm shadow-violet-200"
                : "border border-violet-100 bg-white text-violet-700 hover:bg-violet-50"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
    );
};

export default EventFilters;