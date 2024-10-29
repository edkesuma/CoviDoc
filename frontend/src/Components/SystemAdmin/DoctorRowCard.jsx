import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
// components
import DeleteDoctorModal from "./DeleteDoctorModal";
import ViewUpdateDoctorModal from "./ViewUpdateDoctorModal";

function DoctorRowCard({ data }) {
    const [selectedDoctor, setSelectedDoctor] = useState(null); // Store the selected doctor
    const [viewDoctorShow, setViewDoctorShow] = useState(false);
    const [deleteDoctorShow, setDeleteDoctorShow] = useState(false);

    // handle delete doctor account
    const handleDeleteDoctor = (doctor) => {
        setSelectedDoctor(doctor); // set the selected doctor to be deleted
        setDeleteDoctorShow(true); // show delete modal
    };

    // handle view doctor account
    const handleViewDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setViewDoctorShow(true);  // Show the view modal when a row is clicked
    };


    return (
        <div className="space-y-2">
            <div className="flex flex-row mx-6 font-bold">
                <div className="w-3/12">Doctor Name</div>
                <div className="w-3/12">Specialization</div>
                <div className="w-4/12">Email</div>
                <div className="w-2/12"></div>
            </div>

            {data.map((doctor, index) => (
                <Card 
                    key={index}
                    className="hover:bg-gray-100 transition duration-300 ease-in-out"
                    onClick={() => handleViewDoctor(doctor)}    // open view doctor account on row clicked
                >
                    <div className="flex flex-row items-center">
                        <div className="w-3/12 truncate pr-16">{doctor.name}</div>
                        <div className="w-3/12 truncate pr-16">{doctor.specialization}</div>
                        <div className="w-4/12 truncate pr-16">{doctor.email}</div>
                        <div className="w-2/12">
                            <button
                                type="button"
                                className="flex items-center justify-center w-3/5 py-1 border border-gray-400 text-base font-bold text-gray-400 rounded-xl hover:bg-red-600 hover:border-red-600 hover:text-white transition duration-300"
                                onClick={(e) => {
                                    e.stopPropagation();  // stop row click from triggering
                                    handleDeleteDoctor(doctor);
                                }}
                                >
                                <FaRegTrashAlt className="mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </Card>
            ))}
            
            {/* handle view doctor */}
            {selectedDoctor && (
                <ViewUpdateDoctorModal
                    show={viewDoctorShow}
                    onClose={() => setViewDoctorShow(false)}
                    data={selectedDoctor}
                />
            )}

            {/* handle delete doctor */}
            {selectedDoctor && (
                <DeleteDoctorModal
                    show={deleteDoctorShow}
                    onClose={() => setDeleteDoctorShow(false)}  // close modal if cancel
                    data={selectedDoctor}
                    // onDelete={handleDeleteConfirmation} // delete confirmation
                />
            )}
        </div>
    );
}

export default DoctorRowCard
