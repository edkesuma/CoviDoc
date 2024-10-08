import React, { useState, useEffect } from "react";

function AgeRangeSlider({ data, setData, minAge, maxAge }) {
  const handleMax = (e) => {
    const value = parseInt(e.target.value);
    if (value > data.min) {
      setData((prev) => ({ ...prev, max: value }));
    }
  };

  const handleMin = (e) => {
    const value = parseInt(e.target.value);
    if (value < data.max) {
      setData((prev) => ({ ...prev, min: value }));
    }
  };

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 relative mt-6">
        <div
          className="bg-indigo-300 h-1.5 rounded-full absolute"
          style={{
            left: `${(data.min / maxAge) * 100}%`,
            right: `${100 - (data.max / maxAge) * 100}%`,
            zIndex: 1,
          }}
        ></div>
      </div>

      <div className="relative mb-6 top-[-7px]">
        <input
          onChange={handleMax}
          min={minAge}
          max={maxAge}
          type="range"
          value={data.max}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none pointer-events-none"
        />
        <input
          onChange={handleMin}
          min={minAge}
          max={maxAge}
          type="range"
          value={data.min}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none pointer-events-none"
        />
        <style>
          {`
          input[type=range]::-webkit-slider-runnable-track {
            z-index: 1;
          }
          input[type=range]::-webkit-slider-thumb {
            pointer-events: auto;
            z-index: 50;
          }
          `}
        </style>
      </div>

      {/* display the selected age range below the slider */}
      <div className="flex justify-between text-sm mt-2">
        <span>Min Age: {data.min}</span>
        <span>Max Age: {data.max}</span>
      </div>
    </div>
  );
}

export default AgeRangeSlider;
