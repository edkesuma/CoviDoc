"use client";

import {Card} from "flowbite-react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import React from "react";

function ViewConsultations({consultations}) {
    return (
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/5">Status</div>
                <div className="w-3/5 text-left">Consultation ID</div>
                <div className="w-1/5">Doctor</div>
                <div className="w-1/5">Patient View</div>
                <div className="w-1/5">Date</div>
            </div>
            {consultations.map((consultation, index) => (
                <Card key={index}>
                    <div className="flex flex-row">
                        <div className="w-1/5">
                            {consultation.status === "Healthy" ? (
                                <AiFillSafetyCertificate color="green" className="w-8 h-8"/>
                            ) : consultation.status === "Mild" ? (
                                <FaBriefcaseMedical color="yellow" className="w-8 h-8"/>
                            ) : consultation.status === "Moderate" ? (
                                <FaBriefcaseMedical color="orange" className="w-8 h-8"/>
                            ) : consultation.status === "Severe" ? (
                                <FaBriefcaseMedical color="red" className="w-8 h-8"/>
                            ) : null}
                        </div>
                        <button className="w-3/5 text-left">Consultation #{consultation.consultationId}</button>
                        <div className="w-1/5">{consultation.doctorName}</div>
                        {consultation.viewableToPatient ? (
                            <div className="w-1/5 text-green-500">Enabled</div>
                        ) : (
                            <div className="w-1/5 text-red-500">Disabled</div>
                        )}
                        <div className="w-1/5">{consultation.consultationDate}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ViewConsultations;
