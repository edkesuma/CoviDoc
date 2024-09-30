"use client";
import OverView1 from '../../../assets/overview/overview1.jpg'
import OverView2 from '../../../assets/overview/overview2.jpg'
import OverView3 from '../../../assets/overview/overview3.jpg'
import React from "react";

function OverView() {
    return (
        <div className='flex justify-center'>
            <div className='w-11/12 h-full'>
                    <p className='text-xl text-cyan-400 ml-4'>OVERVIEW</p>
                    <br/>
                    <p className="font-bold text-6xl ml-4">COVID-19 at a Glance</p>
                    <br/>
                    <br/>
                <div className='flex md:flex-row flex-col justify-center items-center'>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView1}/>
                        <br/>
                        <p className='text-4xl'>231</p>
                        <p className='text-xl'>Affected Countries</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView2}/>
                        <br/>
                        <p className='text-4xl'>3959</p>
                        <p className='text-xl'>Cases Today</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView3}/>
                        <br/>
                        <p className='text-4xl'>57</p>
                        <p className='text-xl'>Deaths Today</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverView