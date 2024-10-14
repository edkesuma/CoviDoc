"use client";

import {Button, Modal, Spinner} from "flowbite-react";
import React, {useContext, useState} from "react";
import DropImageInput from "../../../OverallActorModal/DropImageInput.jsx";
import {LuStethoscope} from "react-icons/lu";
import axios from "axios";
import {AuthContext} from "../../../Authentication/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function UploadXrayImage({patientId, modalOpen, setModalOpen}) {
    const {token} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [xrayImage, setXrayImage] = useState(null)
    const navigate = useNavigate();
    const upload = () => {
        var formData = new FormData();
        formData.append('patientId', patientId)
        formData.append('xrayImage', xrayImage);
        axios
            .put(`/api/doctor/generateClassification`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log("Got Image: ", response.data);
                const nextDate = {
                    'consultationId': response.data.data.consultationId,
                    'gradcam_image_url': response.data.data.gradcam_image_url,
                    'severity_classification': response.data.data.severity_classification,
                    'severity_confidence': response.data.data.severity_confidence,
                    'type_classification': response.data.data.type_classification,
                    'type_confidence': response.data.data.type_confidence,
                    'xray_image_url': response.data.data.xray_image_url
                }
                setModalOpen(false);
                navigate(`/doctor/patient/${patientId}/${response.data.data.consultationId}/classification`,
                    {state: {formData: nextDate}});
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);
            });
    }

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
                    {isLoading ? (
                        <div className="text-center text-8xl">
                            <Spinner aria-label="Extra large spinner example" size="xl"/>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex font-bold justify-center text-2xl mt-2">
                                Upload X-Ray
                            </div>
                            <div className="flex w-full flex-col px-4 justify-center my-4 mb-10">
                                <div className="items-center">
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
                            <div className="w-full flex justify-center">
                                <Button color="cyan" className="text-cyan-300" onClick={
                                    ()=> {
                                        setIsLoading(true);
                                        upload();
                                    }
                                }>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default UploadXrayImage;