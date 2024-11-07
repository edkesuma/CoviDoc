import React from "react";
import { FaBullseye, FaClock, FaXRay, FaPrescriptionBottleAlt, FaUserFriends, FaChartBar } from "react-icons/fa";

function Features() {
    return (
        <div className="mx-5 md:mx-20 text-center md:text-left">
            <p className='text-lg text-cyan-400'>FEATURES</p>
            <br/>
            <div>
                <p className='text-3xl md:text-5xl font-bold'>Transforming Healthcare with Innovation</p>
            </div>
            <br/>
            <div>
                <p className='text-2xl'>See what CoviDoc is capable of.</p>
            </div>

            <div className='p-8'></div>

            <div className="space-y-8 md:grid md:grid-cols-2 md:gap-20 md:space-y-2 lg:grid-cols-3">
                <div className="text-red-500 hover:text-red-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center mt-2">
                        <FaBullseye className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-4">94.46% Accuracy</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        AI algorithms ensure accurate results, reducing diagnostic errors and enhancing patient care.
                    </p>
                </div>

                <div className="text-blue-500 hover:text-blue-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center">
                        <FaClock className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-5">Less Than 5s</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        The platform delivers COVID-19 diagnoses in 30 seconds, supporting timely medical decisions.
                    </p>
                </div>

                <div className="text-cyan-500 hover:text-cyan-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center">
                        <FaXRay className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-5">X-Ray Management</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        Easily upload and access X-ray images with our system for quick, organized retrieval.
                    </p>
                </div>

                <div className="text-purple-500 hover:text-purple-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center">
                        <FaPrescriptionBottleAlt className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-5">Treatment Advice</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        Get AI-generated treatment recommendations based on patient data, ensuring effective and up-to-date care.
                    </p>
                </div>

                <div className="text-pink-500 hover:text-pink-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center">
                        <FaUserFriends className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-5">Patient Management</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        The platform allows healthcare providers to record patient profiles and treatment plans, streamlining care quality.
                    </p>
                </div>

                <div className="text-amber-500 hover:text-amber-700 transition duration-300">
                    <div className="flex justify-center md:justify-start items-center">
                        <FaChartBar className="w-8 h-8" />
                        <p className="text-3xl font-bold ml-5">Analytics Dashboard</p>
                    </div>
                    <p className="text-gray-700 text-lg mt-4">
                        Real-time COVID-19 insights with interactive data on infection rates and trends.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Features