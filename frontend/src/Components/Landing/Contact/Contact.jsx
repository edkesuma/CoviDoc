"use client";
import React from "react";
import {FaMapMarkerAlt} from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Contact() {
    return (
        <div>
            <div className='ml-20'>
                <p className='text-xl text-cyan-400'>CONTACT</p>
                <br/>
                <p className="font-bold text-6xl">Reach Out to Us</p>
                <br/>
                <p className="text-2xl">Want to get in touch? We’d love to hear from you. </p>
                <p className="text-2xl">Here’s how you can reach us!</p>
                <br/>
                <br/>
            </div>
            <div className='flex justify-center'>
                <div className='w-11/12 flex flex-row justify-between'>
                    <div
                        className='rounded-xl w-80 h-80 flex mx-3 flex-col justify-center items-center border-2 border-cyan-400'>
                        <FaMapMarkerAlt color='cyan' size='80'/>
                        <br/>
                        <p className='text-2xl font-bold '>OUR MAIN OFFICE</p>
                        <br/>
                        <p className='text-2xl text-center '>461 Clementi Rd, Singapore 599491</p>
                    </div>
                    <div
                        className='rounded-xl w-80 h-80 flex mx-3 flex-col justify-center items-center border-2 border-cyan-400'>
                        <FaPhoneAlt color='cyan' size='80'/>
                        <br/>
                        <p className='text-2xl font-bold '>PHONE NUMBER</p>
                        <br/>
                        <p className='text-2xl text-center '>6248 9746</p>
                    </div>
                    <div
                        className='rounded-xl w-80 h-80 flex mx-3 flex-col justify-center items-center border-2 border-cyan-400'>
                        <IoIosMail color='cyan' size='96'/>
                        <br/>
                        <p className='text-2xl font-bold '>EMAIL</p>
                        <br/>
                        <p className='text-2xl text-center '>simge@mymail.sim.sg</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
