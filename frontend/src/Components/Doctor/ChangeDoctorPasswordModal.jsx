import { Button, Label, TextInput, Modal } from "flowbite-react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/AuthContext"; // Ensure the path is correct

function ChangeDoctorPasswordModal({ isOpen, onClose }) {
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store any error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    
    // Clear any previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Make API request to change password
    try {
      const response = await axios.patch(
        "/api/doctor/changeDoctorPassword",
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

      // Assuming a successful response
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
        onClose(); // Close modal on success
      }
    } catch (error) {
      setErrorMessage("Error changing password. Please try again.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup={true}>
      <Modal.Header>
        <p className="text-xl font-medium text-cyan-400 dark:text-white">
          Change Your Password
        </p>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

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
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeDoctorPasswordModal;
