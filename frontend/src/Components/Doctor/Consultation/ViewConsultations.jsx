"use client";

import {Card} from "flowbite-react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import React from "react";

function ViewConsultations({data}) {
    return (
        <div className="mx-20 space-y-4">
            <div className='flex flex-row mx-8 font-bold'>
                <div className="w-1/5">Status</div>
                <div className="w-1/5 text-left">Consultation ID</div>
                <div className="w-1/5">Doctor</div>
                <div className="w-1/5">Patient View</div>
                <div className="w-1/5">Date</div>
            </div>
            {data.map((item, index) => (
                <Card key={index}>
                    <div className="flex flex-row">
                        <div className="w-1/5">
                            {item.Status ? (
                                <AiFillSafetyCertificate color="green" className="w-8 h-8"/>
                            ) : (
                                <FaBriefcaseMedical color="red" className="w-8 h-8"/>
                            )}
                        </div>
                        <button className="w-1/5 text-left">Consultation #{item.ConsultationID}</button>
                        <div className="w-1/5">{item.Doctor}</div>
                        {item.PatientView ? (
                            <div className="w-1/5 text-green-500">Enabled</div>
                        ) : (
                            <div className="w-1/5 text-red-500">Disabled</div>
                        )}
                        <div className="w-1/5">{item.CreationDate}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ViewConsultations;
