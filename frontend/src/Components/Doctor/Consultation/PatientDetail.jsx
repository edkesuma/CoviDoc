import { FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";

function PatientDetail({ patientDetails, card }) {
  return (
    <>
      <div className={`p-10 bg-white ${card ? 'shadow-lg' : ''} rounded-lg relative hover:shadow-xl transition duration-300`}>
        <div className='flex flex-col md:flex-row'>
          {/* Left Side: Image and Basic Info */}
          <div className='md:w-1/3 flex justify-center items-center'>
            <img
              src={patientDetails.profilePictureUrl || "https://via.placeholder.com/150"}
              className='mb-3 w-52 h-52 object-cover '
            />

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
            <div className='h-1/2 mt-4'>
              <p className='text-lg text-cyan-400'>ALLERGIES</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-2 text-sm'>
                {patientDetails.allergies ? (
                    <p>{patientDetails.allergies}</p>
                ) : (
                    <p className='text-gray-500'>&nbsp;No known allergies.</p>
                )}
              </div>
            </div>
            <div className='h-1/2 my-4'>
              <p className='text-lg text-cyan-400'>MEDICAL HISTORY</p>
              <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg p-2 text-sm'>
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
    </>
  );
}

export default PatientDetail;
