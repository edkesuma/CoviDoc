"use client";
import React, {useContext, useEffect, useState} from "react";
import {Label, TextInput, Button, Datepicker, Checkbox, Textarea} from "flowbite-react";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CreateConsultation({patientId, consultationId}) {
    const [Classification, setClassification] = useState('')
    const [ClassificationCon, setClassificationCon] = useState('')
    const [Severity, setSeverity] = useState('')
    const [SeverityCon, setSeverityCon] = useState('')
    const [XrayImage, setXrayImage] = useState('')
    const [highlightImage, setHighlightImage] = useState('')
    const [date, setDate] = useState(Date.now())
    const [temperature, setTemperature] = useState(37)
    const [O2, setO2] = useState(95)
    const [ICU, setICU] = useState(false)
    const [supplemental, setSupplemental] = useState(false)
    const [intubation, setIntubation] = useState(false)
    const [note, setNote] = useState('NA')
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

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
        const formatDate = (date) => {
            const d = new Date(date)
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const data =
            {
                'consultationId': consultationId,
                'consultationDate': formatDate(date),
                'temperature': temperature,
                'o2Saturation': O2,
                'recentlyInIcu': ICU,
                'recentlyNeededSupplementalO2': supplemental,
                'intubationPresent': intubation,
                'consultationNotes': note
            }
        axios
            .patch(`/api/doctor/updateConsultation`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const nextDate = {
                    'gradcam_image_url': XrayImage,
                    'severity_classification': Severity,
                    'severity_confidence': SeverityCon,
                    'type_classification': Classification,
                    'type_confidence': ClassificationCon,
                    'xray_image_url': highlightImage,
                    'consultationDate': formatDate(date),
                    'temperature': temperature,
                    'o2Saturation': O2,
                    'recentlyInIcu': ICU,
                    'recentlyNeededSupplementalO2': supplemental,
                    'intubationPresent': intubation,
                    'consultationNotes': note
                }
                navigate(`/doctor/patient/${patientId}/${consultationId}/additionalInfo`,
                    {state: {formData: nextDate}});
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);
            });
    }

    return (
        <div className='flex justify-center'>
            <div className='w-4/5 flex flex-col'>
                <p className='text-3xl font-bold my-6'>New Consultation</p>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex flex-col w-full md:w-1/2 px-4'>
                        <div className='flex flex-col'>
                            <p className='text-xl text-cyan-400'>X-RAY IMAGE AND AREAS OF INTEREST</p>
                            <div className='flex flex-row w-full'>
                                <div className='flex w-1/2'>
                                    <img src={XrayImage} alt='x'
                                         className='pr-4 py-4 max-w-full max-h-full'/>
                                </div>
                                <div className='flex w-1/2'>
                                    <img src={highlightImage} alt='y'
                                         className='px-4 py-4 max-w-full max-h-full'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mt-6 md:mb-0 mb-12'>
                            <p className='text-xl text-cyan-400  mt-4'>FINDINGS</p>
                            <div className='flex flex-col rounded-lg border-2 border-cyan-400 px-4 py-4 mr-5'>
                                <p>Classification: {Classification}</p>
                                <p>Classification Confidence: {ClassificationCon + '%'}</p>
                                <p>Severity: {Severity}</p>
                                <p>Severity Confidence: {SeverityCon + '%'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <div className='flex flex-col'>
                            <p className='text-xl text-cyan-400'>CONSULTATION INFORMATION</p>
                            <div className='flex flex-col rounded-lg border-2 border-cyan-400 space-y-2 pb-4'>
                                <div className='px-4 pt-2'>
                                    <Label className='font-bold'>Consultation date</Label>
                                    <Datepicker
                                        id="date"
                                        selected={date}
                                        onSelectedDateChanged={(date) => setDate(date)}
                                        defaultDate={new Date()}
                                        minDate={new Date(1900, 0, 1)}
                                        maxDate={new Date()}
                                        autoHide={true}
                                        showClearButton={false}
                                        showTodayButton={false}
                                        weekStart={7}
                                        required
                                    />
                                </div>
                                <div className='px-4'>
                                    <Label className='font-bold'>Temperature </Label>
                                    <TextInput id="classificationCon" required type="number" min="20" max="50"
                                               value={temperature}
                                               onChange={(e) => {
                                                   if (e.target.value >= 20 && e.target.value <= 50) {
                                                       setTemperature(e.target.value)
                                                   }
                                               }}
                                    />
                                </div>
                                <div className='px-4'>
                                    <Label className='font-bold'>O2 saturation </Label>
                                    <TextInput id="severity" required type="number" min="20" max="100"
                                               value={O2}
                                               onChange={(e) => {
                                                   if (e.target.value >= 20 && e.target.value <= 100) {
                                                       setO2(e.target.value)
                                                   }
                                               }}
                                    />
                                </div>
                                <div className='px-4 flex justify-between items-center'>
                                    <Label>Recently been in ICU</Label>
                                    <Checkbox id="ICU" onChange={(e) => setICU(e.target.checked)}/>
                                </div>
                                <div className='px-4 flex justify-between items-center'>
                                    <Label>Recently in need of supplemental O2</Label>
                                    <Checkbox id="supplemental" onChange={(e) => setSupplemental(e.target.checked)}/>
                                </div>
                                <div className='px-4 flex justify-between items-center'>
                                    <Label>Intubation present</Label>
                                    <Checkbox id="intubation" onChange={(e) => setIntubation(e.target.checked)}/>
                                </div>
                                <div className='px-4'>
                                    <Label className='font-bold'>Consultation Notes</Label>
                                    <Textarea id="notes" value={note}
                                              required rows={6} onChange={(event) => setNote(event.target.value)}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Button color='cyan' type={"submit"} onClick={upload} className='text-cyan-400 my-10'>Generate
                    Prescriptions and
                    Lifestyle
                    Changes</Button>
            </div>
        </div>
    );
}

export default CreateConsultation;