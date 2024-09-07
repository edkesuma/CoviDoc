"use client";
import React, {useState} from "react";
import PatientModal from "../Modal/PatientModal.jsx";
import Xray from '../../../../assets/xray.jpg'

function Results() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const text1 =
        'COVID-19 classification: Positive\n' +
        'Confidence: 96%\n' +
        'Severity: Mild\n' +
        'Observations:\n' +
        'The X-ray shows areas of increased opacity in the lungs, which could indicate several conditions, including pneumonia, fluid accumulation, or other infections.\n' +
        'COVID-19 pneumonia typically shows bilateral (both sides) ground-glass opacities, often peripheral and lower lung zones, but can also appear as consolidation or other patterns.'
    const text2 =
        'Consulted on: 01/02/2025\n' +
        'O2 saturation: 95\n' +
        'Leukocyte count: 10\n' +
        'Neutrophil count: 10\n' +
        'Lymphocyte count: 10\n' +
        'Recently been in ICU: True\n' +
        'Recently in need of supplemental O2: False\n' +
        'Intubation present: True\n' +
        'Consultation notes: Previously had mild ground glass opacities.'
    const patient = 'John Smith'


    return (
        <div className='px-20'>
            <p className='text-3xl font-bold my-4'>Classification Results</p>
            <div className='flex flex-row'>
                <div className='w-2/3 pr-16'>
                    <p className='text-xl text-cyan-400'>X-RAY IMAGE</p>
                    <div className='bg-gray-100 flex justify-center items-center'
                         style={{height: '800px'}}>
                        <img src={Xray}></img>
                    </div>
                </div>
                <div className='w-1/3 pr-16'>
                    <p className='text-xl text-cyan-400'>FINDINGS</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-8 mb-8'
                         style={{height: '350px', whiteSpace: 'pre-wrap'}}>
                        {text1.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <p className='text-xl text-cyan-400'>CONSULTATION INFORMATION</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-8 mb-8'
                         style={{height: '350px', whiteSpace: 'pre-wrap'}}>
                        Patient:&nbsp;
                        <button
                            onClick={() => setOpenModal(true)}
                            className="text-cyan-400 bg-transparent border-none cursor-pointer">
                            {patient}
                        </button>
                        <PatientModal isShow={openModal} onClose={onCloseModal}/>
                        {text2.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;