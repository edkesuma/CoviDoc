"use client";
import OverView1 from '../../../assets/overview/overview1.jpg';
import OverView2 from '../../../assets/overview/overview2.jpg';
import OverView3 from '../../../assets/overview/overview3.jpg';
import React, { useEffect, useState } from "react";
import axios from "axios";

function OverView() {
    const [countries, setCountries] = useState(null);
    const [today, setToday] = useState(null);
    const [death, setDeath] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://disease.sh/v3/covid-19/all");
                setToday(response.data.cases);
                setCountries(response.data.affectedCountries);
                setDeath(response.data.deaths);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='flex justify-center mx-20'>
            <div className='w-full h-full'>
                <p className='text-lg text-cyan-400 ml-4'>OVERVIEW</p>
                <br />
                <p className="font-bold text-5xl ml-4">COVID-19 at a Glance</p>
                <br />
                <br />
                <div className='flex md:flex-row flex-col justify-center items-center'>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView1} alt="Overview 1" />
                        <br />
                        <p className='text-4xl'>{countries}</p>
                        <p className='text-xl'>Affected Countries</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView2} alt="Overview 2" />
                        <br />
                        <p className='text-4xl'>{today}</p>
                        <p className='text-xl'>Cases Total</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView3} alt="Overview 3" />
                        <br />
                        <p className='text-4xl'>{death}</p>
                        <p className='text-xl'>Deaths Total</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverView;
