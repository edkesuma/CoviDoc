import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button, Label, TextInput, Modal } from "flowbite-react";
// component
import DeleteAccountPrompt from "./DeletePatientAccountALertModal";

function DeletePatientAccountConfirmationModal({ isOpen, onClose }) {
  const { token } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState(""); // Store the entered password
  const [currentPasswordError, setCurrentPasswordError] = useState(null); // Handle error messages

  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!currentPassword) {
      setCurrentPasswordError("Please fill in this field.");
      return;
    }

    try {
      const response = await axios.delete(
        "/api/patient/deleteOwnPatientAccount", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            password: currentPassword,  // Send password in the data field
          },
        }
      );      

      // split api response
      const { success, message, status } = response.data;
  
      // if current password is wrong
      if (!success) {
        setCurrentPasswordError("Password does not match.");
        valid = false;
        return;
      } else {
        setCurrentPasswordError(null);  // current password correct = no error message
      }

    } catch (error) {
      setCurrentPasswordError("Error verifying current password.");
      valid = false;
      return;
    }

    if (!valid) return;


    // success modal only if everything ok
    setConfirmDeleteShow(true);
  };


  function handleConfirmDelete() {
    setConfirmDeleteShow(false);
    onClose();
  }


  return (
    <>
      <Modal show={isOpen} size="lg" onClose={onClose} popup>
        <Modal.Header />

        <Modal.Body>
          <div>
            <p className="text-2xl text-center font-bold text-black">
              Delete Your Patient Account
            </p>
            <p className="text-center text-gray-500">
              Please note that there is no option to restore the account or its data once it is deleted.
            </p>
          </div>

          <div className="p-4"></div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password Input */}
              <div className="mb-4">
                <Label htmlFor="password" value="Enter current password" />
                <TextInput
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  color={currentPasswordError ? "failure" : "gray"}
                />
                {currentPasswordError && <p className="text-red-500">{currentPasswordError}</p>}
              </div>

              <div className="pt-1"></div>

              {/* Buttons for Confirm and Cancel */}
              <div className="flex justify-center space-x-4 w-full">
                <button
                  type="submit"
                  className="w-5/12 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={onClose}
                  className="w-5/12 py-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-300 hover:text-white transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* delete account success */}
      <DeleteAccountPrompt show={confirmDeleteShow} onClose={handleConfirmDelete} />
    </>
  );
}

export default DeletePatientAccountConfirmationModal;
