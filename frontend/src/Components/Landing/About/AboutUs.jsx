"use client";
import About from '../../../assets/about.jpg'
import React from "react";

function AboutUs() {
    return (
        <div className="flex flex-row"
             style={{height: '500px'}}>
            <div className='flex justify-center items-center w-3/5 h-full'>
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
            <div className='flex w-2/5 h-full'>
                <img src={About}></img>
            </div>
        </div>
    );
}

export default AboutUs
