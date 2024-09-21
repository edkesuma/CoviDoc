"use client";
import React, {useEffect, useState} from "react";
import {Textarea, Button} from "flowbite-react";

function Suggested({ prescriptions, setPrescriptions, lifestyleChanges, setLifestyleChanges }) {
    const [lifestyleEditable, setLifestyleEditable] = useState(false);
    const [prescriptionEditable, setPrescriptionEditable] = useState(false);

    useEffect(() => {
        const formattedLifestyleChanges = lifestyleChanges
            .map(change => `• ${change.lifestyleChange}`)
            .join('\n');
        setLifestyleChanges(formattedLifestyleChanges);
        const formattedPrescriptions = prescriptions
            .map(prescription => `• ${prescription.prescriptionName[0]}: ${prescription.prescriptionName[1]}`)
            .join('\n');
        setPrescriptions(formattedPrescriptions);
    }, []);

    useEffect(() => {
        console.log(lifestyleChanges);
    }, [lifestyleChanges]);

    useEffect(() => {
        console.log(prescriptions);
    }, [prescriptions]);

    const handleKeyDown = (e, value, setValue) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const newValue = value.substring(0, selectionStart) + '\n• ' + value.substring(selectionEnd);
            setValue(newValue);
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 3; // Move cursor after the bullet point
            }, 0);
        }
    };

    return (
        <div className='px-20'>
            <div className='flex flex-row'>
                <div className='w-1/2 pr-16'>
                    <p className='text-xl text-cyan-400'>SUGGESTED PRESCRIPTIONS</p>
                    <Textarea
                        id="prescriptionText"
                        required
                        rows={10}
                        value={prescriptions}
                        onChange={(e) => setPrescriptions(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, prescriptions, setPrescriptions)}
                        readOnly={!prescriptionEditable}
                        className={prescriptionEditable ? ('border-cyan-400') : ('border-none')}
                    />
                    <div className='flex justify-center my-4'>
                        <Button type="submit" className='bg-white text-cyan-400 border-2 border-cyan-400 w-full'
                                onClick={() => setPrescriptionEditable(!prescriptionEditable)}
                        >{prescriptionEditable ? ('Save') : ('Modify Prescriptions')}</Button>
                    </div>
                </div>
                <div className='w-1/2 pr-16'>
                    <p className='text-xl text-cyan-400'>SUGGESTED LIFESTYLE CHANGES</p>
                    <Textarea
                        id="prescriptionText"
                        required
                        rows={10}
                        value={lifestyleChanges}
                        onChange={(e) => setLifestyleChanges(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, lifestyleChanges, setLifestyleChanges)}
                        readOnly={!lifestyleEditable}
                        className={lifestyleEditable ? ('border-cyan-400') : ('border-none')}
                    />
                    <div className='flex justify-center my-4'>
                        <Button type="submit" className='bg-white text-cyan-400 border-2 border-cyan-400 w-full'
                                onClick={() => setLifestyleEditable(!lifestyleEditable)}
                        >{lifestyleEditable ? ('Save') : ('Modify Lifestyle Changes')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suggested;