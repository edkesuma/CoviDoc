"use client";

import { Button, Label, TextInput, Modal } from "flowbite-react";
import { useState } from "react";

function DeletePatientAccountConfirmationModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState(""); // Store the entered password
  const [errorMessage, setErrorMessage] = useState(null); // Handle error messages

  // Handle input change for password
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (password === "") {
      setErrorMessage("Please enter your current password.");
      return;
    }
    onConfirm(password); // Trigger the confirm action with entered password
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header>
        <p className="text-xl font-medium text-cyan-400">Delete Your Account</p>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Instruction */}
          <p className="text-center mb-4 text-gray-500">
            Enter your current password to confirm account deletion.
          </p>

          {/* Current Password Input */}
          <div>
            <Label htmlFor="password" value="Enter current password" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Buttons for Confirm and Cancel */}
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              className="w-full bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              Confirm Delete
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default DeletePatientAccountConfirmationModal;
