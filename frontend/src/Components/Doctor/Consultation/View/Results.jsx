"use client";
import React, {useContext, useEffect, useState} from "react";
import PatientModal from "../Modal/PatientModal.jsx";
import Xray from '../../../../assets/xray.jpg'
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {Spinner} from "flowbite-react";

function Results({patientId, consultationId}) {
    const [Classification, setClassification] = useState('')
    const [ClassificationCon, setClassificationCon] = useState('')
    const [Severity, setSeverity] = useState('')
    const [SeverityCon, setSeverityCon] = useState('')
    const [XrayImage, setXrayImage] = useState('')
    const [highlightImage, setHighlightImage] = useState('')
    const [date, setDate] = useState(Date.now())
    const [temperature, setTemperature] = useState(null)
    const [O2, setO2] = useState(null)
    const [ICU, setICU] = useState(false)
    const [supplemental, setSupplemental] = useState(false)
    const [intubation, setIntubation] = useState(false)
    const [note, setNote] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        if (token && consultationId) {
            const getItems = async () => {
                try {
                    const response = await axios.get(`/api/doctor/getWorkflowItems`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        params: {
                            consultationId: consultationId
                        }
                    });
                    setClassification(response.data.data.classification);
                    setClassificationCon(response.data.data.classificationConfidence)
                    setSeverity(response.data.data.severity)
                    setSeverityCon(response.data.data.severityConfidence)
                    setXrayImage(response.data.data.xrayImageUrl)
                    setHighlightImage(response.data.data.highlightedXrayImage)
                    setDate(response.data.data.consultationData)
                    setTemperature(response.data.data.temperature)
                    setO2(response.data.data.O2)
                    setICU(response.data.data.ICU)
                    setSupplemental(response.data.data.supplemental)
                    setIntubation(response.data.data.intubation)
                    setNote(response.data.data.note)
                } catch (error) {
                    console.log("Error get consultation data: ", error);
                }
            };
            getItems()
        }
    }, [token, consultationId]);

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

    const formatDate = (date) => {
        const d = new Date(date)
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const findingsText =
        'Classification: ' + Classification + '\n' +
        'Classification Confidence: ' + ClassificationCon + '%' + '\n' +
        'Severity: ' + Severity + '\n' +
        'Severity Confidence: ' + SeverityCon + '%'


    const consultationInfoText =
        'Consulted on: ' + formatDate(date) + '\n' +
        'Temperature' + temperature + '\n' +
        'O2 saturation: ' + O2 + '\n' +
        'Recently been in ICU: ' + ICU + '\n' +
        'Recently needed supplemental O2: ' + supplemental + '\n' +
        'Intubation present: ' + intubation


    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl"/>
        </div>
    ) : (
        <div className='px-20'>
            <p className='text-3xl font-bold my-4'>Classification Results</p>
            <div className='flex flex-col md:flex-row'>
                <div className=' w-full md:w-2/3 pr-16'>
                    <p className='text-xl text-cyan-400'>X-RAY IMAGE AND AREAS OF INTEREST</p>
                    <div className='flex flex-row md:bg-gray-100 w-full py-10 md:py-20'>
                        <div className='flex w-1/2'>
                            <img src={XrayImage} alt='x'
                                 className='px-4 py-4 max-w-full max-h-full'/>
                        </div>
                        <div className='flex w-1/2'>
                            <img src={highlightImage} alt='y'
                                 className='px-4 py-4 max-w-full max-h-full'/>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/3 pr-16'>
                    <p className='text-xl text-cyan-400'>FINDINGS</p>
                    <div className='border-2 border-cyan-400 rounded-lg px-8 py-4 mb-8'
                         style={{whiteSpace: 'pre-wrap'}}>
                        {findingsText.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <p className='text-xl text-cyan-400'>CONSULTATION INFORMATION</p>
                    <div className='flex flex-col border-2 border-cyan-400 rounded-lg px-8 py-4 mb-8 h-64 overflow-y-auto'
                         style={{whiteSpace: 'pre-wrap'}}>
                        <div className='flex flex-row'>
                            Patient:&nbsp;
                            <button
                                onClick={() => setOpenModal(true)}
                                className="text-cyan-400 bg-transparent border-none cursor-pointer">
                                {patient.name}
                            </button>
                        </div>
                        <PatientModal isShow={openModal} onClose={onCloseModal} patient={patient}/>
                        {consultationInfoText.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                        <div className='flex flex-row flex-wrap w-full'>
                            Consultation notes:&nbsp;
                            <div className='w-full break-words'>{note}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;