"use client";
import React, {useContext, useEffect, useState} from "react";
import {Textarea, Button, Spinner} from "flowbite-react";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {FaFilePdf} from "react-icons/fa";
import axios from "axios";

function Suggested({consultationId}) {
    const [prescriptions, setPrescriptions] = useState('Nothing');
    const [prescriptionsLink, setPrescriptionsLink] = useState('')
    const [lifestyleChanges, setLifestyleChanges] = useState('Nothing');
    const [lifestyleChangesLink, setLifestyleChangesLink] = useState('')
    const [lifestyleEditable, setLifestyleEditable] = useState(false);
    const [prescriptionEditable, setPrescriptionEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const {token} = useContext(AuthContext);

     const upload = () => {
         const prescriptionsData = jsonPrescriptions(prescriptions)
         console.log("Prescriptions: ", prescriptionsData);
         const lifestyleChangesData = jsonLifestyle(lifestyleChanges)
         console.log("lifestyleChanges: ", lifestyleChangesData);
        var formData ={
            "consultationId":consultationId,
            "prescriptions":prescriptionsData,
            "lifestyleChanges":lifestyleChangesData
        }
        axios
            .patch(`/api/doctor/updatePrescriptionsLifestyleChanges`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("Suggest changed: ", response.data);
            })
            .catch((error) => {
                console.log("Error change: ", error);
            });
    }

    function analysisPrescriptions(str) {
        let jsonString = str.replace(/\\"/g, '"');
        let jsonArray = JSON.parse(jsonString);
        let resultArray = jsonArray.map(item => '• ' + item.prescriptionName[0] + '.');
        let resultString = resultArray.join('\n');
        return resultString
    }

    function jsonPrescriptions(str) {
    let lines = str.split('\n');
    let jsonArray = [];
    lines.forEach(line => {
        let name = line.replace('• ', '').replace('.', '');
        jsonArray.push({
            prescriptionName: [name]
        });
    });
    const jsonS = JSON.stringify(jsonArray)
    return jsonS;
}

    function analysislifestyle(str) {
        let jsonString = str.replace(/\\"/g, '"');
        const lifestyleChanges = JSON.parse(jsonString);
        let lifestyleChangesString = '';
        lifestyleChanges.forEach((item) => {
            lifestyleChangesString += `•  ${item.lifestyleChange[0]}\n`;
            lifestyleChangesString += `${item.lifestyleChange[1]}\n\n`; // 两行换行以便美观
        });
        return lifestyleChangesString
    }

    function jsonLifestyle(str) {
    let lines = str.split('\n').filter(line => line.trim() !== '');
    let jsonArray = [];
    for (let i = 0; i < lines.length; i += 2) {
        let title = lines[i].replace('•', '').trim();
        let description = lines[i + 1].trim();
        jsonArray.push({
            lifestyleChange: [title, description]
        });
    }
    const jsonS = JSON.stringify(jsonArray)
    return jsonS;
}

    useEffect(() => {
        if (token && consultationId) {
            const fetchSuggest = async () => {
                try {
                    const response = await axios.put(`/api/doctor/generateLLMAdditionalInfo`, {consultationId: consultationId}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPrescriptionsLink(response.data.data.prescriptionsLink)
                    setLifestyleChangesLink(response.data.data.lifestyleLink)
                    setPrescriptions(analysisPrescriptions(response.data.data.prescriptions))
                    setLifestyleChanges(analysislifestyle(response.data.data.lifestyleChanges))
                    setIsLoading(false);

                } catch (error) {
                    console.log("Error fetching patient details: ", error);
                    setIsLoading(false);
                }
            }
            fetchSuggest()
        }
    }, [token, consultationId]);

    useEffect(() => {
        console.log(lifestyleChanges);
    }, [lifestyleChanges]);

    useEffect(() => {
        console.log(prescriptions);
    }, [prescriptions]);

    const handleKeyDown = (e, value, setValue) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const {selectionStart, selectionEnd} = e.target;
            const newValue = value.substring(0, selectionStart) + '\n• ' + value.substring(selectionEnd);
            setValue(newValue);
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 3; // Move cursor after the bullet point
            }, 0);
        }
    };

    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl"/>
        </div>
    ) : (
        <div className='px-20'>
            <div className='flex flex-row'>
                <div className='w-1/2 pr-16'>
                    <div className='flex flex-row items-center'>
                        <p className='text-xl text-cyan-400'>SUGGESTED PRESCRIPTIONS</p>
                        <a href={prescriptionsLink} className='mx-2' title='View Prescription PDF'>
                            <FaFilePdf color='cyan'/>
                        </a>
                    </div>
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
                                onClick={() => {
                                    setPrescriptionEditable(!prescriptionEditable);
                                    upload()
                                }}
                        >{prescriptionEditable ? ('Save') : ('Modify Prescriptions')}</Button>
                    </div>
                </div>
                <div className='w-1/2 pr-16'>
                    <div className='flex flex-row items-center'>
                        <p className='text-xl text-cyan-400'>SUGGESTED LIFESTYLE CHANGES</p>
                        <a href={lifestyleChangesLink} className='mx-2' title='View Suggestion PDF'>
                            <FaFilePdf color='cyan'/>
                        </a>
                    </div>
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
                                onClick={() => {
                                    setLifestyleEditable(!lifestyleEditable);
                                    upload()
                                }
                        }
                        >{lifestyleEditable ? ('Save') : ('Modify Lifestyle Changes')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suggested;