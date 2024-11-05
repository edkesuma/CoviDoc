"use client";
import React from "react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import {Button} from "flowbite-react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import axios from "axios";

function ViewPDF({viewData}) {
    const {token} = useContext(AuthContext);
    const {patientId, consultationId} = useParams();
    const infected = false
    const [patientView, setPatientView] = useState(viewData.patientView)
    const navigate = useNavigate();

    const updateViewableToPatient = async () => {
        const newPatientView = !patientView
        setPatientView(newPatientView)
        axios.patch(`/api/doctor/updateViewableToPatient`, {
                "consultationId": consultationId,
                "viewableToPatient": newPatientView
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    }

    return (
        <div>
            <div
                onClick={() => navigate(`/doctor/patient/${patientId}`)}
                className="flex flex-row ml-5 md:ml-20 items-center cursor-pointer"
            >
                <IoArrowBackCircleOutline color="cyan" className="h-8 w-8"/>
                <button
                    className="text-3xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer hover:font-bold hover:text-cyan-400 transition duration-300">
                    Back
                </button>
            </div>

            <div className="p-2 md:p-5"></div>

            <div className='mx-5 md:mx-20 py-10 md:py-20 px-5 md:px-20 border-2 border-cyan-400 rounded-xl'>
                <div className='flex flex-col md:flex-row'>
                    <p className='text-2xl font-bold hidden md:flex'>Consultation #{consultationId}</p>
                    <p className='md:text-2xl flex flex-col font-bold md:hidden'>
                        Consultation:
                        <p>{consultationId}</p>
                    </p>
                    {patientView ? (
                        <p className="my-4 md:my-0 ml-4 bg-cyan-400 text-white text-center py-2 px-8 rounded-full">
                            Patient View Enabled
                        </p>
                    ) : (
                        <p className="my-4 md:my-0 ml-4 bg-gray-400 text-white text-center py-2 px-8 rounded-full">
                            Patient View Disabled
                        </p>
                    )}
                </div>
                <p className='hidden md:flex'>
                    Consultation on &nbsp;<b>{viewData.consultationDate}</b>
                </p>
                <p className='hidden md:flex'>
                    Consulted with &nbsp;<b>{viewData.doctorName}</b>
                </p>
                <div className='flex flex-col md:flex-row'>
                    {infected ? (
                        <div className='flex-row'>
                            <div className='hidden md:flex'>
                                <FaBriefcaseMedical color='red' className='w-8 h-8'/>
                            </div>
                            Patient is &nbsp; <p className='text-red-500'>infected</p> &nbsp; with COVID-19.
                        </div>
                    ) : (
                        <div className='flex-row items-center'>
                            <div className='hidden md:flex'>
                                {viewData.status === "Healthy" ? (
                                    <AiFillSafetyCertificate className="w-8 h-8 text-green-500"/>
                                ) : viewData.status === "Mild" ? (
                                    <FaBriefcaseMedical className="w-8 h-8 text-yellow-300"/>
                                ) : viewData.status === "Moderate" ? (
                                    <FaBriefcaseMedical className="w-8 h-8 text-orange-500"/>
                                ) : viewData.status === "Severe" ? (
                                    <FaBriefcaseMedical className="w-8 h-8 text-red-500"/>
                                ) : null}
                                &nbsp; &nbsp;
                            </div>
                            {viewData.classification === "Healthy" ? (
                                <div className='flex flex-row h-8 items-center'>Patient is &nbsp; <p
                                    className='text-green-500 font-bold'>healthy</p>.
                                </div>
                            ) : viewData.status === "Mild" ? (
                                <div className='flex flex-row h-8 items-center'>Patient has a &nbsp; <p
                                    className='text-yellow-300 font-bold'>mild</p> &nbsp; case
                                    of {viewData.classification}.
                                </div>
                            ) : viewData.status === "Moderate" ? (
                                <div className='flex flex-row h-8 items-center'>Patient has a &nbsp; <p
                                    className='text-orange-500 font-bold'>moderate</p> &nbsp; case
                                    of {viewData.classification}.
                                </div>
                            ) : viewData.status === "Severe" ? (
                                <div className='flex flex-row h-8 items-center'>Patient has a &nbsp; <p
                                    className='text-red-500 font-bold'>severe</p> &nbsp; case
                                    of {viewData.classification}.
                                </div>
                            ) : null}
                        </div>
                    )}
                    <Button className='bg-white text-cyan-400 border-2 border-cyan-400 w-full md:w-1/5 md:ml-auto'
                            onClick={() => updateViewableToPatient()}
                    >{patientView ? ('Disable Patient View') : ('Enable Patient View')}</Button>
                </div>
                <div className='flex justify-center mt-10 py-10 bg-gray-200'>
                    <object className="pdf"
                            data={viewData.reportUrl}
                            width="1000"
                            height="1000">
                    </object>
                </div>
            </div>
            <div className="p-10"></div>
        </div>
    )
}

export default ViewPDF