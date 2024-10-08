"use client";

import {Button, Modal} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import DropImageInput from "../../../OverallActorModal/DropImageInput.jsx";
import {LuStethoscope} from "react-icons/lu";
import axios from "axios";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

function UploadXrayImage({modalOpen, setModalOpen}) {
    //const { token } = useContext(AuthContext);
    const [xrayImage, setXrayImage] = useState(null)
    //const navigate = useNavigate();

    /*
        const createConsultation = () => {
            var formData = new FormData();
            formData.append('patientId', patientId)
            formData.append('xrayImage', xrayImage);

            axios
                .put(`/api/doctor/createConsultation`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    console.log("Consultation created successfully: ", response.data);
                    setModalOpen(false);
                    navigate(`/doctor/patient/${patientId}/${response.data.consultationId}`);
                })
                .catch((error) => {
                    console.log("Error creating consultation: ", error);
                });
        }
    */

    return (
        <div>
            <Modal show={modalOpen} size="4xl" onClose={() => setModalOpen(false)} popup>
                <Modal.Header>
                    <div className='flex flex-row items-center'>
                        <div>
                            <LuStethoscope color='cyan' className='w-6 h-6 mr-2'/>
                        </div>
                        <p className="text-xl font-medium text-cyan-300 dark:text-white">Create New Consultation</p>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col'>
                        <div className='flex justify-center text-2xl mt-2'>
                            Upload X-Ray
                        </div>
                        <div className='flex w-full flex-col px-4 justify-center my-4 mb-10'>
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
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Button color='cyan' className='text-cyan-300'>Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UploadXrayImage;