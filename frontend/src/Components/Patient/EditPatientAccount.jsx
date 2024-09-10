import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosMail, IoIosClose } from 'react-icons/io';

const EditAccountForm = () => {
  const [formData, setFormData] = useState({
    name: 'Laura Hamilton',
    gender: 'Female',
    dob: '2000-10-01',
    email: 'laurah@gmail.com',
    phone: '8346 5123',
    allergies: 'Has peanut allergy.',
    medicalHistory: 'No known medical history.',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleClose = () => {
    // Add logic here to close the modal or form
    console.log('Close form clicked');
  };

  return (
    <div style={styles.pageWrapper}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        {/* Close Icon */}
        <IoIosClose style={styles.closeIcon} onClick={handleClose} />

        <h2 style={styles.title}>Editing Your Account</h2>
        <div style={styles.gridContainer}>
          {/* Left Side */}
          <div style={styles.leftSide}>
            <div style={styles.imageContainer}>
              <img
                src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : 'default_profile_image_url'}
                alt="Profile"
                style={styles.profileImage}
              />
              <label style={styles.changeImageLabel}>
                Change Image
                <input
                  type="file"
                  name="profileImage"
                  style={styles.fileInput}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Form Fields */}
            <div style={styles.formFields}>
              <label style={styles.label}>
                <IoPerson style={styles.icon} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                <FaTransgender style={styles.icon} />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label style={styles.label}>
                <FaBirthdayCake style={styles.icon} />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                <IoIosMail style={styles.icon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                <FaPhoneAlt style={styles.icon} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
          </div>

          {/* Right Side: Allergies and Medical History */}
          <div style={styles.rightSide}>
            <label style={styles.textAreaLabel}>ALLERGIES</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              style={styles.textArea}
            />
            <label style={styles.textAreaLabel}>MEDICAL HISTORY</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              style={styles.textArea}
            />
          </div>
        </div>

        <button type="submit" style={styles.saveButton}>Save</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '800px',
    padding: '40px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'block',
  },
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7fa',
  },
  closeIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    color: '#00bfff',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'Left',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  imageContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  profileImage: {
    width: '400px',
    height: '400px',
    objectFit: 'cover',
  },
  changeImageLabel: {
    position: 'absolute',
    bottom: '1px',
    left: '0',
    width: '100%',
    backgroundColor: '#00bfff',
    color: 'white',
    padding: '10px 0',
    textAlign: 'center',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none',
  },
  formFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '24px',
    color: '#00bfff',
  },
  input: {
    flex: '1',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textAreaLabel: {
    fontWeight: 'bold',
    marginBottom: '1px',
    fontSize: '20px',
    color: '#00bfff',
  },
  textArea: {
    width: '100%',
    height: '300px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'none',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#fff',
    color: '#00bfff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '2px solid #00bfff',
    fontWeight: 'bold',
  },
};

export default EditAccountForm;
