import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      console.log('Password changed successfully');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>Change Your Password</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Enter current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Enter new password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
          <button onClick={handleSubmit} style={styles.submitButton}>Done</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Centering the form vertically and horizontally
    backgroundColor: '#f0f4f8', // Optional background color
  },
  container: {
    width: '500px',
    padding: '50px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', // Modal shadow effect
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'red',
    border: '2px solid red',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '45%',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#00bfff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '45%',
  },
};

export default ChangePasswordForm;
