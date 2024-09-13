import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// Helper function for slider value text
function valuetext(value) {
  return `${value}°C`;
}

const FilterForm = () => {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [ageRange, setAgeRange] = useState([20, 37]);

  // Function to handle gender selection
  const handleGenderChange = (selectedGender) => setGender(selectedGender);

  // Function to handle status selection
  const handleStatusChange = (selectedStatus) => setStatus(selectedStatus);

  // Function to handle age range change
  const handleAgeRangeChange = (event, newValue) => setAgeRange(newValue);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-sm p-6 border-2 border-cyan-400 rounded-lg bg-white shadow-lg text-center">
        {/* Title */}
        <h2 className="text-xl font-bold mb-6">Filter Options</h2>

        {/* Gender Section */}
        <div className="mb-6">
          <label className="block font-bold mb-2">Gender</label>
          <div className="flex justify-between">
            <button
              onClick={() => handleGenderChange('Male')}
              className={`w-full py-2 mr-2 rounded ${gender === 'Male' ? 'bg-cyan-400 text-white' : 'bg-gray-100'}`}
            >
              Male
            </button>
            <button
              onClick={() => handleGenderChange('Female')}
              className={`w-full py-2 ml-2 rounded ${gender === 'Female' ? 'bg-cyan-400 text-white' : 'bg-gray-100'}`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age Range Section */}
        <div className="mb-6">
          <label className="block font-bold mb-2">Age</label>
          <Box sx={{ width: 250 }}>
            <Slider
              value={ageRange}
              onChange={handleAgeRangeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={100}
            />
          </Box>
          <div className="text-cyan-500 font-medium mt-2">
            <span>{ageRange[0]}</span> - <span>{ageRange[1]}</span>
          </div>
        </div>

        {/* Status Section */}
        <div className="mb-6">
          <label className="block font-bold mb-2">Status</label>
          <div className="flex justify-between">
            <button
              onClick={() => handleStatusChange('Open')}
              className={`w-full py-2 mr-2 rounded ${status === 'Open' ? 'bg-cyan-400 text-white' : 'bg-gray-100'}`}
            >
              Open
            </button>
            <button
              onClick={() => handleStatusChange('Closed')}
              className={`w-full py-2 ml-2 rounded ${status === 'Closed' ? 'bg-cyan-400 text-white' : 'bg-gray-100'}`}
            >
              Closed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
