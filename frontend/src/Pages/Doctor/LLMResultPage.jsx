"use client";
import React, {useContext} from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Suggested from "../../Components/Doctor/Consultation/View/Suggested.jsx";
import {Button} from "flowbite-react";
import axios from "axios";
import {AuthContext} from "../../Components/Authentication/AuthContext.jsx";

function LLMResultPage(){
    const {patientId,consultationId} = useParams();
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const upload = () => {
        axios
            .put(`/api/doctor/generateReport`,{consultationId:consultationId} , {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("Got Report: ", response.data);
                navigate(`/doctor/patient/${patientId}/${consultationId}/pdf`);
            })
            .catch((error) => {
                console.log("Error creating report: ", error);
            });
    }

    return (
        <div>
            <ActorNavbar/>
            <Results patientId={patientId}/>
            <Suggested consultationId={consultationId}></Suggested>
            <div className='flex justify-center my-8'>
                <Button type="submit" className='bg-cyan-400 text-white border-2 border-cyan-400 mx-20 w-full'
                        onClick={upload}
                >Generate PDF Report</Button>
            </div>
        </div>
    )
}

export default LLMResultPage;