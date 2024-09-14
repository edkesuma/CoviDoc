"use client";
import Patient from "../../../assets/Patient.jpg";
import {FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import React from "react";

function PatientDetail({patientDetails}) {
    return (
        <div className='flex flex-row'>
            <div className='w-1/2 flex flex-col mx-4'>
                <img src={Patient} className='mb-3'></img>
                <div className='flex flex-row my-1'>
                    <FaUser color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patientDetails.name}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaTransgender color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patientDetails.gender}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaBirthdayCake color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patientDetails.dob}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <MdEmail color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patientDetails.email}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaPhoneAlt color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patientDetails.phone}</p>
                </div>
            </div>
            <div className='w-1/2 flex flex-col mx-4'>
                <div className='h-1/2'>
                    <p className='text-xl text-cyan-400'>ALLERGIES</p>
                    <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg'>
                        {patientDetails.allergies ? (
                            <p>{patientDetails.allergies}</p>
                        ) : (
                            <p className='text-gray-500'>&nbsp;No known allergies.</p>
                        )
                        }
                    </div>
                </div>
                <div className='h-1/2'>
                    <p className='text-xl text-cyan-400'>MEDICAL HISTORY</p>
                    <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg'>
                        {patientDetails.medicalHistory ? (
                            <p>{patientDetails.medicalHistory}</p>
                        ) : (
                            <p className='text-gray-500'>&nbsp;No known medical history.</p>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientDetail