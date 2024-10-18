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
                <div className="w-1/5">Doctor</div>
                <div className="w-1/5">Patient View</div>
                <div className="w-1/5">Date</div>
            </div>
            {sortedConsultations.length !== 0 ? (
                sortedConsultations.map((consultation, index) => (
                    <Card
                        key={index}
                        onClick={() => {
                            if (consultation.workflowStage === "COMPLETED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/pdf`);
                            }
                            if (consultation.workflowStage === "LLM_PREDICTED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/additionalInfo`);
                            }
                            if (consultation.workflowStage === "FIXED_PREDICTION") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/newClassification`);
                            }
                            if (consultation.workflowStage === "CLASSIFIED") {
                                navigate(`/doctor/patient/${patientId}/${consultation.consultationId}/classification`);
                            }
                        }}
                        className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
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
                            <div className="w-3/5 text-left">Consultation #{consultation.consultationId}</div>
                            <div className="w-1/5">{consultation.doctorName}</div>
                            {consultation.workflowStage === "COMPLETED" ? (
                                <div className='w-2/5 flex flex-row'>
                                    {consultation.viewableToPatient ? (
                                        <div className="w-1/2 text-green-500">Enabled</div>
                                    ) : (
                                        <div className="w-1/2 text-red-500">Disabled</div>
                                    )}
                                    <div className="w-1/2">{consultation.consultationDate}</div>
                                </div>
                            ) : (
                                <div className="w-2/5 text-red-500">
                                    Workflow not completed. Continue Workflow.
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
