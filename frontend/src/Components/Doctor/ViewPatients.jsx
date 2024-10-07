import {FaUser} from "react-icons/fa";
import {Card, Dropdown} from "flowbite-react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewPatients({patients, token, onUpdate}) {
    const navigate = useNavigate();
    const updatePatientState = (patientId, newState) => {
        console.log("newSAtate:", newState);
        axios
            .patch(
                '/api/doctor/updatePatientState',
                { 'patientId':patientId,
                    'currentState':newState },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {
                console.log(response);
                onUpdate(patientId, newState);
            })
            .catch(error => {
                console.error("Error updating patient state:", error);
            });
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-row mx-6 font-bold">
                <div className="w-2/12">Profile</div>
                <div className="w-4/12">Patient Name</div>
                <div className="w-4/12">Email</div>
                <div className="w-2/12 text-center">Current State</div>
            </div>

            {patients.map((patient) => (
                <Card 
                    key={patient.patientId} 
                    onClick={() => navigate(`/doctor/patient/${patient.patientId}`)} 
                    className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                    <div className="flex flex-row items-center">
                        <div className="w-2/12">
                            {patient.profilePictureUrl ? (
                                <img
                                    src={patient.profilePictureUrl}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <FaUser color="cyan" className="w-10 h-10"/>
                            )}
                        </div>
                        <div className="w-4/12 truncate">{patient.name}</div>
                        <div className="w-4/12 truncate">{patient.email}</div>
                        <div className="w-2/12 flex justify-center" onClick={(e) => e.stopPropagation()}>
                            <Dropdown label={patient.currentState} color='cyan'>
                                <Dropdown.Item onClick={() => updatePatientState(patient.patientId, "Open")}>
                                    Open
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => updatePatientState(patient.patientId, "Closed")}>
                                    Closed
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ViewPatients;
