"use client";
import React, {useContext, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import {Label, TextInput, Button, Select} from "flowbite-react";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ModelPrediction({patientId, consultationId}) {
    const [classification, setClassification] = useState('')
    const [classificationCon, setClassificationCon] = useState('')
    const [severity, setSeverity] = useState('')
    const [severityCon, setSeverityCon] = useState('')
    const [XrayImage, setXrayImage] = useState('')
    const [highlightImage, setHighlightImage] = useState('')
    const [change, setChange] = useState(false)
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

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
                } catch (error) {
                    console.log("Error get consultation data: ", error);
                }
            };
            getItems()
        }
    }, [token, consultationId]);
    const upload = () => {
        // validation
        setErrorMessage("");
        if (!classification || !classificationCon || !severity || !severityCon) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

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
                navigate(`/doctor/patient/${patientId}/${consultationId}/newClassification`);
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);
            });
    }
    return (
        <div className='mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12'>
            <div className='flex flex-col'>
                <p className='text-3xl font-bold'>X-Ray Classification Model Results</p>
                <div className='flex flex-col items-center md:flex-row mt-8'>
                    <div className='flex flex-col md:items-start items-center w-full md:w-1/3'>
                        <p className='text-cyan-400 text-xl'>X-RAY IMAGE</p>
                        <div className='flex py-8'>
                            <img src={XrayImage} alt='before' className='w-64 h-64 max-w-full max-h-full'></img>
                        </div>
                    </div>
                    <div className='flex flex-col md:items-start items-center w-full md:w-1/3 mx-4'>
                        <p className='text-cyan-400 text-xl'>AREAS OF INTEREST</p>
                        <div className='flex py-8'>
                            <img src={highlightImage} alt='before' className='w-64 h-64 max-w-full max-h-full'></img>
                        </div>
                    </div>
                    <div className='flex flex-col w-full md:w-1/3 mx-4'>
                        <p className='text-cyan-400 text-xl'>FINDINGS</p>
                        <div className='flex flex-col border-2 border-cyan-400 rounded-lg my-4 space-y-4'>
                            <div className='px-4 pt-3'>
                                <Label className='font-bold'>Classification: </Label>
                                <Select id="classification" required value={classification}
                                        disabled={!change}
                                        onChange={(e) => setClassification(e.target.value)}
                                >
                                    <option value="Healthy">Healthy</option>
                                    <option value="Covid-19">Covid-19</option>
                                    <option value="Other Lung Infection">Other Lung Infection</option>
                                </Select>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Classification Confidence: </Label>
                                <TextInput id="classificationCon" required type="number" min="0" max="100"
                                           readOnly={!change} value={classificationCon}
                                           onChange={(e) => {
                                               if (e.target.value >= 0 && e.target.value <= 100) {
                                                   setClassificationCon(e.target.value)
                                               }
                                           }}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity: </Label>
                                <Select id="severity" required value={severity}
                                        disabled={!change}
                                        onChange={(e) => setSeverity(e.target.value)}
                                >
                                    <option value="NA">NA</option>
                                    <option value="Mild">Mild</option>
                                    <option value="Moderate to Severe">Moderate to Severe</option>
                                </Select>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity Confidence: </Label>
                                <TextInput id="severityCon" required type="number" min="0" max="100"
                                           readOnly={!change} value={severityCon}
                                           onChange={(e) => {
                                               if (e.target.value >= 0 && e.target.value <= 100) {
                                                   setSeverityCon(e.target.value)
                                               }
                                           }}
                                />
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
                <div className='flex justify-center mt-10'>
                    <Button color='cyan' type={"submit"} onClick={upload}
                            className='text-cyan-400 w-3/4'>Continue</Button>
                </div>
                {/* error message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}
            </div>
            <div className="p-5" />
        </div>
    );
}

export default ModelPrediction;