import {Button} from "flowbite-react";
import Staff from '../../../assets/staff.jpg'
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

function HealthCare() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className="flex flex-row mx-5 md:mx-20 text-center md:text-left">
            <div className='flex w-full md:w-4/5 h-full'>
                <div className='flex flex-col w-full items-center md:items-start md:w-4/5 h-4/5'>
                    <p className='text-lg  text-cyan-400'>HEALTHCARE</p>
                    <br/>
                    <p className="font-bold md:text-6xl text-3xl ">AI-Powered Precision in COVID-19 Diagnostics</p>
                    <br/>
                    <p className="text-2xl">Experience faster, more accurate COVID-19 detection with our cutting-edge AI
                        technology, transforming healthcare one X-ray at a time.</p>
                    <br/>
                    <Button pill size="lg" color="cyan" className="text-cyan-400" onClick={handleSignUp}>Be Our Patient Now</Button>
                </div>
            </div>

            <div className='hidden md:flex w-2/5 h-full'>
                    <img src={Staff} ></img>
            </div>
        </div>
    )
}

export default HealthCare