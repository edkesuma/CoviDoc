import React, { useState } from 'react';
import { FileInput, Label } from "flowbite-react";

const NewConsultationForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    temperature: '',
    o2Saturation: '',
    leukocyteCount: '',
    neutrophilCount: '',
    lymphocyteCount: '',
    recentlyInICU: false,
    recentlyInNeedOfSupplementalO2: false,
    intubationPresent: false,
    files: null,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <div style={styles.header}>
        <h2 style={styles.title}>New Consultation</h2>
      </div>
      
      <div style={styles.gridContainer}>
        <div style={styles.leftColumn}>
          <label style={styles.label}>
            Consultation Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Temperature:
            <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            O2 Saturation:
            <input type="number" name="o2Saturation" value={formData.o2Saturation} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Leukocyte Count:
            <input type="number" name="leukocyteCount" value={formData.leukocyteCount} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Neutrophil Count:
            <input type="number" name="neutrophilCount" value={formData.neutrophilCount} onChange={handleChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Lymphocyte Count:
            <input type="number" name="lymphocyteCount" value={formData.lymphocyteCount} onChange={handleChange} style={styles.input} />
          </label>

          {/* Checkboxes */}
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              Recently been in ICU?
              <input type="checkbox" name="recentlyInICU" checked={formData.recentlyInICU} onChange={handleChange} style={styles.checkboxInput} />
            </label>
            <label style={styles.checkboxLabel}>
              Recently in need of supplemental O2?
              <input type="checkbox" name="recentlyInNeedOfSupplementalO2" checked={formData.recentlyInNeedOfSupplementalO2} onChange={handleChange} style={styles.checkboxInput} />
            </label>
            <label style={styles.checkboxLabel}>
              Intubation present?
              <input type="checkbox" name="intubationPresent" checked={formData.intubationPresent} onChange={handleChange} style={styles.checkboxInput} />
            </label>
          </div>
        </div>

        <div style={styles.rightColumn}>
          {/* File Upload - Drag and Drop */}
          <Label
            htmlFor="dropzone-file"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <FileInput id="dropzone-file" className="hidden" multiple onChange={handleFileChange} />
          </Label>

          {/* Consultation Notes */}
          <label style={styles.consultationNotesLabel}>
            Consultation Notes:
            <textarea name="notes" value={formData.notes} onChange={handleChange} style={styles.textarea}></textarea>
          </label>
        </div>
      </div>

      <button type="submit" style={styles.submitButton}>Submit</button>
    </form>
  );
};

const styles = {
  formContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#00bfff',
    textAlign: 'left',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  consultationNotesLabel: {
    display: 'block',
    fontWeight: 'bold',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  checkboxInput: {
    marginLeft: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#FFFFFF',
    color: '#00bfff',
    border: '2px solid #00bfff',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
  },
};

export default NewConsultationForm;
