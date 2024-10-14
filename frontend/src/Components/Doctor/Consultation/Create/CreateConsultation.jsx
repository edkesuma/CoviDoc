"use client";
import React, {useContext, useState} from "react";
import { useLocation } from 'react-router-dom';
import {Label, TextInput, Button} from "flowbite-react";
import x from '../../../../assets/X-ray/before.jpg'
import y from '../../../../assets/X-ray/after.jpg'
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CreateConsultation({patientId, consultationId}) {
    const location = useLocation();
    const formData = location.state?.formData;
    const [classification, setClassification] = useState(formData.type_classification)
    const [classificationCon, setClassificationCon] = useState(formData.type_confidence)
    const [severity, setSeverity] = useState(formData.severity_classification)
    const [severityCon, setSeverityCon] = useState(formData.severity_confidence)
    const [change, setChange] = useState(false)
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const upload = () => {
        const data =
            {
                'consultationId': consultationId,
                'classification': classification,
                'classificationConfidence': classificationCon,
                'severity': severity,
                'severityConfidence': severityCon
            }
        axios
            .patch(`/api/doctor/updateFindings`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("Consultation Created", response.data);
                navigate(`/doctor/patient/${patientId}/${consultationId}/newClassification`,
                    { state: { formData: formData } });
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);
            });
    }
    return (
        <div className='flex justify-center'>
            <div className='w-4/5 flex flex-col'>
                <p className='text-3xl font-bold'>Creating Consultation</p>
                <div className='flex flex-row mt-8'>
                    <div className='flex flex-col w-1/3'>
                        <p className='text-cyan-400 text-2xl'>X-RAY IMAGE</p>
                        <div className='bg-gray-100 flex  my-4 py-8'>
                            <img src={formData.xray_image_url} alt='before' className='w-64 h-64 max-w-full max-h-full'></img>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 mx-4'>
                        <p className='text-cyan-400 text-2xl'>AREAS OF INTEREST</p>
                        <div className='bg-gray-100 flex
                          my-4 py-8'>
                            <img src={formData.gradcam_image_url} alt='before' className='w-64 h-64 max-w-full max-h-full'></img>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 mx-4'>
                        <p className='text-cyan-400 text-2xl'>FINDINGS</p>
                        <div className='flex flex-col border-2 border-cyan-400 rounded-lg my-4 space-y-4'>
                            <div className='px-4'>
                                <Label className='font-bold'>Classification: </Label>
                                <TextInput id="classification" required readOnly={!change} value={classification}
                                           onChange={(e) => setClassification(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Classification Confidence: </Label>
                                <TextInput id="classificationCon" required readOnly={!change} value={classificationCon}
                                           onChange={(e) => setClassificationCon(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity: </Label>
                                <TextInput id="severity" required readOnly={!change} value={severity}
                                           onChange={(e) => setSeverity(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity: </Label>
                                <TextInput id="severityCon" required readOnly={!change} value={severityCon}
                                           onChange={(e) => setSeverityCon(e.target.value)}/>
                            </div>
                            <div className='px-4 pb-4 flex justify-center items-center'>
                                {change ? (
                                    <Button color='cyan' className='text-cyan-400'
                                            onClick={() => setChange(false)}>Save</Button>
                                ) : (
                                    <Button color='cyan' className='text-cyan-400'
                                            onClick={() => setChange(true)}>Modify
                                        Findings</Button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center my-10'>
                    <Button color='cyan' type={"submit"} onClick={upload}
                            className='text-cyan-400 w-3/4'>Continue</Button>
                </div>
            </div>
        </div>
    );
}

export default CreateConsultation;