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
            <div className='p-5'/>
            <HealthCare/>
            <div className='p-10'/>
            <Features/>
            <div className='p-10'/>
            <OverView/>
            <div className='p-10'/>
            <PageFooter/>
        </div>
    );
}

export default HomePage
