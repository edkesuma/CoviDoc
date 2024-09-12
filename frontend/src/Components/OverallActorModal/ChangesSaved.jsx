import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal visibility state

  const handleCloseModal = () => {
    // Logic to close the modal or navigate back
    setIsOpen(false); 
    window.history.back();
  };

  if (!isOpen) return null; // Hide the modal if it's closed

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg border-2 border-cyan-400 text-center w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Changes Saved!</h2>
        <button
          onClick={handleCloseModal}
          className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300"
        >
          Back to Account
        </button>
      </div>
    </div>
  );
};

export default Modal;
