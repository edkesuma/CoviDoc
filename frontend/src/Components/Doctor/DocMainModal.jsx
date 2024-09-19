import React from 'react';
import { IoPerson } from 'react-icons/io5';
import { FaTransgender, FaBirthdayCake, FaPhoneAlt } from 'react-icons/fa';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosMail } from 'react-icons/io';

// Updated DocMainModal to accept doctorProfile prop
function DocMainModal({ doctorProfile }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white rounded-lg shadow-md p-4 w-3/4 max-w-screen-md flex justify-between items-center">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="w-40 h-40 object-cover"
            src={doctorProfile.profilePictureUrl || "https://via.placeholder.com/150"}  // Placeholder if no image URL
            alt="Profile"
          />
        </div>

        {/* Profile Information */}
        <div className="ml-6 space-y-2">
          <h2 className="text-2xl font-semibold">{doctorProfile.name}</h2>
          <p className="text-gray-600 flex items-center">
            <LuStethoscope className="mr-2 text-cyan-400" /> {doctorProfile.specialization}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaTransgender className="mr-2 text-cyan-400" /> {doctorProfile.gender}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaBirthdayCake className="mr-2 text-cyan-400" /> {doctorProfile.dob}
          </p>
          <p className="text-gray-600 flex items-center">
            <IoIosMail className="mr-2 text-cyan-400" /> {doctorProfile.email}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaPhoneAlt className="mr-2 text-cyan-400" /> {doctorProfile.phone}
          </p>
        </div>

        {/* Edit Button */}
        <div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Edit Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocMainModal;
