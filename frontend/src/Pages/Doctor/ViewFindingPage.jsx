"use client";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import Suggested from "../../Components/Doctor/Consultation/View/Suggested.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button, Spinner} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewFindingPage() {
    const { token } = useContext(AuthContext);
    const { consultationId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [collectedData, setCollectedData] = useState(null);

    useEffect(() => {
        if (token && consultationId) {
            axios
                .put(`/api/doctor/getAIResults`, {
                    consultationId: consultationId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log("AI Results: ", response.data);
                    setCollectedData(response.data.collectedData);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching AI results: ", error);
                });
        }
    }, [token, consultationId]);

    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
    ) : (
        <div className='flex flex-col items-center'>
            <div>
                <ActorNavbar/>
                <div className='flex flex-row ml-20 items-center my-10'>
                    <IoArrowBackCircleOutline color='cyan' className='h-12 w-12'/>
                    <button className='text-4xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer'>Back
                    </button>
                </div>
                <Results findings={collectedData.findings} consultationInfo={collectedData.consultationInfo} patientDetails={collectedData.patient}/>
                <div className='mb-36'/>
                {/* Note to edrick: left off integration here */}
                <Suggested/>
            </div>
            <Button className='bg-cyan-400 w-2/3 my-10'>Generate Report</Button>
        </div>
    )
}

export default ViewFindingPage;