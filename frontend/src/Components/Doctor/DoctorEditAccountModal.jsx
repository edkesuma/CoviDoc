import React, { useState, useContext } from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosMail, IoIosClose } from 'react-icons/io';
import DropImageInput from '../OverallActorModal/DropImageInput'; // Ensure the path is correct
import { Datepicker, Modal } from 'flowbite-react'; // Assuming you are using Flowbite's Modal component
import axios from 'axios';
import { AuthContext } from "../../Components/Authentication/AuthContext"; // Ensure the path to AuthContext is correct
import { format } from 'date-fns';

function DoctorEditAccountModal({ isOpen, onClose, doctorDetails }) {
  const { token } = useContext(AuthContext);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
};

  // Initialize form states with doctorDetails
  const [name, setName] = useState(doctorDetails.name);
  const [gender, setGender] = useState(doctorDetails.gender);
  const [specialization, setSpecialization] = useState(doctorDetails.specialization);
  const [dob, setDob] = useState(parseDate(doctorDetails.dob));
  const [email, setEmail] = useState(doctorDetails.email);
  const [phone, setPhone] = useState(doctorDetails.phone);
  const [profileImage, setProfileImage] = useState(null);

  

  console.log('Doctor Details:', doctorDetails);
  console.log("Dob is: ", dob);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('specialization', specialization);
    formData.append('dob', format(dob, 'dd/MM/yyyy'));
    formData.append('email', email);
    formData.append('phone', phone);
    if (profileImage) {
      formData.append('profilePicture', profileImage);
    }

    try {
      const response = await axios.patch('/api/doctor/updateDoctor', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Doctor information updated successfully:', response.data);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating doctor information:', error);
    }
  };

  const handleClose = () => {
    onClose(); // Close modal without saving
  };

  return (
    <Modal show={isOpen} size="2xl" onClose={handleClose}>
      <Modal.Header>
        <p className="text-2xl font-bold text-cyan-500">Editing Your Account</p>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
          {/* Left Side: Image Upload */}
          <div className="flex flex-col items-center">
            <DropImageInput file={profileImage} setFile={setProfileImage} show={true} />
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
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="py-2 border border-gray-300 rounded w-full"
                placeholder="Specialization"
                required
              />
            </div>

            <div className="flex items-center gap-2">
                <Datepicker
                  id="birth"
                  selected={dob}
                  onSelectedDateChanged={(date) => setDob(date)}
                  defaultDate={dob}
                  minDate={new Date(1900, 0, 1)}
                  maxDate={new Date()}
                  autoHide={true}
                  showClearButton={false}
                  showTodayButton={false}
                  weekStart={7}
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
              Save
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default DoctorEditAccountModal;
