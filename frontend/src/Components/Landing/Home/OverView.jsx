"use client";
import OverView1 from '../../../assets/overview/overview1.jpg';
import OverView2 from '../../../assets/overview/overview2.jpg';
import OverView3 from '../../../assets/overview/overview3.jpg';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function OverView() {
    const [countries, setCountries] = useState(null);
    const [today, setToday] = useState(null);
    const [death, setDeath] = useState(null);

    const [displayCountries, setDisplayCountries] = useState(0);
    const [displayToday, setDisplayToday] = useState(0);
    const [displayDeath, setDisplayDeath] = useState(0);
    const [startCounting, setStartCounting] = useState(false);

    const overviewRef = useRef(null);

    // Fetch data on component mount
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

    // Observer for triggering animation when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCounting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (overviewRef.current) observer.observe(overviewRef.current);
        return () => observer.disconnect();
    }, []);

    // Counter animation function with slower easing
    const animateCounter = (targetValue, setDisplay) => {
        let current = targetValue / 2;
        const duration = 4000; // Longer duration for slower animation
        const startTime = Date.now();

        const step = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const easedProgress = progress < 0.8
                ? Math.pow(progress, 3)  // Slow easing effect for 80% of the time
                : 1 - Math.pow(1 - progress, 3); // Slowing down towards end

            const value = targetValue / 2 + easedProgress * (targetValue / 2);
            setDisplay(Math.round(value));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setDisplay(targetValue); // Ensure it reaches exact final value
            }
        };

        requestAnimationFrame(step);
    };

    // Trigger the counters once data is available and component is in view
    useEffect(() => {
        if (startCounting && countries !== null) animateCounter(countries, setDisplayCountries);
        if (startCounting && today !== null) animateCounter(today, setDisplayToday);
        if (startCounting && death !== null) animateCounter(death, setDisplayDeath);
    }, [startCounting, countries, today, death]);

    return (
        <div ref={overviewRef} className='flex justify-center mx-5 md:mx-20 text-center md:text-left'>
            <div className='w-full h-full'>
                <p className='text-lg text-cyan-400'>OVERVIEW</p>
                <br />
                <p className="font-bold text-3xl md:text-5xl">COVID-19 at a Glance</p>
                <br />
                <br />
                <div className='flex md:flex-row flex-col justify-center items-center'>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView1} alt="Overview 1" />
                        <br />
                        <p className='text-4xl'>{displayCountries}</p>
                        <p className='text-xl'>Affected Countries</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView2} alt="Overview 2" />
                        <br />
                        <p className='text-4xl'>{displayToday}</p>
                        <p className='text-xl'>Cases Total</p>
                    </div>
                    <div className='flex flex-col items-center my-4 w-full md:w-1/3 h-full'>
                        <img src={OverView3} alt="Overview 3" />
                        <br />
                        <p className='text-4xl'>{displayDeath}</p>
                        <p className='text-xl'>Deaths Total</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverView;