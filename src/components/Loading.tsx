import { Loader } from "lucide-react";
import React from "react";
import { stats } from "@/data/stats";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto mt-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-6">
          {/* Main card */}
          <div className="h-56 rounded-xl bg-gray-800 flex items-center justify-center">
            <Loader className="animate-spin h-8 w-8 text-gray-400" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center gap-2 h-20 rounded-xl bg-gray-900 p-3"
              >
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p> {!stat.value && "-"} </p>
                <div className="h-4 w-10 bg-gray-800 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Daily forecast */}
          <div className="flex flex-col gap-4">
            <h3>Daily Forecast</h3>
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hourly forecast */}
        <div className="col-span-4 flex flex-col gap-4 bg-gray-900 p-4 rounded-xl">
          <div className="flex flex-col gap-3">
            <h3 className=" mb-2 text-gray-400">Hourly Forecast</h3>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
    </div>
  );
}
