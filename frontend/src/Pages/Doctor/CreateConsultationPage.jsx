"use client";
import React from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import {useParams} from "react-router-dom";
import CreateConsultation from "../../Components/Doctor/Consultation/Create/CreateConsultation.jsx";

function CreateConsultationPage(){
    const {patientId,consultationId} = useParams();

    return(
        <div>
            <ActorNavbar/>
            <div className='bg-gray-100'>
                <CreateConsultation patientId={patientId} consultationId={consultationId}/>
            </div>
        </div>
    )
}
export default CreateConsultationPage;