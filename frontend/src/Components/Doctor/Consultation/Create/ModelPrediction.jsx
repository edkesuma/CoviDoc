"use client";
import React, {useState} from "react";
import {Label, TextInput, Button, Datepicker, Checkbox, Textarea} from "flowbite-react";
import x from '../../../../assets/X-ray/before.jpg'
import y from '../../../../assets/X-ray/after.jpg'

function ModelPrediction() {
    const Classification = 'Covid'
    const ClassificationCon = '96%'
    const Severity = 'Mild'
    const SeverityCon = '78%'
    const [date, setDate] = useState(Date.now())
    const [temperature, setTemperature] = useState('36.5')
    const [O2, setO2] = useState('95')
    const [ICU, setICU] = useState(false)
    const [supplemental, setSupplemental] = useState(false)
    const [intubation, setIntubation] = useState(false)
    const [note, setNote] = useState('Previously had mild ground glass opacities.')

    return (
        <div className='flex justify-center'>
            <div className='w-4/5 flex flex-col'>
                <p className='text-3xl font-bold my-6'>X-Ray Model Predictions</p>
                <div className='flex flex-row'>
                    <div className='flex flex-col w-1/2 px-4'>
                        <div className='flex flex-col'>
                            <p className='text-xl text-cyan-400'>X-RAY IMAGE AND AREAS OF INTEREST</p>
                            <div className='flex flex-row bg-gray-100 w-full'>
                                <img src={x} alt='x' className='px-4 py-4 w-72 h-72'/>
                                <img src={y} alt='y' className='px-4 py-4 w-72 h-72'/>
                            </div>
                        </div>
                        <div className='flex flex-col mt-6'>
                            <p className='text-xl text-cyan-400  mt-4'>FINDINGS</p>
                            <div className='flex flex-col rounded-lg border-2 border-cyan-400 px-4 py-4'>
                                <p>Classification: {Classification}</p>
                                <p>Classification Confidence: {ClassificationCon}</p>
                                <p>Severity: {Severity}</p>
                                <p>Severity Confidence: {SeverityCon}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <div className='flex flex-col'>
                            <p className='text-xl text-cyan-400'>CONSULTATION INFORMATION</p>
                            <div className='flex flex-col rounded-lg border-2 border-cyan-400 space-y-2 pb-4'>
                                <div className='px-4'>
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
                                    <TextInput id="classificationCon" required value={temperature}
                                               onChange={(e) => setTemperature(e.target.value)}/>
                                </div>
                                <div className='px-4'>
                                    <Label className='font-bold'>O2 saturation </Label>
                                    <TextInput id="severity" required value={O2}
                                               onChange={(e) => setO2(e.target.value)}/>
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
                <Button color='cyan' type={"submit"} className='text-cyan-400 my-10'>Generate Prescriptions and
                    Lifestyle
                    Changes</Button>
            </div>
        </div>
    );
}

export default ModelPrediction;