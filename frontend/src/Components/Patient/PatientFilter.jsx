import React, { useState } from 'react';
// npm install @mui/material @emotion/react @emotion/styled
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const FilterForm = () => {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [ageRange, setAgeRange] = useState([20, 37]);

  const handleGenderChange = (selectedGender) => setGender(selectedGender);
  const handleStatusChange = (selectedStatus) => setStatus(selectedStatus);
  const handleAgeRangeChange = (event, newValue) => setAgeRange(newValue);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h2>Filter Options</h2>
        
        <div style={styles.section}>
          <label style={styles.label}>Gender</label>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => handleGenderChange('Male')}
              style={{
                ...styles.button,
                backgroundColor: gender === 'Male' ? '#00bfff' : '#f1f1f1',
              }}
            >
              Male
            </button>
            <button
              onClick={() => handleGenderChange('Female')}
              style={{
                ...styles.button,
                backgroundColor: gender === 'Female' ? '#00bfff' : '#f1f1f1',
              }}
            >
              Female
            </button>
          </div>
        </div>
        
        <div style={styles.section}>
          <label style={styles.label}>Age</label>
          <Box sx={{ width: 300 }}>
            <Slider
              value={ageRange}
              onChange={handleAgeRangeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={100}
            />
          </Box>
          <div style={styles.ageRange}>
            <span>{ageRange[0]}</span> - <span>{ageRange[1]}</span>
          </div>
        </div>
        
        <div style={styles.section}>
          <label style={styles.label}>Status</label>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => handleStatusChange('Open')}
              style={{
                ...styles.button,
                backgroundColor: status === 'Open' ? '#00bfff' : '#f1f1f1',
              }}
            >
              Open
            </button>
            <button
              onClick={() => handleStatusChange('Closed')}
              style={{
                ...styles.button,
                backgroundColor: status === 'Closed' ? '#00bfff' : '#f1f1f1',
              }}
            >
              Closed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height to center vertically
    backgroundColor: '#f0f4f8', // Optional background color
  },
  container: {
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1,
    margin: '0 5px',
  },
  ageRange: {
    fontSize: '16px',
    color: '#00bfff',
    marginTop: '10px',
  },
};

export default FilterForm;
