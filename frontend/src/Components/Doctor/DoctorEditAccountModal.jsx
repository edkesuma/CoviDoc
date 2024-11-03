import React, { useState, useEffect, useContext } from 'react';
import { Modal, Datepicker, Select, TextInput } from "flowbite-react";
import { FaUser, FaVenusMars, FaStethoscope, FaBirthdayCake, FaEnvelope, FaPhoneAlt, FaCamera } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import { format } from "date-fns";
import axios from "axios";
// components
import UpdateDoctorSuccess from '../SystemAdmin/UpdateDoctorSuccess';
import DropImageInput from '../OverallActorModal/DropImageInput';

function DoctorEditAccountModal({ isOpen, onClose, doctorDetails }) {
  const { token } = useContext(AuthContext);

  const [fullName, setFullName] = useState(doctorDetails.name);
  const [gender, setGender] = useState(doctorDetails.gender);
  const [birthDate, setBirthDate] = useState(new Date(doctorDetails.dob));
  const [specialization, setSpecialization] = useState(doctorDetails.specialization);
  const [email, setEmail] = useState(doctorDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(doctorDetails.phone);
  const [selectedImage, setSelectedImage] = useState(null);

  const [editDoctorSuccess, setEditDoctorSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setFullName(doctorDetails.name);
    setGender(doctorDetails.gender);

    // ensure date string is parsed correctly
    const parsedDate = typeof doctorDetails.dob === 'string' 
        ? new Date(doctorDetails.dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')) 
        : new Date(doctorDetails.dob);
    // check if the parsed date is valid using getTime() instead of isNaN(parsedDate)
    if (!isNaN(parsedDate.getTime())) {
        setBirthDate(parsedDate);
    } else {
        console.error("Invalid date format: ", doctorDetails.dob);
    }
    
    setSpecialization(doctorDetails.specialization);
    setEmail(doctorDetails.email);
    setPhoneNumber(doctorDetails.phone);
    setSelectedImage(doctorDetails.profilePictureUrl);
  }, [doctorDetails]);


  // handle update doctor account information
  function handleEditDoctor() {
    // validation
    setErrorMessage("");
    
    if (!fullName || !gender || !specialization || !email || !phoneNumber) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (isNaN(phoneNumber)) {
      setErrorMessage("Phone number must be a valid number.");
      return;
    }

    // send data to back-end
    const formData = new FormData();
    formData.append('doctorId', doctorDetails.doctorId);
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phoneNumber);
    formData.append('dob', format(birthDate, "dd/MM/yyyy"));
    formData.append('gender', gender);
    formData.append('specialization', specialization);
    formData.append('profilePicture', selectedImage);

    // create api requests
    axios
      .patch(`/api/doctor/updateDoctor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setEditDoctorSuccess(true);
      })
      .catch((error) => {
        console.log("Error updating doctor account: ", error);
      });
  };

  function resetFields() {
    setFullName(doctorDetails.name);
    setGender(doctorDetails.gender);
    setBirthDate(new Date(doctorDetails.dob));
    setSpecialization(doctorDetails.specialization);
    setEmail(doctorDetails.email);
    setPhoneNumber(doctorDetails.phone);
    setSelectedImage(doctorDetails.profilePictureUrl);

    onClose();
  };

  function handleEditDoctorSuccess() {
    setEditDoctorSuccess(false);
    onClose();
  }


  return (
    <>
      <Modal show={isOpen} onClose={resetFields} size="4xl" popup={true}>
        <Modal.Header>
          <p className="text-2xl font-bold text-black px-10 p-10">Editing Your Account</p>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <div className='flex flex-col md:flex-row'>
              {/* first column */}
              <div className='flex flex-col justify-center my-4 w-full md:w-1/2 space-y-5'>
                {/* profile picture */}
                <div className='flex pl-6 items-start'>
                  <FaCamera 
                    color="#6EE0FA"
                    size={30}
                  />
                  <div className="flex flex-col items-center h-56 ml-2 w-4/5">
                    <DropImageInput
                        name="image"
                        file={selectedImage}
                        setFile={setSelectedImage}
                        show={true}
                    />
                  </div>
                </div>
              </div>

              {/* second column */}
              <div className='flex w-full md:w-1/2 flex-col px-4 justify-center space-y-5'>
                {/* full name */}
                <div className="flex pl-6 items-center">
                  <FaUser 
                    color="#6EE0FA"
                    size={33}
                    style={{ paddingRight: '5px' }}
                  />
                  <TextInput
                    id="fullName"
                    value={fullName}
                    placeholder="Enter full name"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="ml-2 w-4/5"
                  />
                </div>

                {/* gender */}
                <div className="flex pl-4 items-center">
                  <FaVenusMars 
                    color="#6EE0FA"
                    size={37}
                    style={{ marginLeft: '6px' }}
                  />
                  <Select id="gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    required
                    className="ml-1.5 w-4/5">
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </div>

                {/* specialization */}
                <div className="flex pl-4 items-center">
                  <FaStethoscope 
                    color="#6EE0FA"
                    size={31}
                    style={{ marginLeft: '12px' }}
                  />
                  <TextInput
                    id="specialization"
                    value={specialization}
                    placeholder="Enter specialization"
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                    className="ml-2 w-4/5"
                  />
                </div>

                {/* birth date */}
                <div className="flex pl-4 items-center">
                  <FaBirthdayCake 
                    color="#6EE0FA"
                    size={31}
                    style={{ marginLeft: '12px' }}
                  />
                  <Datepicker
                    id="birthDate"
                    selected={birthDate}
                    onSelectedDateChanged={(birthDate) => setBirthDate(birthDate)}
                    defaultDate={birthDate}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date()}
                    autoHide={true}
                    showClearButton={false}
                    showTodayButton={false}
                    weekStart={7}
                    required
                    className="ml-2.5 w-4/5"
                  />
                </div>

                {/* email */}
                <div className="flex pl-4 items-center">
                  <FaEnvelope 
                    color="#6EE0FA"
                    size={31}
                    style={{ marginLeft: '12px' }}
                  />
                  <TextInput
                    id="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="ml-2 w-4/5"
                  />
                </div>

                {/* phone number */}
                <div className="flex pl-4 items-center">
                  <FaPhoneAlt 
                    color="#6EE0FA"
                    size={31}
                    style={{ marginLeft: '12px' }}
                  />
                  <TextInput
                    id="phoneNumber"
                    value={phoneNumber}
                    placeholder="Enter phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="ml-2 w-4/5"
                  />
                </div>
              </div>
            </div>

            <div className="p-1"></div>

            {/* submit/cancel buttons */}
            <div className="flex justify-center space-x-4 mt-6 w-full">
              {/* cancel */}
              <button
                onClick={resetFields}
                className="w-5/12 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
              >
                Cancel
              </button>
              {/* submit */}
              <button
                type="submit"
                onClick={handleEditDoctor}
                className="w-5/12 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition duration-300"
              >
                Save Changes
              </button>
            </div>
            {/* error message */}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* edit account success */}
      <UpdateDoctorSuccess show={editDoctorSuccess} onClose={handleEditDoctorSuccess}/>
    </>
  );
}

export default DoctorEditAccountModal;
