"use client";
import {Button} from "flowbite-react";
import Staff from '../../../assets/staff.jpg'
import React from "react";

function HealthCare() {
    return (
        <div className="flex flex-row"
             style={{height: '500px'}}>
            <div className='flex justify-center items-center w-3/5 h-full'>
                <div className='w-4/5 h-4/5'>
                    <p className='text-xl text-cyan-400'>HEALTHCARE</p>
                    <br/>
                    <p className="font-bold text-6xl">AI-Powered Precision in COVID-19 Diagnostics</p>
                    <br/>
                    <p className="text-2xl">Experience faster, more accurate COVID-19 detection with our cutting-edge AI
                        technology, transforming healthcare one X-ray at a time.</p>
                    <br/>
                    <Button pill size="lg" color="cyan" className="text-cyan-400">Join Us Now</Button>
                </div>
            </div>
            <div className='flex w-2/5 h-full'>
                    <img src={Staff} ></img>
            </div>
        </div>
    )
}

export default HealthCare