"use client";
import About from '../../../assets/about.jpg'
import React from "react";

function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row mx-20">
            <div className='flex md:w-3/5 w-full h-full'>
                <div className='w-4/5 h-4/5'>
                    <p className='text-lg text-cyan-400'>ABOUT US</p>
                    <br/>
                    <p className="font-bold text-5xl">CoviDoc</p>
                    <br/>
                    <p className="text-xl">We are dedicated to revolutionizing healthcare with our cutting-edge
                        AI-powered COVID-19 diagnostic platform. </p>
                    <br/>
                    <p className="text-xl">Our mission is to provide fast, accurate, and reliable diagnostics, helping
                        healthcare providers and patients navigate the challenges of the pandemic with confidence and
                        ease.</p>
                    <br/>
                    <p className="text-xl">By leveraging advanced AI algorithms, we aim to enhance diagnostic precision
                        and streamline medical processes, ultimately saving lives and improving the quality of
                        care. </p>
                </div>
            </div>
            
            <div className='hidden md:flex w-2/5 h-full pt-5'>
                <img src={About}></img>
            </div>
        </div>
    );
}

export default AboutUs
