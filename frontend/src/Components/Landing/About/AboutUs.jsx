"use client";
import About from '../../../assets/about.jpg'
import React from "react";

function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className='flex justify-center items-center md:w-3/5 w-full h-full'>
                <div className='w-4/5 h-4/5'>
                    <p className='text-xl text-cyan-400'>ABOUT US</p>
                    <br/>
                    <p className="font-bold text-6xl">CoviDoc</p>
                    <br/>
                    <p className="text-2xl">We are dedicated to revolutionizing healthcare with our cutting-edge
                        AI-powered COVID-19 diagnostic platform. </p>
                    <br/>
                    <p className="text-2xl">Our mission is to provide fast, accurate, and reliable diagnostics, helping
                        healthcare providers and patients navigate the challenges of the pandemic with confidence and
                        ease.</p>
                    <br/>
                    <p className="text-2xl">By leveraging advanced AI algorithms, we aim to enhance diagnostic precision
                        and streamline medical processes, ultimately saving lives and improving the quality of
                        care. </p>
                </div>
            </div>
            <div className='hidden md:flex justify-center my-8'>
                <div className='flex md:w-full h-full w-2/5 justify-center'>
                    <img src={About}></img>
                </div>
            </div>
        </div>
    );
}

export default AboutUs
