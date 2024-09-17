"use client";
import {FaUser} from "react-icons/fa";
import {Card} from "flowbite-react";
import React from "react";
import {Dropdown} from "flowbite-react";

function ViewPatients({patients}) {
    return (
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/6">Profile</div>
                <div className="w-1/4">Name</div>
                <div className="w-1/4">Email</div>
                <div className="w-1/4">Current State</div>
            </div>
            {patients.map((patient, index) => (
                <Card key={index} className="p-4">
                    <div className="flex flex-row items-center">
                        {/* Profile Picture */}
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
                                <Dropdown.Item>Opened</Dropdown.Item>
                                <Dropdown.Item>Closed</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ViewPatients;
