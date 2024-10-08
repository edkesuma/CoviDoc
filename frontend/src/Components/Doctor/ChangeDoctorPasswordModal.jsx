import { Button, Label, TextInput, Modal } from "flowbite-react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/AuthContext"; // Ensure the path is correct
import PasswordUpdated from "../OverallActorModal/PasswordUpdated";

function ChangeDoctorPasswordModal({ isOpen, onClose }) {
  const { token } = useContext(AuthContext); // Get token from AuthContext

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To store any error messages
  // const [successMessage, setSuccessMessage] = useState(""); // To store success messages


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    
    // Clear any previous messages
    setErrorMessage("");
    // setSuccessMessage("");

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
        // setSuccessMessage("Password changed successfully!");
        setResetPasswordSuccess(true);
      }
    } catch (error) {
      setErrorMessage("Error changing password. Please try again.");
      console.error("Error changing password:", error);
    }
  };

  function handleResetPasswordSuccess() {
    setResetPasswordSuccess(false);
    onClose();
  }


  return (
    <>
      <Modal show={isOpen} size="lg" onClose={onClose} popup={true}>
        <Modal.Header />

        <Modal.Body>
          <div>
            <p className="text-2xl text-center font-bold text-black">
              Update Your Password
            </p>
            <p className="text-center text-gray-500">
              Enter your current password and a new password.
            </p>
          </div>

          <div className="p-4"></div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div className="mb-4">
                <Label htmlFor="currentPassword" className="text-lg mb-2">
                  Current password
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
                  New password
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

              <div className="pt-1"></div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4 w-full">
                <button
                  onClick={onClose}
                  className="w-5/12 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-5/12 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition duration-300"
                >
                  Done
                </button>
              </div>
              {/* Display Error Message */}
              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            </form>
          </div>
          
        </Modal.Body>
      </Modal>

      {/* reset password success */}
      <PasswordUpdated show={resetPasswordSuccess} onClose={handleResetPasswordSuccess} />
    </>
  );
}

export default ChangeDoctorPasswordModal;
