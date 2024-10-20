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

  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isPasswordUpdatedModalOpen, setIsPasswordUpdatedModalOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    
    if (!currentPassword) {
      setCurrentPasswordError("Please fill in this field.");
      setNewPasswordError("");
      setConfirmPasswordError("");
      return;
    }
    if (!newPassword) {
      setCurrentPasswordError("");
      setNewPasswordError("Please fill in this field.");
      setConfirmPasswordError("");
      return;
    }
    if (!confirmPassword) {
      setCurrentPasswordError("");
      setNewPasswordError("");
      setConfirmPasswordError("Please fill in this field.");
      return;
    }

    try {
      const response = await axios.patch(
        "/api/doctor/changeDoctorPassword",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // split api response
      const { success, message, status } = response.data;
  
      // reset password is unsuccessful
      if (!success) {
        // new password doesnt follow the correct format
        if (!validatePassword(newPassword)) {
          setCurrentPasswordError("");
          setNewPasswordError("Password must be at least 8 characters long and contain a number and a special character.");
          setConfirmPasswordError("");
        // new password doesnt match with the confirm password
        } else if (newPassword !== confirmPassword) {
          setCurrentPasswordError("");
          setNewPasswordError("");
          setConfirmPasswordError("Passwords do not match.");
        // current password is incorrect
        } else {
          setCurrentPasswordError("Current password does not match.");
          setNewPasswordError("");
          setConfirmPasswordError("");
        }
        valid = false;
        return;
      // reset password is successful
      } else {
        setCurrentPasswordError(null);
        setNewPasswordError("");
        setConfirmPasswordError("");
      }

    } catch (error) {
      setCurrentPasswordError("Error verifying current password.");
      setNewPasswordError("");
      setConfirmPasswordError("");
      valid = false;
      return;
    }

    if (!valid) return;


    // success modal only if everything ok
    setIsPasswordUpdatedModalOpen(true);
  };

  // make sure password is of valid format
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }

  function handleResetPasswordSuccess() {
    setIsPasswordUpdatedModalOpen(false);
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
                  color={currentPasswordError ? "failure" : "gray"}
                />
                {currentPasswordError && <p className="text-red-500">{currentPasswordError}</p>}
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
                  color={newPasswordError ? "failure" : "gray"}
                />
                {newPasswordError && <p className="text-red-500">{newPasswordError}</p>}
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
                  color={confirmPasswordError ? "failure" : "gray"}
                />
                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
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
            </form>
          </div>
          
        </Modal.Body>
      </Modal>

      {/* reset password success */}
      <PasswordUpdated show={isPasswordUpdatedModalOpen} onClose={handleResetPasswordSuccess} />
    </>
  );
}

export default ChangeDoctorPasswordModal;
