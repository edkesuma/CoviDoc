import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosMail } from 'react-icons/io';

const EditAccountForm = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    gender: 'Male',
    profession: 'Radiologist',
    dob: '1991-01-01',
    email: 'johnd@gmail.com',
    phone: '1234 5678',
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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div style={styles.outerContainer}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.title}>Editing Your Account</h2>
        <div style={styles.gridContainer}>
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

          <div style={styles.formFields}>
            <label style={styles.label}>
              <IoPerson style={styles.icon} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              <FaTransgender style={styles.icon} />
              <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label style={styles.label}>
              <LuStethoscope style={styles.icon} />
              <input type="text" name="profession" value={formData.profession} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              <FaBirthdayCake style={styles.icon} />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              <IoIosMail style={styles.icon} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
            </label>
            <label style={styles.label}>
              <FaPhoneAlt style={styles.icon} />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
            </label>
          </div>
        </div>

        <button type="submit" style={styles.saveButton}>Save</button>
      </form>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the viewport to center vertically
    backgroundColor: '#f5f5f5', // Optional, for visual contrast
  },
  formContainer: {
    maxWidth: '700px',
    padding: '20px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'left',
    color: '#000000',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },
  imageContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  profileImage: {
    width: '500px',
    height: '300px',
    objectFit: 'cover',
  },
  changeImageLabel: {
    position: 'absolute',
    bottom: '26px',
    left: '0px',
    width: '100%',  // Cover the full width of the image
    backgroundColor: '#00bfff',
    color: 'white',
    padding: '10px 0',
    cursor: 'pointer',
    textAlign: 'center',
    opacity: 0.8,
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
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
    color: '#00bfff',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#00bfff',
    border: '2px solid #00bfff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EditAccountForm;
