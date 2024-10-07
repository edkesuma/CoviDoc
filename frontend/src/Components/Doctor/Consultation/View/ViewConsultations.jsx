"use client";

import {Card} from "flowbite-react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewConsultations({consultations}) {
    const { patientId } = useParams();
    const navigate = useNavigate();
    return (
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/5">Status</div>
                <div className="w-3/5 text-left">Consultation ID</div>
                <div className="w-1/5">Doctor</div>
                <div className="w-1/5">Patient View</div>
                <div className="w-1/5">Date</div>
            </div>
            { consultations.length != 0 ? (
                consultations.map((consultation, index) => (
                    <Card 
                        key={index} 
                        onClick={() => navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/pdf`)}
                        className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    >
                        <div className="flex flex-row">
                            <div className="w-1/5">
                                {consultation.status === "Healthy" ? (
                                    <AiFillSafetyCertificate className="w-8 h-8 text-green-500"/>
                                ) : consultation.status === "Mild" ? (
                                    <FaBriefcaseMedical className="w-8 h-8 text-yellow-300 font-bold"/>
                                ) : consultation.status === "Moderate" ? (
                                    <FaBriefcaseMedical color="orange" className="w-8 h-8 text-orange-500 font-bold"/>
                                ) : consultation.status === "Severe" ? (
                                    <FaBriefcaseMedical color="red" className="w-8 h-8 text-red-500"/>
                                ) : null}
                            </div>
                            <div className="w-3/5 text-left">Consultation #{consultation.consultationId}</div>
                            <div className="w-1/5">{consultation.doctorName}</div>
                            {consultation.viewableToPatient ? (
                                <div className="w-1/5 text-green-500">Enabled</div>
                            ) : (
                                <div className="w-1/5 text-red-500">Disabled</div>
                            )}
                            <div className="w-1/5">{consultation.consultationDate}</div>
                        </div>
                    </Card>
                ))
            ) : (
                <p className="flex justify-center items-center h-20 bg-gray-200 text-black m-0">
                    No consultations yet
                </p>
            )}
            
        </div>
    );
}

export default ViewConsultations;
