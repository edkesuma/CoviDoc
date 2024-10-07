"use client";
import {Card} from "flowbite-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import x from '../../../../assets/X-ray/before.jpg'
import y from '../../../../assets/X-ray/after.jpg'

function ViewXrays({xRays}) {
    const { patientId } = useParams();
    const navigate = useNavigate();
    return (
        <div className="mx-20 space-y-4">
            { xRays.length != 0 ? (
                xRays.map((xRay, index) => (
                    <Card
                        key={index}
                        onClick={() => navigate(`/doctor/patient/${patientId}/${xRay.consultationId}/pdf`)}
                        className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    >
                        <div className='flex flex-col'>
                            <p className='text-xl font-bold'>Consultation #{xRay.consultationId} - {xRay.date}</p>
                            <div className='flex flex-row my-4'>
                                <div className='w-3/5 bg-gray-400 flex flex-row justify-center mx-4'>
                                    <img src={x} alt='x' className='mx-4'/>
                                    <img src={y} alt='y' className='mx-4'/>
                                </div>
                                <div className='w-2/5 border-2 border-cyan-400 rounded-lg mx-4'></div>
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <p className="flex justify-center items-center h-20 bg-gray-200 text-black m-0">
                    No X-Rays yet
                </p>
            )}

        </div>
    );
}

export default ViewXrays;

