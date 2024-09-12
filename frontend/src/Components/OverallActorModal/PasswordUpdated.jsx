import React from "react";

const Modal = () => {
  const handleCloseModal = () => {
    // Logic to go back to the previous page
    window.history.back();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-cyan-400 w-96 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Password Updated!</h2>
        <button
          onClick={handleCloseModal}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded-md"
        >
          Back to Account
        </button>
      </div>
    </div>
  );
};

export default Modal;
