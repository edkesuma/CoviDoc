import { Button, Label, TextInput, Modal } from "flowbite-react";
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

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.patch(
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

      if (response.status === 200) {
        // Show the PasswordUpdated modal
        setIsPasswordUpdatedModalOpen(true);
      }
      
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error changing password."
      );
    }
  };

  function handleResetPasswordSuccess() {
    setIsPasswordUpdatedModalOpen(false);
    onClose();
  }


  return (
    <>
      <Modal show={isOpen} size="md" onClose={onClose} popup={true}>
        <Modal.Header>
          <p className="text-xl font-medium text-cyan-400">
            Change Your Password
          </p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="mb-4">
              <Label htmlFor="currentPassword" className="text-lg mb-2">
                Enter current password
              </Label>
              <TextInput
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <Label htmlFor="newPassword" className="text-lg mb-2">
                Enter new password
              </Label>
              <TextInput
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <Label htmlFor="confirmPassword" className="text-lg mb-2">
                Confirm new password
              </Label>
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="button"
                className="w-full py-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                onClick={onClose} // Close the modal
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full py-1 bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
              >
                Done
              </Button>
            </div>
            {/* Display Error Message */}
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          </form>
        </Modal.Body>
      </Modal>

      {/* reset password success */}
      <PasswordUpdated show={isPasswordUpdatedModalOpen} onClose={handleResetPasswordSuccess} />
    </>
  );
}

export default ChangePatientPasswordModal;
