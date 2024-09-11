"use client";
import React, {useState} from "react";
import {Textarea, Button} from "flowbite-react";

function Suggested() {
    const [prescriptions, setPrescriptions] = useState(
        'Medications:\n' +
        'Acetaminophen (Tylenol): 500 mg every 6 hours as needed for fever or pain.\n' +
        'Vitamin D3: 2000 IU daily.\n' +
        'Zinc: 50 mg daily.\n' +
        'Rest and hydration: Encourage the patient to drink plenty of fluids and rest.\n' +
        '\n' +
        'Instructions:\n' +
        'Monitor symptoms daily; if symptoms worsen (e.g., difficulty breathing, persistent chest pain), seek immediate medical attention.\n' +
        'Follow up with a consultation in 7 days or sooner if symptoms escalate.')
    const [prescriptionEditable, setPrescriptionEditable] = useState(false);
    const [lifestyle, setLifestyle] = useState(
        'Medications:\n' +
        'Take Tylenol (500 mg) every 6 hours as needed for fever or body aches.\n' +
        'Take Vitamin D3 (2000 IU) daily to support your immune system.\n' +
        'Take Zinc (50 mg) daily to aid in recovery.\n' +
        '\n' +
        'Self-Care:\n' +
        'Get plenty of rest and stay hydrated by drinking water, herbal teas, or broths.\n' +
        'Isolate yourself from others in your household as much as possible to prevent spreading the virus.\n' +
        'Monitor your symptoms daily. If you experience')
    const [lifestyleEditable, setLifestyleEditable] = useState(false);
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
                        readOnly={!prescriptionEditable}
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
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value)}
                        readOnly={!lifestyleEditable}
                    />
                    <div className='flex justify-center my-4'>
                        <Button type="submit" className='bg-white text-cyan-400 border-2 border-cyan-400 w-full'
                                onClick={() => setLifestyleEditable(!lifestyleEditable)}
                        >{prescriptionEditable ? ('Save') : ('Modify Prescriptions')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suggested;