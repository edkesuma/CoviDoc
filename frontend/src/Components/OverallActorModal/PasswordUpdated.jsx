import React from "react";
import { Modal, Button } from "flowbite-react";

const PasswordUpdated = ({ isOpen, onClose }) => {
  const handleCloseModal = () => {
    onClose();
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <Modal show={isOpen} size="md" onClose={handleCloseModal} popup>
      <Modal.Header>
        <h2 className="text-lg font-semibold text-gray-800">Password Updated!</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <p>Your password has been updated successfully.</p>
          <Button
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded-md"
            onClick={handleCloseModal}
          >
            Back to Account
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordUpdated;
