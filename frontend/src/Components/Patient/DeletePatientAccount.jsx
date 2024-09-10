import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const DeleteAccountPrompt = ({ onConfirm, onCancel }) => {
    

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
      <h2 style={styles.title}>Delete Your Account</h2>
        <div style={styles.warningIcon}>
            <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p style={styles.message}>
          Are you sure that you want to delete your CoviDoc patient account? <b> Please note that there is no option to restore the account or its data once it is deleted.</b>
        </p>
        <div style={styles.buttonContainer}>
          <button style={styles.yesButton} onClick={onConfirm}>Yes</button>
          <button style={styles.noButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '100%',
    border: '3px solid #00bfff',

  },
  warningIcon: {
    fontSize: '70px',
    color: '#FF0000',
    marginBottom: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  message: {
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  yesButton: {
    border: '1px solid red',
    backgroundColor: 'white',
    color: 'red',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '200px',
    hover: 'red',
  },
  noButton: {
    border: '1px solid gray',
    backgroundColor: 'white',
    color: 'gray',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '200px',
  },
};

export default DeleteAccountPrompt;
