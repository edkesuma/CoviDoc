"use client";
import ConsultationNavbar from "../../Components/Doctor/Consultation/View/ConsultationNavbar.jsx";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import Suggested from "../../Components/Doctor/Consultation/View/Suggested.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button} from "flowbite-react";

function ViewFindingPage() {
    return (
        <div className='flex flex-col items-center'>
            <div>
                <ConsultationNavbar/>
                <div className='flex flex-row ml-20 items-center my-10'>
                    <IoArrowBackCircleOutline color='cyan' className='h-12 w-12'/>
                    <button className='text-4xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer'>Back
                    </button>
                </div>
                <Results/>
                <div className='mb-36'/>
                <Suggested/>
            </div>
            <Button className='bg-cyan-400 w-2/3 my-10'>Generate Report</Button>
        </div>
    )
}

export default ViewFindingPage;