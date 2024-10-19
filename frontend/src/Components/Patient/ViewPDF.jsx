import React from "react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewPDF({ viewData }) {
    const { token } = useContext(AuthContext);
    const { consultationId } = useParams();
    const navigate = useNavigate();
    const infected = false


    return (
        <div>
            <div
                onClick={() => navigate("/patient")}
                className="flex flex-row ml-20 hover:font-bold hover:text-cyan-500 items-center cursor-pointer"
            >
                <IoArrowBackCircleOutline color="cyan" className="h-8 w-8"/>
                <button className="text-3xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer transition duration-300">
                    Back
                </button>
            </div>

            <div className="p-5"></div>

            <div className='mx-20 py-20 px-20 border-2 border-cyan-400 rounded-xl'>
                <p className='text-2xl font-bold'>Consultation #{consultationId} Results</p>

                <div className="p-1"></div>

                <p>Consultation on <b>{viewData.consultationDate}</b></p>
                <p>Consulted with <b>{viewData.doctorName}</b></p>

                <div className="flex flex-row">
                    {infected ? (
                        <div className='flex flex-row'>
                            <FaBriefcaseMedical color='red' className='w-8 h-8'/>
                            Patient is &nbsp; <p className='text-red-500'>infected</p> &nbsp; with COVID-19.
                        </div>
                    ) : (
                        <div className='flex flex-row items-center'>
                            {viewData.status === "Healthy" ? (
                                <AiFillSafetyCertificate className="w-8 h-8 text-green-500"/>
                            ) : viewData.status === "Mild" ? (
                                <FaBriefcaseMedical className="w-8 h-8 text-yellow-300 font-bold"/>
                            ) : viewData.status === "Moderate to Severe" ? (
                                <FaBriefcaseMedical color="red" className="w-8 h-8 text-red-500"/>
                            ) : null}
                            &nbsp; &nbsp;
                            {viewData.classification === "Healthy" ? (
                                <div className='flex flex-row h-8 items-center'>Patient is &nbsp; <p
                                    className='text-green-500 font-bold'>healthy</p>.
                                </div>
                            ) : viewData.status === "Mild" ? (
                                <div className='flex flex-row h-8 items-center'>Patient has a &nbsp; <p
                                    className='text-yellow-300 font-bold'>mild</p> &nbsp; case of {viewData.classification}.
                                </div>
                            ) : viewData.status === "Moderate to Severe" ? (
                                <div className='flex flex-row h-8 items-center'>Patient has a &nbsp; <p
                                    className='text-orange-500 font-bold'>moderate to severe</p> &nbsp; case of {viewData.classification}.
                                </div>
                            ) : null}
                        </div>
                    )}
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

export default ViewPDF;