import { FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import EditAccountFormModal from "./EditPatientAccountModal";

function ViewAccountDetails({ patientDetails }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

  const handleEditClick = () => {
    setIsEditModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="p-10 bg-white rounded-lg shadow-lg relative w-full space-x-16 hover:shadow-xl transition duration-300">
        <div className='flex flex-col md:flex-row'>
          {/* Left Side: Image and Basic Info */}
          <div className="w-5/12">
            <div className='flex pl-10'>
              <img
                src={patientDetails.profilePictureUrl || "https://via.placeholder.com/150"}
                className='mb-3 w-52 h-52 object-cover '
              />
            </div>

            <div className='p-2'></div>
          
            <div className='flex flex-col pl-10'>
              <div className='flex flex-row my-1'>
                <FaUser color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
                <p className=' w-full rounded-lg'>&nbsp;{patientDetails.name}</p>
              </div>
              <div className='flex flex-row my-1'>
                <FaTransgender color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
                <p className='w-full rounded-lg'>&nbsp;{patientDetails.gender}</p>
              </div>
              <div className='flex flex-row my-1'>
                <FaBirthdayCake color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
                <p className='w-full rounded-lg'>&nbsp;{patientDetails.dob}</p>
              </div>
              <div className='flex flex-row my-1'>
                <MdEmail color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
                <p className='w-full rounded-lg'>&nbsp;{patientDetails.email}</p>
              </div>
              <div className='flex flex-row my-1'>
                <FaPhoneAlt color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
                <p className='w-full rounded-lg'>&nbsp;{patientDetails.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Allergies and Medical History */}
          <div className='flex flex-col md:-mt-5 w-4/12'>
            <div className='h-1/2 mt-4'>
              <p className='text-cyan-400'>ALLERGIES</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-2 text-sm'>
                {patientDetails.allergies ? (
                    <p>{patientDetails.allergies}</p>
                ) : (
                    <p className='text-gray-500'>&nbsp;No known allergies.</p>
                )}
              </div>
            </div>
            <div className='h-1/2 mt-4'>
              <p className='text-cyan-400'>MEDICAL HISTORY</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-2 text-sm'>
                {patientDetails.medicalHistory ? (
                    <p>{patientDetails.medicalHistory}</p>
                ) : (
                    <p className='text-gray-500'>&nbsp;No known medical history.</p>
                )}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className='absolute top-10 right-10 w-2/12'>
            <button 
              className="px-6 py-2 border border-cyan-400 bg-cyan-400 text-white rounded hover:bg-cyan-600 hover:border-cyan-600 transition duration-300"
              onClick={handleEditClick} // Open the modal when clicked
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>

      {/* EditAccountFormModal to be shown on clicking Edit Account */}
      {isEditModalOpen && (
        <EditAccountFormModal 
          isOpen={isEditModalOpen} 
          onClose={handleCloseModal}
          patientDetails={patientDetails} // Pass patient details to the modal
        />
      )}
    </>
  );
}

export default ViewAccountDetails;