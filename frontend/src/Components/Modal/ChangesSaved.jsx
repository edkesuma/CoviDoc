import React from 'react'; // No need for useState since the modal is always shown
import { HiEye, HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const Modal = () => {
  const handleCloseModal = () => {
    // Logic to go back to the previous page
    window.history.back();
  };

  return (
    <div>
      <div style={{ border: '2px solid black' }}>
        {/* Button to trigger the modal */}
      </div>
      {/* Modal design */}
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2 style={styles.message}>Changes Saved!</h2>
          <button style={styles.closeButton} onClick={handleCloseModal}>
            Back to Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for modal and buttons
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly transparent background
    display: "flex", // Flexbox layout
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    zIndex: 1000, // Make sure modal is above other content
  },
  modal: {
    background: "white",
    padding: "30px 40px", // Padding to match the modal's white space
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
    border: "1px solid #00bfff",
  },
  message: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
    
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#00bfff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: "16px",
  },
  closeButton: {
    marginTop: "20px",
    padding: '10px 20px',
    backgroundColor: '#00bfff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: "16px",
  },
};

export default Modal;
