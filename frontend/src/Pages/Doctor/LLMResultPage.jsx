"use client";
import React from "react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import {useParams} from "react-router-dom";

function LLMResultPage(){
    const {patientId} = useParams();
    return (
        <div>
            <ActorNavbar/>
            <Results patientId={patientId} />
        </div>
    )
}

export default LLMResultPage;