"use client";
import React from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import {useParams} from "react-router-dom";
import ModelPrediction from "../../Components/Doctor/Consultation/Create/ModelPrediction.jsx";
function ModelPredictionPage(){
    const {patientId,consultationId} = useParams();
    return (
        <div>
            <ActorNavbar/>
            <div className='bg-gray-100'>
                <ModelPrediction patientId={patientId} consultationId={consultationId}/>
            </div>
        </div>
    )
}

export default ModelPredictionPage;