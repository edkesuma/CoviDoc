import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaUser, FaStethoscope, FaVenusMars, FaBirthdayCake, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import DoctorEditAccountModal from './DoctorEditAccountModal'; // Ensure the correct path to the modal

function DocMainModal({ doctorProfile }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

  const handleEditClick = () => {
    setIsEditModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false); // Close the modal
  };

  return (
    <div className="flex">
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-screen-lg flex space-x-16 relative">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="w-52 h-52 object-cover"
            src={doctorProfile.profilePictureUrl || "https://via.placeholder.com/150"}  // Placeholder if no image URL
            alt="No profile picture set."
          />
        </div>

        {/* Profile Information */}
        <div className="space-y-2 text-lg mr-10">
          <p className="text-gray-600 flex items-center">
            <FaUser className="mr-2 text-cyan-400" /> {doctorProfile.name}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaStethoscope className="mr-2 text-cyan-400" /> {doctorProfile.specialization}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaVenusMars className="mr-2 text-cyan-400" /> {doctorProfile.gender}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaBirthdayCake className="mr-2 text-cyan-400" /> {doctorProfile.dob}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaEnvelope className="mr-2 text-cyan-400" /> {doctorProfile.email}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaPhoneAlt className="mr-2 text-cyan-400" /> {doctorProfile.phone}
          </p>
        </div>

        {/* Edit Button */}
        <div className='absolute top-10 right-10'>
          <button 
            className="px-6 py-2 border border-cyan-400 bg-cyan-400 text-white rounded hover:bg-cyan-600 hover:border-cyan-600 transition duration-300"
            onClick={handleEditClick} // Open the modal when clicked
          >
            Edit Account
          </button>
        </div>
      </div>

      {/* DoctorEditAccountModal to be shown on clicking Edit Account */}
      {isEditModalOpen && (
        <DoctorEditAccountModal 
          isOpen={isEditModalOpen}
          onClose={handleCloseModal} // Close the modal
          doctorDetails={doctorProfile} // Pass doctor profile to modal
        />
      )}
    </div>
  );
}

export default DocMainModal;
