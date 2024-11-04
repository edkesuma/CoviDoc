"use client";
import React from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import {useParams} from "react-router-dom";
import CreateConsultation from "../../Components/Doctor/Consultation/Create/CreateConsultation.jsx";
function CreateConsultationPage(){
    const {patientId,consultationId} = useParams();
    return (
        <div>
            <ActorNavbar/>
            <CreateConsultation patientId={patientId} consultationId={consultationId}/>
        </div>
    )
}

export default CreateConsultationPage;