"use client";
import React, {useState} from "react";
import {Label, TextInput, Button} from "flowbite-react";
import x from '../../../../assets/X-ray/before.jpg'
import y from '../../../../assets/X-ray/after.jpg'

function CreateConsultation() {
    const [classification, setClassification] = useState('Covid')
    const [classificationCon, setClassificationCon] = useState('96%')
    const [severity, setSeverity] = useState('Mild')
    const [severityCon, setSeverityCon] = useState('78%')
    const [change, setChange] = useState(false)
    return (
        <div className='flex justify-center'>
            <div className='w-4/5 flex flex-col'>
                <p className='text-3xl font-bold'>Creating Consultation</p>
                <div className='flex flex-row mt-8'>
                    <div className='flex flex-col w-1/3'>
                        <p className='text-cyan-400 text-2xl'>X-RAY IMAGE</p>
                        <div className='bg-gray-100 flex justify-center my-4 py-8'>
                            <img src={x} alt='before'></img>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 mx-4'>
                        <p className='text-cyan-400 text-2xl'>AREAS OF INTEREST</p>
                        <div className='bg-gray-100 flex justify-center my-4 py-8'>
                            <img src={y} alt='before'></img>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 mx-4'>
                        <p className='text-cyan-400 text-2xl'>FINDINGS</p>
                        <div className='flex flex-col border-2 border-cyan-400 rounded-lg my-4 space-y-4'>
                            <div className='px-4'>
                                <Label className='font-bold'>Classification: </Label>
                                <TextInput id="classification" required value={classification}
                                           onChange={(e) => setClassification(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Classification Confidence: </Label>
                                <TextInput id="classificationCon" required value={classificationCon}
                                           onChange={(e) => setClassificationCon(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity: </Label>
                                <TextInput id="severity" required value={severity}
                                           onChange={(e) => setSeverity(e.target.value)}/>
                            </div>
                            <div className='px-4'>
                                <Label className='font-bold'>Severity: </Label>
                                <TextInput id="severityCon" required value={severityCon}
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
                    <Button color='cyan' type={"submit"} className='text-cyan-400 w-3/4'>Continue</Button>
                </div>
            </div>
        </div>
    );
}

export default CreateConsultation;