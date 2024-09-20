"use client";
import React, {useState} from "react";
import PatientModal from "../Modal/PatientModal.jsx";
import Xray from '../../../../assets/xray.jpg'

function Results({ findings, consultationInfo, patientDetails }) {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const findingsText =
        'COVID-19 classification: ' + findings.classification + '\n' +
        'Confidence: ' + findings.confidence + '\n' +
        'Severity: ' + findings.severity + '\n' +
        'Observations: ' + findings.observations

    
    const consultationInfoText =
        'Consulted on: ' + consultationInfo.consultationDate + '\n' +
        'O2 saturation: ' + consultationInfo.o2Saturation + '\n' +
        'Leukocyte count: ' + consultationInfo.leukocyteCount + '\n' +
        'Neutrophil count: ' + consultationInfo.neutrophilCount + '\n' +
        'Lymphocyte count: ' + consultationInfo.lymphocyteCount + '\n' +
        'Recently been in ICU: ' + consultationInfo.recentlyInIcu + '\n' +
        'Recently needed supplemental O2: ' + consultationInfo.recentlyNeededSupplementalO2 + '\n' +
        'Intubation present: ' + consultationInfo.intubationPresent + '\n' +
        'Consultation notes: ' + consultationInfo.consultationNotes
    
    const patient = patientDetails.name;


    return (
        <div className='px-20'>
            <p className='text-3xl font-bold my-4'>Classification Results</p>
            <div className='flex flex-row'>
                <div className='w-2/3 pr-16'>
                    <p className='text-xl text-cyan-400'>X-RAY IMAGE</p>
                    <div className='bg-gray-100 flex justify-center items-center'
                         style={{height: '800px'}}>
                        <img src={consultationInfo.xrayImageUrl}></img>
                    </div>
                </div>
                <div className='w-1/3 pr-16'>
                    <p className='text-xl text-cyan-400'>FINDINGS</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-8 mb-8'
                         style={{height: '350px', whiteSpace: 'pre-wrap'}}>
                        {findingsText.split('\n').map((line, index) => (
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
                        <PatientModal isShow={openModal} onClose={onCloseModal} patient={patient}/>
                        {consultationInfoText.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;