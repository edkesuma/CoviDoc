"use client";
import React, {useState} from "react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";
import {Button} from "flowbite-react";


function ViewPDF() {
    const id = '6'
    const date = '26 October 2023'
    const doctor = 'Dr. John Doe'
    const infected = false
    const address = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
    const [viewAble, setViewAble] = useState(true)

    return (
        <div>
            <div className='mx-20 py-20 px-20 border-2 border-cyan-400 rounded-xl'>
                <div className='flex flex-row'>
                    <p className='text-2xl font-bold'>Consultation #{id} Results</p>
                    {viewAble ? (
                        <p className="ml-4 bg-cyan-400 text-white text-center py-2 px-8 rounded-full">
                            Patient View Enabled
                        </p>
                    ) : (
                        <p className="ml-4 bg-gray-400 text-white text-center py-2 px-8 rounded-full">
                            Patient View Disabled
                        </p>
                    )}
                </div>
                <p>
                    Consultation on {date}
                </p>
                <p>
                    Consulted with {doctor}
                </p>
                <div className='flex flex-row'>
                    {infected ? (
                        <div className='flex flex-row'>
                            <FaBriefcaseMedical color='red' className='w-8 h-8'/>
                            Patient is &nbsp; <p className='text-red-500'>infected</p> &nbsp; with COVID-19.
                        </div>
                    ) : (
                        <div className='flex flex-row items-center'>
                            <AiFillSafetyCertificate color='green' className='w-8 h-8'/>
                            <div className='flex flex-row h-8 items-center'>Patient is &nbsp; <p
                                className='text-green-500'>not infected</p> &nbsp; with COVID-19.
                            </div>
                        </div>
                    )}
                    <Button className='bg-white text-cyan-400 border-2 border-cyan-400 ml-auto'
                            onClick={() => setViewAble(!viewAble)}
                    >{viewAble ? ('Disable Patient View') : ('Enable Patient View')}</Button>
                </div>
                <div className='flex justify-center mt-10 py-10 bg-gray-200'>
                    <object className="pdf"
                            data={address}
                            width="1000"
                            height="1000">
                    </object>
                </div>
            </div>
            <div className='flex justify-center'>
                <Button className='bg-cyan-400 w-3/4 mt-8'>Done</Button>
            </div>
        </div>
    )
}

export default ViewPDF