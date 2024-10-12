"use client";
import React, {useContext, useEffect, useState} from "react";
import PatientModal from "../Modal/PatientModal.jsx";
import Xray from '../../../../assets/xray.jpg'
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {Spinner} from "flowbite-react";

function Results({patientId}) {
    const location = useLocation();
    const formData = location.state?.formData;
    const [openModal, setOpenModal] = useState(false);
    const [patient,setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && patientId) {
            const fetchPatientDetails = async () => {
                try {
                    const response = await axios.get(`/api/doctor/getPatientDetails`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            patientId: patientId
                        }
                    });
                    console.log(response.data.patient)
                    setPatient(response.data.patient);
                    setIsLoading(false);
                } catch (error) {
                    console.log("Error fetching patient details: ", error);
                    setIsLoading(false);
                }
            }
            fetchPatientDetails()
        }
    }, [token, patientId]);

    function onCloseModal() {
        setOpenModal(false);
    }

    const findingsText =
        'Classification: ' + formData.type_classification + '\n' +
        'Classification Confidence: ' + formData.type_confidence + '%' + '\n' +
        'Severity: ' + formData.severity_classification + '\n' +
        'Severity Confidence: ' + formData.severity_confidence + '%'


    const consultationInfoText =
        'Consulted on: ' + formData.consultationDate + '\n' +
        'O2 saturation: ' + formData.o2Saturation + '\n' +
        'Recently been in ICU: ' + formData.recentlyInIcu + '\n' +
        'Recently needed supplemental O2: ' + formData.recentlyNeededSupplementalO2 + '\n' +
        'Intubation present: ' + formData.intubationPresent + '\n' +
        'Consultation notes: ' + formData.consultationNotes

    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl"/>
        </div>
    ) : (
        <div className='px-20'>
            <p className='text-3xl font-bold my-4'>Classification Results</p>
            <div className='flex flex-row'>
                <div className='w-2/3 pr-16'>
                    <p className='text-xl text-cyan-400'>X-RAY IMAGE AND AREAS OF INTEREST</p>
                    <div className='flex flex-row bg-gray-100 w-full py-20'>
                        <div className='flex w-1/2'>
                            <img src={formData.xray_image_url} alt='x'
                                 className='px-4 py-4 max-w-full max-h-full'/>
                        </div>
                        <div className='flex w-1/2'>
                            <img src={formData.gradcam_image_url} alt='y'
                                 className='px-4 py-4 max-w-full max-h-full'/>
                        </div>
                    </div>
                </div>
                <div className='w-1/3 pr-16'>
                    <p className='text-xl text-cyan-400'>FINDINGS</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-8 mb-8'
                         style={{whiteSpace: 'pre-wrap'}}>
                        {findingsText.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <p className='text-xl text-cyan-400'>CONSULTATION INFORMATION</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-8 mb-8'
                         style={{whiteSpace: 'pre-wrap'}}>
                        Patient:&nbsp;
                        <button
                            onClick={() => setOpenModal(true)}
                            className="text-cyan-400 bg-transparent border-none cursor-pointer">
                            {patient.name}
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