import React from 'react';
import { IoIosWarning } from 'react-icons/io'; // Import the warning icon

function DeleteAccountPrompt({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-cyan-400 max-w-lg w-full">
        
        {/* Centered Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Your Account</h2>

        {/* Centered Warning Icon */}
        <div className="text-red-600 text-6xl mb-4 flex justify-center">
          <IoIosWarning />
        </div>

        {/* Message */}
        <p className="text-lg mb-6 text-center">
          Are you sure that you want to delete your CoviDoc patient account? 
          <b> Please note that there is no option to restore the account or its data once it is deleted.</b>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            className="w-48 py-2 border-2 border-red-500 text-red-500 rounded-md font-bold hover:bg-red-500 hover:text-white transition duration-300"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="w-48 py-2 border-2 border-gray-400 text-gray-500 rounded-md font-bold hover:bg-gray-500 hover:text-white transition duration-300"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountPrompt;
