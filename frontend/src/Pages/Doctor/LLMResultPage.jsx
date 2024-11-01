"use client";
import React, {useContext, useState} from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Suggested from "../../Components/Doctor/Consultation/View/Suggested.jsx";
import {Button, Modal} from "flowbite-react";
import axios from "axios";
import {AuthContext} from "../../Components/Authentication/AuthContext.jsx";
import loadingGIF from "../../assets/loading.gif";

function LLMResultPage() {
    const {patientId, consultationId} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const upload = () => {
        axios
            .put(`/api/doctor/generateReport`, {consultationId: consultationId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                navigate(`/doctor/patient/${patientId}/${consultationId}/pdf`);
            })
            .catch((error) => {
                console.log("Error creating report: ", error);
            });
    }

    return (
        <div>
            <ActorNavbar/>
            <Modal show={modalOpen} size="xl" popup>
                <Modal.Header />

                <Modal.Body>
                    <div className="flex justify-center">
                        <div className="p-6 text-center">
                            <img src={loadingGIF} alt="Loading" className="w-146 h-10" />
                            <p className="text-xl font-semibold pt-5">Generating Report...</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Results patientId={patientId} consultationId={consultationId}/>
            <Suggested consultationId={consultationId}></Suggested>
            <div className='flex justify-center my-8'>
                <Button type="submit" className='bg-cyan-400 text-white border-2 border-cyan-400 mx-20 w-10/12'
                        onClick={() => {
                            setModalOpen(true);
                            upload();
                        }}
                >Generate PDF Report</Button>
            </div>
        </div>
    )
}

export default LLMResultPage;