import React, { useState } from 'react';

function DeleteAccountPrompt({ onConfirm, onCancel }) {
  // Define constant for password input
  const [password, setPassword] = useState('');

  // Handle input change for password
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password entered:', password);
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-cyan-400 max-w-lg w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Your Account</h2>

        {/* Instruction */}
        <p className="text-center mb-4">Enter your current password so we know that it's you.</p>

        <form onSubmit={handleSubmit}>
          {/* Input field for password */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Enter current password:</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Buttons for Confirm and Cancel */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="w-1/2 py-2 border-2 border-red-500 text-red-500 rounded-md font-bold hover:bg-red-500 hover:text-white transition duration-300"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              className="w-1/2 py-2 border-2 border-gray-400 text-gray-500 rounded-md font-bold hover:bg-gray-500 hover:text-white transition duration-300"
              onClick={onCancel}
            >
              Cancel Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccountPrompt;
