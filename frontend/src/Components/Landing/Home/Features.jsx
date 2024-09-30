"use client";
import {Card} from "flowbite-react";
import React from "react";
import Feature1 from '../../../assets/feature/feature1.jpg'
import Feature2 from '../../../assets/feature/feature2.jpg'
import Feature3 from '../../../assets/feature/feature3.jpg'
import Feature4 from '../../../assets/feature/feature4.jpg'
import Feature5 from '../../../assets/feature/feature5.jpg'
import Feature6 from '../../../assets/feature/feature6.jpg'

function Features() {
    return (
        <div>
            <div>
                <div className="md:w-2/3 ml-10 md:ml-20">
                    <p className='text-xl text-cyan-400'>FEATURES</p>
                    <br/>
                    <div className='md:w-1/2'>
                        <p className='text-5xl font-bold'>Transforming Healthcare with Innovation</p>
                    </div>
                    <br/>
                    <div className='md:w-2/3'>
                        <p className='text-2xl'>Explore the key tools driving accurate diagnostics and streamlined
                            patient care. See what CoviDoc is capable of.</p>
                    </div>
                </div>
            </div>
            <br/>
            <div className="flex justify-center">
                <div className='flex flex-col md:flex-row w-full md:px-20 md:justify-between items-center'>
                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature1}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            99.48% Accuracy
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            By employing advanced AI algorithms and pre-trained models, we deliver precise and reliable
                            results, reducing diagnostic errors and enhancing patient care.
                        </p>
                    </Card>

                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature2}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Less than 30 Seconds
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            Our platform delivers rapid COVID-19 diagnoses, providing quick and accurate results within
                            30
                            seconds to support timely medical decisions and patient care.
                        </p>
                    </Card>

                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature3}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            X-Ray Management
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            Efficiently upload and access X-ray images with our management system, ensuring quick,
                            organized
                            retrieval for healthcare professionals.
                        </p>
                    </Card>
                </div>
            </div>
            <div className="flex justify-center">
                <div className='flex flex-col md:flex-row w-full md:px-20 md:justify-between items-center'>
                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature4}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Treatment Advice
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            Receive expert, AI-generated treatment recommendations based on a patient’s data. Our system
                            provides guidance for doctors, ensuring effective and up-to-date care for patients.
                        </p>
                    </Card>

                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature5}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Patient Management
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            The platform allows healthcare providers to record patient profiles, medical histories, and
                            treatment plans. This streamlines the patient care process and enhancing overall care
                            quality.
                        </p>
                    </Card>

                    <Card
                        className="max-w-sm my-4"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={Feature6}
                    >
                        <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Analytics Dashboard
                        </h5>
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                            This feature visualizes the COVID-19 landscape in real-time. Gain insights into infection
                            rates, trends and other metrics through interactive data visualization.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Features