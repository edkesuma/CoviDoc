import React from 'react';
import { MdWavingHand } from 'react-icons/md'; // Importing the correct waving hand icon

// Functional component for the notification
function AccountDeletedNotification({ onExit }) {
  // Function to handle exit button click
  const handleExit = () => {
    onExit(); // Call the exit function passed as a prop
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-6 border-4 border-cyan-400 rounded-lg shadow-lg bg-white text-center max-w-sm">
        {/* Icon Container */}
        <div className="flex justify-center mb-4">
          <MdWavingHand className="text-6xl text-cyan-400" /> {/* Using icon with styles */}
        </div>
        {/* Message */}
        <p className="text-lg text-black mb-4">Your patient account has been deleted.</p>
        {/* Exit Button */}
        <button
          className="bg-cyan-400 text-white py-2 px-4 rounded cursor-pointer font-bold hover:bg-cyan-500"
          onClick={handleExit}
        >
          Exit CoviDoc
        </button>
      </div>
    </div>
  );
}

export default AccountDeletedNotification;
