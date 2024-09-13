"use client";
import Patient from "../../../assets/Patient.jpg";
import {FaBirthdayCake, FaPhoneAlt, FaTransgender, FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import React from "react";

function PatientDetail() {

    const patient = 'John Smith'
    const gender = 'Male'
    const birthday = '09/09/1999'
    const email = 'johns@gmail.com'
    const phone = '4324 7564'
    const allergies = null
    const history = null

    return (
        <div className='flex flex-row'>
            <div className='w-1/2 flex flex-col mx-4'>
                <img src={Patient} className='mb-3'></img>
                <div className='flex flex-row my-1'>
                    <FaUser color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{patient}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaTransgender color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{gender}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaBirthdayCake color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{birthday}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <MdEmail color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{email}</p>
                </div>
                <div className='flex flex-row my-1'>
                    <FaPhoneAlt color='cyan' className='w-8 h-8 mr-4'/>
                    <p className='border-2 border-cyan-400 w-full rounded-lg'>&nbsp;{phone}</p>
                </div>
            </div>
            <div className='w-1/2 flex flex-col mx-4'>
                <div className='h-1/2'>
                    <p className='text-xl text-cyan-400'>ALLERGIES</p>
                    <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg'>
                        {allergies ? (
                            <p>{allergies}</p>
                        ) : (
                            <p className='text-gray-500'>&nbsp;No known allergies.</p>
                        )
                        }
                    </div>
                </div>
                <div className='h-1/2'>
                    <p className='text-xl text-cyan-400'>MEDICAL HISTORY</p>
                    <div className='border-2 border-cyan-400 w-full h-5/6 rounded-lg'>
                        {history ? (
                            <p>{history}</p>
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