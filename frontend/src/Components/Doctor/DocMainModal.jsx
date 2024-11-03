import React, {useState} from 'react';
import {FaUser, FaStethoscope, FaVenusMars, FaBirthdayCake, FaEnvelope, FaPhoneAlt} from 'react-icons/fa';
import DoctorEditAccountModal from './DoctorEditAccountModal'; // Ensure the correct path to the modal

function DocMainModal({doctorProfile}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

    const handleEditClick = () => {
        setIsEditModalOpen(true); // Open the modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false); // Close the modal
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-start bg-white rounded-lg shadow-md py-10 md:pl-14 md:pr-10 w-full max-w-screen-lg relative">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <img
                    className="w-32 h-32 md:w-52 md:h-52 object-cover object-center rounded-full"
                    src={doctorProfile.profilePictureUrl || "https://via.placeholder.com/150"}  // Placeholder if no image URL
                />
            </div>

            {/* Profile Information */}
            <div className="w-full md:w-1/2 space-y-2 text-lg md:mr-10 flex flex-col items-center md:items-start mt-4 md:mt-0">
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
            <div className="md:absolute md:top-10 md:right-10 mt-4 md:mt-0">
                <button 
                    className="px-6 py-2 border border-cyan-400 bg-cyan-400 text-white rounded hover:bg-cyan-600 hover:border-cyan-600 transition duration-300"
                    onClick={handleEditClick} // Open the modal when clicked
                >
                    Edit Account
                </button>
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
