import { FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import EditPatientAccountModal from "../../Patient/EditPatientAccountModal.jsx";

function PatientDetail({ patientDetails, card }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

  return (
    <>
      <div className={`p-7 bg-white ${card ? 'border border-gray-300 shadow-lg' : ''} rounded-lg relative`}>
        <div className='flex flex-col md:flex-row'>
          {/* Left Side: Image and Basic Info */}
          <div className='md:w-1/3 flex justify-center items-center'>
            {patientDetails.profilePictureUrl ? (
                <img
                    src={patientDetails.profilePictureUrl}
                    className='mb-3 w-52 h-52 object-cover '
                    alt="Patient profile"
                />) : (
                <FaUser className='mb-3 w-52 h-52 object-cover'/>
            )}

          </div>
          <div className='md:w-1/3 flex flex-col mx-4'>
            <div className='flex flex-row my-1'>
              <FaUser color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
              <p className='  w-full rounded-lg'>&nbsp;{patientDetails.name}</p>
            </div>
            <div className='flex flex-row my-1'>
              <FaTransgender color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
              <p className=' w-full rounded-lg'>&nbsp;{patientDetails.gender}</p>
            </div>
            <div className='flex flex-row my-1'>
              <FaBirthdayCake color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
              <p className=' w-full rounded-lg'>&nbsp;{patientDetails.dob}</p>
            </div>
            <div className='flex flex-row my-1'>
              <MdEmail color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
              <p className=' w-full rounded-lg'>&nbsp;{patientDetails.email}</p>
            </div>
            <div className='flex flex-row my-1'>
              <FaPhoneAlt color='cyan' className='w-8 h-8 mr-4 text-cyan-400'/>
              <p className=' w-full rounded-lg'>&nbsp;{patientDetails.phone}</p>
            </div>
          </div>
          {/* Right Side: Allergies and Medical History */}
          <div className='md:w-1/3 flex flex-col mx-5 md:-mt-5'>
            <div className='h-1/2'>
              <p className='text-xl text-cyan-400'>ALLERGIES</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-3'>
                {patientDetails.allergies ? (
                    <p>{patientDetails.allergies}</p>
                ) : (
                    <p className='text-gray-500'>&nbsp;No known allergies.</p>
                )}
              </div>
            </div>
            <div className='h-1/2 mt-4'>
              <p className='text-xl text-cyan-400'>MEDICAL HISTORY</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-3'>
                {patientDetails.medicalHistory ? (
                    <p>{patientDetails.medicalHistory}</p>
                ) : (
                    <p className='text-gray-500'>&nbsp;No known medical history.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EditAccountFormModal to be shown on clicking Edit Account */}
      {isEditModalOpen && (
          <>
          {console.log(patientDetails)} {/* Log the patient details */}
          <EditPatientAccountModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            patientDetails={patientDetails} // Pass patient details to the modal
          />
            {console.log(patientDetails)} {/* Log the patient details */}
        </>
      )}
    </>
  );
}

export default PatientDetail;
