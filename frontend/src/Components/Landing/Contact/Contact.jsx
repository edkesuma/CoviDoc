"use client";
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Contact() {
    return (
        <div>
            <div className='mx-20'>
                <p className='text-lg text-cyan-400'>CONTACT</p>
                <br/>
                <p className="font-bold text-5xl">Reach Out to Us</p>
                <br/>
                <p className="text-xl">
                    Want to get in touch? We’d love to hear from you.<br/>
                    Here’s how you can reach us!
                </p>
            </div>

            <div className="p-5"></div>

            <div className='flex justify-center'>
                <div className='w-11/12 flex flex-col md:flex-row items-center mt-5'>
                    <div className='w-96 h-64 flex flex-col items-center'>
                        <FaMapMarkerAlt color='cyan' size='80'/>
                        <br/>
                        <p className='text-2xl font-bold'>OUR MAIN OFFICE</p>
                        <br/>
                        <p className='text-2xl text-center'>461 Clementi Rd, <br/>Singapore 599491</p>
                    </div>
                    <div
                        className='w-96 h-64 flex flex-col items-center'>
                        <FaPhoneAlt color='cyan' size='80'/>
                        <br/>
                        <p className='text-2xl font-bold '>PHONE NUMBER</p>
                        <br/>
                        <p className='text-2xl text-center '>6248 9746</p>
                    </div>
                    <div
                        className='w-96 h-64 flex flex-col items-center'>
                        <FaEnvelope color='cyan' size='80'/>
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
