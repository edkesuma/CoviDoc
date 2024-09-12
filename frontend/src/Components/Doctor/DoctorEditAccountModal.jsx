import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosMail, IoIosClose } from 'react-icons/io';

function DoctorEditAccountModal() {
  // Define constants for the input fields
  const [name, setName] = useState('John Doe');
  const [gender, setGender] = useState('Male');
  const [profession, setProfession] = useState('Radiologist');
  const [dob, setDob] = useState('1991-01-01');
  const [email, setEmail] = useState('johnd@gmail.com');
  const [phone, setPhone] = useState('1234 5678');
  const [profileImage, setProfileImage] = useState(null);

  // Handle image upload separately
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Collecting all form data into one object
    const formData = {
      name,
      gender,
      profession,
      dob,
      email,
      phone,
    };
    console.log(formData);
  };

  // Handle modal close functionality
  const handleClose = () => {
    console.log('Modal closed!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-3xl p-8 border-2 border-cyan-400 rounded-lg bg-white shadow-lg grid grid-cols-2 gap-10 relative">
        {/* Close Icon */}
        <IoIosClose
          className="absolute top-2 right-2 text-cyan-500 text-2xl cursor-pointer"
          onClick={handleClose}
        />

        {/* Title */}
        <div className="col-span-2 text-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-500 text-left">Editing Your Account</h2>
        </div>

        {/* Left Side: Image */}
        <div className="flex flex-col items-center relative w-64 h-70">
          <img
            src={profileImage ? profileImage : 'default_profile_image_url'}
            alt="Profile"
            className="w-60 h-70 object-cover mb-4 border rounded"
          />
          <label className="absolute bottom-4 left-2 right-2 bg-cyan-400 text-white text-center py-2 cursor-pointer opacity-70">
            Change Image
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <IoPerson className="text-cyan-500 text-xl" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaTransgender className="text-cyan-500 text-xl" />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <LuStethoscope className="text-cyan-500 text-xl" />
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              placeholder="Profession"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-cyan-500 text-xl" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <IoIosMail className="text-cyan-500 text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              placeholder="Email"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-cyan-500 text-xl" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-2 border border-gray-300 rounded w-full"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="w-full py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorEditAccountModal;
