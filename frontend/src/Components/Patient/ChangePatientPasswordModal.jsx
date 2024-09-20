"use client";

import { Button, Label, TextInput, Modal as FlowbiteModal } from "flowbite-react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import PasswordUpdated from "../../Components/OverallActorModal/PasswordUpdated"; // Import the PasswordUpdated modal

function ChangePatientPasswordModal({ isOpen, onClose }) {
  const { token } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordUpdatedModalOpen, setIsPasswordUpdatedModalOpen] = useState(false); // Control the PasswordUpdated modal

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation password do not match.");
      return;
    }

    try {
      await axios.patch(
        "/api/patient/changePatientPassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Close the ChangePassword modal immediately
      onClose();

      // Show the PasswordUpdated modal
      setIsPasswordUpdatedModalOpen(true);
      
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error changing password."
      );
    }
  };

  return (
    <>
      {/* Change Password Modal */}
      <FlowbiteModal show={isOpen} size="md" onClose={onClose} popup>
        <FlowbiteModal.Header>
          <p className="text-xl font-medium text-cyan-400">Change Your Password</p>
        </FlowbiteModal.Header>
        <FlowbiteModal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword">Enter current password</Label>
              <TextInput
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword">Enter new password</Label>
              <TextInput
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            {/* Buttons */}
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
                className="w-full bg-cyan-500 text-white hover:bg-cyan-400"
              >
                Done
              </Button>
            </div>
          </form>
        </FlowbiteModal.Body>
      </FlowbiteModal>

      {/* Password Updated Modal */}
      {isPasswordUpdatedModalOpen && (
        <PasswordUpdated 
          isOpen={isPasswordUpdatedModalOpen} 
          onClose={() => setIsPasswordUpdatedModalOpen(false)} 
        />
      )}
    </>
  );
}

export default ChangePatientPasswordModal;
