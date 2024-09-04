"use client";
import PageNavbar from "../../Components/Landing/PageNavbar.jsx";
import HealthCare from "../../Components/Landing/Home/HealthCare.jsx";
import Features from "../../Components/Landing/Home/Features.jsx";
import OverView from "../../Components/Landing/Home/OverView.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";

function HomePage() {
    return (
        <div>
            <PageNavbar/>
            <div className='mb-5'/>
            <HealthCare/>
            <div className='mb-5'/>
            <Features/>
            <div className='mb-16'/>
            <OverView/>
            <div className='mb-10'/>
            <PageFooter/>
        </div>
    );
}

export default HomePage
