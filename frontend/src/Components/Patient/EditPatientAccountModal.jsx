"use client";

import { Button, Label, TextInput, Textarea, Modal } from "flowbite-react";
import { IoPerson } from "react-icons/io5";
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail, IoIosClose } from "react-icons/io";
import React, { useState, useContext } from "react";
import axios from "axios";
import DropImageInput from '../OverallActorModal/DropImageInput'; // Ensure the path to DropImageInput is correct
import { AuthContext } from "../../Components/Authentication/AuthContext"; // Ensure path is correct

function EditAccountFormModal({ isOpen, onClose, patientDetails }) {
  const { token } = useContext(AuthContext); // Get token for authentication

  // Initialize form states
  const [name, setName] = useState(patientDetails.name || ""); 
  const [gender, setGender] = useState(patientDetails.gender || "Female");
  const [dob, setDob] = useState(patientDetails.dob || "");
  const [email, setEmail] = useState(patientDetails.email || "");
  const [phone, setPhone] = useState(patientDetails.phone || "");
  const [allergies, setAllergies] = useState(patientDetails.allergies || "");
  const [medicalHistory, setMedicalHistory] = useState(patientDetails.medicalHistory || "");
  const [profileImage, setProfileImage] = useState(null);

  // Submit handler to update patient information
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      name, 
      gender, 
      dob, 
      email, 
      phone, 
      allergies, 
      medicalHistory,
      profilePicture: profileImage, // Assuming you handle the image in the backend
    };

    try {
      await axios.patch("/api/patient/updatePatient", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Patient information updated successfully!");
      onClose(); // Close the modal on successful update
    } catch (error) {
      console.error("Error updating patient information:", error);
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="lg" popup={true}>
      <Modal.Header>
        <p className="text-2xl font-bold text-cyan-500">Editing Your Account</p>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 relative">
          {/* Left Side: Image and Basic Details */}
          <div className="relative flex flex-col items-center px-5 space-y-3">
            {/* Replace with DropImageInput */}
            <DropImageInput
              file={profileImage}
              setFile={setProfileImage}
              show={true} // Ensure it allows file upload
            />

            <div className="w-full flex items-center space-x-2">
              <IoPerson className="text-cyan-500 text-2xl" />
              <TextInput
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="w-full flex items-center space-x-2">
              <FaTransgender className="text-cyan-500 text-2xl" />
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full py-2 border border-gray-300 rounded"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div className="w-full flex items-center space-x-2">
              <FaBirthdayCake className="text-cyan-500 text-2xl" />
              <TextInput
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="w-full flex items-center space-x-2">
              <IoIosMail className="text-cyan-500 text-2xl" />
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="w-full flex items-center space-x-2">
              <FaPhoneAlt className="text-cyan-500 text-2xl" />
              <TextInput
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Right Side: Allergies and Medical History */}
          <div className="space-y-5">
            <div>
              <Label htmlFor="allergies" value="Allergies" className="text-cyan-500 font-medium text-lg" />
              <Textarea
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                rows={5}
                className="w-full resize-none"
              />
            </div>

            <div>
              <Label htmlFor="medicalHistory" value="Medical History" className="text-cyan-500 font-medium text-lg" />
              <Textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                rows={5}
                className="w-full resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <Button type="submit" className="w-full text-cyan-500 border-cyan-400 bg-white hover:bg-cyan-400 hover:text-white">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditAccountFormModal;
