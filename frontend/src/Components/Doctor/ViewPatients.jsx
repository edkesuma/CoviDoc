import {FaUser} from "react-icons/fa";
import {Card, Dropdown} from "flowbite-react";
import React from "react";
import axios from "axios";

function ViewPatients({patients, token, onUpdate}) {
    const updatePatientState = (patientId, newState) => {
        console.log(newState);
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
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/6">Profile</div>
                <div className="w-1/4">Name</div>
                <div className="w-1/4">Email</div>
                <div className="w-1/4">Current State</div>
            </div>
            {patients.map((patient) => (
                <Card key={patient.patientId} className="p-4">
                    <div className="flex flex-row items-center">
                        <div className="w-1/6">
                            {patient.profilePictureUrl ? (
                                <img
                                    src={patient.profilePictureUrl}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <FaUser color="cyan" className="w-12 h-12"/>
                            )}
                        </div>
                        <div className="w-1/4">{patient.name}</div>
                        <div className="w-1/4">{patient.email}</div>
                        <div className="w-1/4">
                            <Dropdown label={patient.currentState} dismissOnClick={false} color='cyan'>
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
