import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
// components
import DeletePatientModal from "./DeletePatientModal";
import ViewUpdatePatientModal from "./ViewUpdatePatientModal";

function PatientRowCard({ data }) {
    const [selectedPatient, setSelectedPatient] = useState(null); // Store the selected patient
    const [viewPatientShow, setViewPatientShow] = useState(false);
    const [deletePatientShow, setDeletePatientShow] = useState(false);

    // handle delete patient account
    const handleDeletePatient = (patient) => {
        setSelectedPatient(patient); // set the selected patient to be deleted
        setDeletePatientShow(true); // show delete modal
    };

    // handle view patient account
    const handleViewPatient = (patient) => {
        setSelectedPatient(patient);
        setViewPatientShow(true);
    };


    return (
        <div className="space-y-2">
            <div className="flex flex-row mx-6 font-bold">
                <div className="w-4/12">Patient Name</div>
                <div className="w-6/12">Email</div>
                <div className="w-2/12"></div>
            </div>

            {data.map((patient, index) => (
                <Card 
                    key={index}
                    className="hover:bg-gray-100 transition duration-300 ease-in-out"
                    onClick={() => handleViewPatient(patient)}    // open view patient account on row clicked
                >
                    <div className="flex flex-row items-center">
                        <div className="w-4/12 truncate pr-16">{patient.name}</div>
                        <div className="w-6/12 truncate pr-16">{patient.email}</div>
                        <div className="w-2/12">
                            <button
                                type="button"
                                className="flex items-center justify-center w-3/5 py-1 border border-gray-400 text-base font-bold text-gray-400 rounded-xl hover:bg-red-600 hover:border-red-600 hover:text-white transition duration-300"
                                onClick={(e) => {
                                    e.stopPropagation();  // stop row click from triggering
                                    handleDeletePatient(patient);
                                }}
                                >
                                <FaRegTrashAlt className="mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </Card>
            ))}

            {/* handle view patient */}
            {selectedPatient && (
                <ViewUpdatePatientModal
                    show={viewPatientShow}
                    onClose={() => setViewPatientShow(false)}
                    data={selectedPatient}
                />
            )}

            {/* handle delete patient */}
            {selectedPatient && (
                <DeletePatientModal
                    show={deletePatientShow}
                    onClose={() => setDeletePatientShow(false)}
                    data={selectedPatient}
                />
            )}
        </div>
    );
}

export default PatientRowCard;