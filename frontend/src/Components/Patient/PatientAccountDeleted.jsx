import React from 'react';
import { MdWavingHand } from 'react-icons/md'; // Using the correct waving hand icon

const AccountDeletedNotification = ({ onExit }) => {
  
  
    return (
    <div style={styles.outerContainer}>
        <div style={styles.container}>
            <div style={styles.iconContainer}>
                <MdWavingHand style={styles.icon} /> {/* Adding the waving hand icon */}
            </div>
            <p style={styles.message}>Your patient account has been deleted.</p>
            <button style={styles.exitButton} onClick={onExit}>Exit CoviDoc</button>
            </div>
    </div>
   
  );
};

const styles = {
outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Takes up the full height of the viewport
    },  
  container: {
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #00bfff', // Changed border color to match the design
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff', // White background as in the image
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '40px', // Adjust size of the icon
    color: '#00bfff', // Blue color for the waving hand
  },
  message: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#000',
  },
  exitButton: {
    backgroundColor: '#00bfff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default AccountDeletedNotification;
