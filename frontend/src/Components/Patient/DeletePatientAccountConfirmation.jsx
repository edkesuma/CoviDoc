import React, { useState } from 'react';

const DeleteAccountPrompt = ({ onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Password entered:', password);
    onConfirm(password);
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2>Delete Your Account</h2>
        </div>
        <div style={styles.sentence}>
          <p>Enter your current password so we know that it's you.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>
              Enter current password:
            </label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.confirmButton}>Confirm Delete</button>
            <button type="button" style={styles.cancelButton} onClick={onCancel}>Cancel Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    transparency: '0.5',
  },
  container: {
    textAlign: 'left',
    padding: '20px',
    border: '1px solid #00bff',
    borderRadius: '8px',
    width: '600px',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: "30px",
    fontWeight: "bold",
    padding: "10px",
    textAlign: 'center',
  },
  sentence: {
    padding: "10px",
    textAlign: 'center',
  },
  inputContainer: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  confirmButton: {
    backgroundColor: '#fff',
    color: 'red',
    border: '2px solid red',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    width: '50%',
  },
  cancelButton: {
    backgroundColor: '#fff',
    color: 'gray',
    border: '2px solid gray',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '50%',
  },
};

export default DeleteAccountPrompt;
