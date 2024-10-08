import React, { useState, useEffect, useContext } from "react";
import { TextInput, Modal, Datepicker, Select } from "flowbite-react";
import { FaUser, FaVenusMars, FaBirthdayCake, FaEnvelope, FaPhoneAlt, FaCamera, FaLock } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthContext"; // Ensure path is correct
import { format } from "date-fns";
import axios from "axios";
// components
import UpdatePatientSuccess from "../SystemAdmin/UpdatePatientSuccess";
import DropImageInput from '../OverallActorModal/DropImageInput'; // Ensure the path to DropImageInput is correct


function EditAccountFormModal({ isOpen, onClose, patientDetails }) {
  const { token } = useContext(AuthContext); // Get token for authentication

  // Initialize form states
  const [fullName, setFullName] = useState(patientDetails.name); 
  const [gender, setGender] = useState(patientDetails.gender);
  const [birthDate, setBirthDate] = useState(new Date(patientDetails.dob));
  const [email, setEmail] = useState(patientDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(patientDetails.phone);
  const [allergies, setAllergies] = useState(patientDetails.allergies);
  const [medicalHistory, setMedicalHistory] = useState(patientDetails.medicalHistory);
  const [selectedImage, setSelectedImage] = useState(null);

  const [editPatientSuccess, setEditPatientSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setFullName(patientDetails.name);
    setGender(patientDetails.gender);

    // ensure date string is parsed correctly
    const parsedDate = typeof patientDetails.dob === 'string' 
        ? new Date(patientDetails.dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')) 
        : new Date(patientDetails.dob);
    // check if the parsed date is valid using getTime() instead of isNaN(parsedDate)
    if (!isNaN(parsedDate)) {
        setBirthDate(parsedDate);
    } else {
        console.error("Invalid date format: ", patientDetails.dob);
    }
    
    setEmail(patientDetails.email);
    setPhoneNumber(patientDetails.phone);
    setAllergies(patientDetails.allergies);
    setMedicalHistory(patientDetails.medicalHistory);
    setSelectedImage(patientDetails.profilePictureUrl);
  }, [patientDetails]);

  // Submit handler to update patient information
  function handleEditPatient() {
    setErrorMessage("");

    if (!fullName || !gender || !email || !phoneNumber || !allergies || !medicalHistory) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (isNaN(phoneNumber)) {
      setErrorMessage("Phone number must be a valid number.");
      return;
    }

    // send data to back-end
    const formData = new FormData();
    formData.append('patientId', patientDetails.patientId);
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phoneNumber);
    formData.append('dob', format(birthDate, "dd/MM/yyyy"));
    formData.append('gender', gender);
    formData.append('allergies', allergies);
    formData.append('medicalHistory', medicalHistory);
    formData.append('profilePicture', selectedImage);

    axios
      .patch("/api/patient/updatePatient", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log("Patient account updated successfully: ", response.data);
        setEditPatientSuccess(true);
        // onClose();
      })
      .catch((error) => {
          console.log("Error updating patient account: ", error);
      });
  };

  function resetFields() {
    setFullName(patientDetails.name);
    setGender(patientDetails.gender);
    setBirthDate(new Date(patientDetails.dob));
    setEmail(patientDetails.email);
    setPhoneNumber(patientDetails.phone);
    setAllergies(patientDetails.allergies);
    setMedicalHistory(patientDetails.medicalHistory);
    setSelectedImage(patientDetails.profilePictureUrl);

    onClose();
  };

  function handleEditPatientSuccess() {
    setEditPatientSuccess(false);
    onClose();
  }


  return (
    <>
      <Modal show={isOpen} onClose={resetFields} size="4xl" popup={true}>
        <Modal.Header>
          <p className="text-2xl font-bold text-black px-10 pt-10">Editing Your Account</p>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div className='flex flex-row'>
              {/* first column */}
              <div className='flex flex-col w-1/2 space-y-5'>
                {/* profile picture */}
                <div className='flex pl-6 items-start'>
                  <FaCamera
                    color="#6EE0FA"
                    size={30}
                  />
                  {/* drag n drop picture */}
                  <div className="flex flex-col items-center h-56 ml-2 w-4/5">
                    <DropImageInput
                      name="image"
                      file={selectedImage}
                      setFile={setSelectedImage}
                      show={true}
                    />
                  </div>
                </div>

                {/* full name */}
                <div className="flex pl-4 items-center">
                  <FaUser 
                    color="#6EE0FA"
                    size={31}
                    style={{ marginLeft: '12px' }}
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
                    className="ml-1.5 w-5/12">
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
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

              {/* second column */}
              <div className='flex w-1/2 flex-col px-4 space-y-5'>
                {/* allergies */}
                <div className="pl-6 items-center w-11/12">
                  <p className="text-[#6EE0FA]">ALLERGIES</p>
                  <textarea
                    id="allergies"
                    value={allergies}
                    placeholder="Enter allergies"
                    onChange={(event) => setAllergies(event.target.value)}
                    required
                    className="text-sm w-full h-48 p-2 border border-gray-300 bg-gray-50 rounded-md resize-y"
                  />
                </div>

                {/* medical history */}
                <div className="pl-6 items-center w-11/12">
                  <p className="text-[#6EE0FA]">MEDICAL HISTORY</p>
                  <textarea
                    id="medicalHistory"
                    value={medicalHistory}
                    placeholder="Enter medical history"
                    onChange={(event) => setMedicalHistory(event.target.value)}
                    required
                    className="text-sm w-full h-48 p-2 border border-gray-300 bg-gray-50 rounded-md resize-y"
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
                onClick={handleEditPatient}
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
      <UpdatePatientSuccess show={editPatientSuccess} onClose={handleEditPatientSuccess}/>
    </>
  );
}

export default EditAccountFormModal;
