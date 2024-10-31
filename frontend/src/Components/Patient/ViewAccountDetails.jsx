import {FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import React, {useState} from "react";
import EditAccountFormModal from "./EditPatientAccountModal";

function ViewAccountDetails({patientDetails}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

    const handleEditClick = () => {
        setIsEditModalOpen(true); // Open the modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false); // Close the modal
    };

    return (
        <div>
            <div
                className="p-6 sm:p-10 bg-white rounded-lg shadow-lg relative w-full space-y-6 md:space-y-0 md:space-x-16 hover:shadow-xl transition duration-300">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: Image and Basic Info */}
                    <div className="flex flex-col items-center w-full md:w-5/12">
                        <div className="flex justify-center md:justify-start pl-0 md:pl-10">
                            <img
                                src={patientDetails.profilePictureUrl || "https://via.placeholder.com/150"}
                                className="mb-3 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-contain rounded-full"
                            />
                        </div>
                        <div className="flex flex-col items-center md:items-start space-y-2 md:pl-10 mt-4">
                            <div className="flex items-center">
                                <FaUser color="cyan" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-cyan-400"/>
                                <p className="text-gray-800">{patientDetails.name}</p>
                            </div>
                            <div className="flex items-center">
                                <FaTransgender color="cyan" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-cyan-400"/>
                                <p className="text-gray-800">{patientDetails.gender}</p>
                            </div>
                            <div className="flex items-center">
                                <FaBirthdayCake color="cyan" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-cyan-400"/>
                                <p className="text-gray-800">{patientDetails.dob}</p>
                            </div>
                            <div className="flex items-center">
                                <MdEmail color="cyan" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-cyan-400"/>
                                <p className="text-gray-800">{patientDetails.email}</p>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt color="cyan" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-cyan-400"/>
                                <p className="text-gray-800">{patientDetails.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Allergies and Medical History */}
                    <div className="flex flex-col w-full md:w-7/12 md:mt-0 ">
                        <div className="w-full md:h-1/2 mt-4 my-4">
                            <p className="text-xl text-cyan-400">ALLERGIES</p>
                            <div className="border-2 border-cyan-400 w-full h-full rounded-lg p-2 text-sm">
                                {patientDetails.allergies ? (
                                    <p>{patientDetails.allergies}</p>
                                ) : (
                                    <p className="text-gray-500">No known allergies.</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:h-1/2 mt-4 my-4">
                            <p className="text-xl text-cyan-400">MEDICAL HISTORY</p>
                            <div className="border-2 border-cyan-400 w-full h-full rounded-lg p-2 text-sm">
                                {patientDetails.medicalHistory ? (
                                    <p>{patientDetails.medicalHistory}</p>
                                ) : (
                                    <p className="text-gray-500">No known medical history.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit Button */}
                <div className="flex justify-center w-full">
                    <button
                        className="px-6 py-2 my-4 md:my-8 border border-cyan-400 bg-cyan-400 text-white rounded hover:bg-cyan-600 hover:border-cyan-600 transition duration-300"
                        onClick={handleEditClick}
                    >
                        Edit Account
                    </button>
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
        </div>
    );
}

export default ViewAccountDetails;