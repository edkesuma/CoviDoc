"use client";

import {Card} from "flowbite-react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";

function formatDateString(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

function ViewConsultations({consultations}) {
    const {patientId} = useParams();
    const navigate = useNavigate();
    const sortedConsultations = [...consultations].sort((a, b) => {
        // First, prioritize consultations that are not completed
        if (a.workflowStage !== "COMPLETED" && b.workflowStage === "COMPLETED") {
            return -1; // a comes before b
        }
        if (a.workflowStage === "COMPLETED" && b.workflowStage !== "COMPLETED") {
            return 1; // b comes before a
        }
        // If both are either completed or not, sort by date (new to old)
        const dateA = new Date(formatDateString(a.consultationDate));
        const dateB = new Date(formatDateString(b.consultationDate));
        return dateB - dateA; // Sort from new to old
    });


    return (
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/5">Status</div>
                <div className="w-3/5 text-left">Consultation ID</div>
                <div className="w-1/5 hidden md:flex">Doctor</div>
                <div className="w-3/5 text-center md:w-1/5 md:text-left">Patient View</div>
                <div className="w-1/5 hidden md:flex">Date</div>
            </div>
            {sortedConsultations.length !== 0 ? (
                sortedConsultations.map((consultation, index) => (
                    <Card
                        key={index}
                        onClick={() => {
                            if (consultation.workflowStage === "COMPLETED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/pdf`);
                            } else if (consultation.workflowStage === "LLM_PREDICTED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/additionalInfo`);
                            } else if (consultation.workflowStage === "FIXED_PREDICTION") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/newClassification`);
                            } else if (consultation.workflowStage === "CLASSIFIED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/classification`);
                            }
                        }}
                        className={
                            `cursor-pointer transition-colors duration-300  ${consultation.workflowStage === "COMPLETED" ? "hover:bg-gray-200" : "bg-gray-200 hover:bg-gray-300 border-2 border-red-500"}`
                        }
                    >
                        <div className="flex flex-row">
                            <div className="w-1/5">
                                {consultation.status === "Healthy" ? (
                                    <AiFillSafetyCertificate className="w-8 h-8 text-green-500"/>
                                ) : consultation.status === "Mild" ? (
                                    <FaBriefcaseMedical className="w-8 h-8 text-yellow-300 font-bold"/>
                                ) : consultation.status === "Moderate to Severe" ? (
                                    <FaBriefcaseMedical color="red" className="w-8 h-8 text-red-500"/>
                                ) : null}
                            </div>
                            <div className="w-3/5 text-left truncate">Consultation #{consultation.consultationId}</div>
                            {consultation.workflowStage === "COMPLETED" ? (
                                <div className='w-3/5 flex flex-row'>
                                    <div className="w-1/3 hidden md:flex">{consultation.doctorName}</div>
                                    {consultation.viewableToPatient ? (
                                        <div
                                            className="w-full text-center md:text-left md:w-1/3 text-green-500">Enabled</div>
                                    ) : (
                                        <div
                                            className="w-full text-center md:text-left md:w-1/3 justify-center text-red-500">Disabled</div>
                                    )}
                                    <div className="w-1/3 hidden md:flex">{consultation.consultationDate}</div>
                                </div>
                            ) : (
                                <div className='w-3/5'>
                                    <div className="hidden md:flex text-red-500 ">
                                        Workflow not completed yet.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Click to continue.</b>
                                    </div>
                                    <div className="md:hidden text-red-500 ">
                                        Workflow not completed.
                                    </div>
                                </div>
                            )}

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
