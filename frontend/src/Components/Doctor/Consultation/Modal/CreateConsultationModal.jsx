"use client";

import {Button, Checkbox, Label, Modal, TextInput, Datepicker, Textarea} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import DropImageInput from "../../../OverallActorModal/DropImageInput";
import axios from "axios";
import { AuthContext } from "../../../Authentication/AuthContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function CreateConsultationModal({ patientId, modalOpen, setModalOpen }) {
    const { token } = useContext(AuthContext);
    const [date, setDate] = useState(Date.now());
    const [temperature, setTemperature] = useState('')
    const [o2, setO2] = useState('')
    const [leukocyte, setLeukocyte] = useState('')
    const [neutrophil, setNeutrophil] = useState('')
    const [lymphocyte, setLymphocyte] = useState('')
    const [icu, setIcu] = useState(false)
    const [supplemental, setSupplemental] = useState(false)
    const [intubation, setIntubation] = useState(false)
    const [xrayImage, setXrayImage] = useState(null)
    const [consulNotes, setConsulNotes] = useState('')
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (id === 'icu') {
            setIcu(checked);
        } else if (id === 'supplemental') {
            setSupplemental(checked);
        } else if (id === 'intubation') {
            setIntubation(checked);
        }
    };

    const createConsultation = () => {
        var formData = new FormData();
        formData.append('consultationDate', format(date, "dd/MM/yyyy"));
        formData.append('patientId', patientId)
        formData.append('temperature', temperature);
        formData.append('o2Saturation', o2);
        formData.append('leukocyteCount', leukocyte);
        formData.append('neutrophilCount', neutrophil);
        formData.append('lymphocyteCount', lymphocyte);
        formData.append('recentlyInIcu', icu);
        formData.append('recentlyNeededSupplementalO2', supplemental);
        formData.append('intubationPresent', intubation);
        formData.append('xrayImage', xrayImage);
        formData.append('consultationNotes', consulNotes);

        axios
            .put(`/api/doctor/createConsultation`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setModalOpen(false);
                navigate(`/doctor/patient/${patientId}/${response.data.consultationId}`);
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);
            });
    }


    return (
        <div>
            <Modal show={modalOpen} size="4xl" onClose={() => setModalOpen(false)} popup>
                <Modal.Header>
                    <p className="text-xl font-medium text-cyan-400 dark:text-white">New Consultation</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className='flex flex-row'>
                            <div className='flex flex-col w-1/2 px-4'>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="date" value="Consultation date"/>
                                    </div>
                                    <Datepicker
                                        id="birth"
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
                                <div>
                                    <div className="block">
                                        <Label htmlFor="temperature" value="Temperature"/>
                                    </div>
                                    <TextInput
                                        id="temperature"
                                        value={temperature}
                                        onChange={(event) => setTemperature(event.target.value)}
                                        placeholder="36.5°C"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="o2" value="O2 saturation"/>
                                    </div>
                                    <TextInput
                                        id="o2"
                                        value={o2}
                                        onChange={(event) => setO2(event.target.value)}
                                        placeholder="98%"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="leukocyte" value="Leukocyte count"/>
                                    </div>
                                    <TextInput
                                        id="leukocyte"
                                        value={leukocyte}
                                        onChange={(event) => setLeukocyte(event.target.value)}
                                        placeholder="4500 cells/μL"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="neutrophil" value="Neutrophil Count"/>
                                    </div>
                                    <TextInput
                                        id="neutrophil"
                                        value={neutrophil}
                                        onChange={(event) => setNeutrophil(event.target.value)}
                                        placeholder="3000 cells/μL"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="lymphocyte" value="Lymphocyte Count"/>
                                    </div>
                                    <TextInput
                                        id="lymphocyte"
                                        value={lymphocyte}
                                        onChange={(event) => setLymphocyte(event.target.value)}
                                        placeholder="1500 cells/μL"
                                        required
                                    />
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="icu">Recently been in ICU</Label>
                                    <Checkbox id="icu" className="ml-auto" checked={icu} onChange={handleCheckboxChange}/>
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="supplemental">Recently in need of supplemental O2</Label>
                                    <Checkbox id="supplemental" className="ml-auto" checked={supplemental} onChange={handleCheckboxChange}/>
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="intubation">Intubation present</Label>
                                    <Checkbox id="intubation" className="ml-auto" checked={intubation} onChange={handleCheckboxChange}/>
                                </div>
                            </div>

                            <div className='flex w-1/2 flex-col px-4 justify-center'>
                                <div className='items-center'>
                                    <div className="flex flex-col items-center">
                                        <DropImageInput
                                            name="xray"
                                            file={xrayImage}
                                            setFile={setXrayImage}
                                            show={true}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="notes" value="Consultation Notes"/>
                                    </div>
                                    <Textarea id="notes" placeholder="Previously had mild ground glass opacities." required rows={4} onChange={(event) => setConsulNotes(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button onClick={createConsultation}>Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateConsultationModal;