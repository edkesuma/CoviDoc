"use client";
import React, {useContext, useEffect, useState} from "react";
import {Textarea, Button, Spinner} from "flowbite-react";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {FaFilePdf} from "react-icons/fa";
import axios from "axios";

function Suggested({consultationId}) {
    const [Classification, setClassification] = useState('')
    const [prescriptions, setPrescriptions] = useState('You are healthy. No prescriptions are needed.');
    const [prescriptionsLink, setPrescriptionsLink] = useState('')
    const [lifestyleChanges, setLifestyleChanges] = useState('You are healthy. No lifestyle changes are needed.');
    const [lifestyleChangesLink, setLifestyleChangesLink] = useState('')
    const [lifestyleEditable, setLifestyleEditable] = useState(false);
    const [prescriptionEditable, setPrescriptionEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const {token} = useContext(AuthContext);

    const upload = () => {
        let formData;
        if(Classification!='Healthy') {
            const prescriptionsData = jsonPrescriptions(prescriptions)
            const lifestyleChangesData = jsonLifestyle(lifestyleChanges)
            formData = {
                "consultationId": consultationId,
                "prescriptions": prescriptionsData,
                "lifestyleChanges": lifestyleChangesData
            };
        }else {
            formData = {
                "consultationId": consultationId,
                "prescriptions": prescriptions,
                "lifestyleChanges": lifestyleChanges
            }
        }
        axios
            .patch(`/api/doctor/updatePrescriptionsLifestyleChanges`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .catch((error) => {
                console.log("Error change: ", error);
            });
    }

    function analysisPrescriptions(str) {
        let jsonString = str.replace(/\\"/g, '"');
        let jsonArray = JSON.parse(jsonString);
        let resultArray = jsonArray.map(item => '• ' + item.prescriptionName[0] + ': ' + item.prescriptionName[1]);
        let resultString = resultArray.join('\n\n');
        return resultString
    }

    function jsonPrescriptions(str) {
        let lines = str.split('\n\n');
        let jsonArray = [];
        lines.forEach(line => {
            line = line.replace('•', '').replace('.', '')
            let [name, reason] = line.split(':').map(item => item.trim());
            jsonArray.push({
                prescriptionName: [name, reason]
            });
        });
        const jsonS = JSON.stringify(jsonArray)
        return jsonS;
    }

    function analysislifestyle(str) {
        let jsonString = str.replace(/\\"/g, '"');
        let jsonArray = JSON.parse(jsonString);
        let resultArray = jsonArray.map(item => '• ' + item.lifestyleChange[0].replace('.', '') + ': ' + item.lifestyleChange[1]);
        let resultString = resultArray.join('\n\n');
        return resultString
    }

    function jsonLifestyle(str) {
        let lines = str.split('\n\n');
        let jsonArray = [];
        lines.forEach(line => {
            line = line.replace('•', '').replace('.', '')
            let [name, reason] = line.split(':').map(item => item.trim());
            jsonArray.push({
                lifestyleChange: [name, reason]
            });
        });
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
                }
            }
            const fetchClassification = async () => {
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
                } catch (error) {
                    console.log("Error get consultation data: ", error);
                }
            }
            Promise.all([fetchSuggest(), fetchClassification()])
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.log("Error fetching suggestion ", error);
                    setIsLoading(false);
                });
        }
    }, [token, consultationId]);


    const handleKeyDown = (e, value, setValue) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const {selectionStart, selectionEnd} = e.target;
            const newValue = value.substring(0, selectionStart) + '\n\n• ' + value.substring(selectionEnd);
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
        <div className='mt-5 md:mt-12 mx-5 md:mx-20'>
            <div className='flex flex-col md:flex-row md:space-x-10'>
                <div className='w-full md:w-1/2'>
                    <div className='flex flex-row items-center'>
                        <p className='text-xl text-cyan-400'>SUGGESTED PRESCRIPTIONS</p>
                        {Classification !== 'Healthy' && (
                            <a href={prescriptionsLink} className="mx-2" title="View Prescription PDF">
                                <FaFilePdf color="cyan" />
                            </a>
                        )}
                        {Classification === 'Healthy' && (
                            <FaFilePdf color="gray" />
                        )}
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
                <div className='w-full md:w-1/2'>
                    <div className='flex flex-row items-center'>
                        <p className='text-xl text-cyan-400'>SUGGESTED LIFESTYLE CHANGES</p>
                        {Classification !== 'Healthy' && (
                            <a href={lifestyleChangesLink} className="mx-2" title="View Suggestion PDF">
                                <FaFilePdf color="cyan" />
                            </a>
                        )}
                        {Classification === 'Healthy' && (
                            <FaFilePdf color="gray" />
                        )}
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