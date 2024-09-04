"use client";
import PageNavbar from "../../Components/Landing/PageNavbar.jsx";
import AboutUs from "../../Components/Landing/About/AboutUs.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";

function AboutPage() {
    return (
        <div>
            <PageNavbar/>
            <div className='mb-5'/>
            <AboutUs/>
            <div className='mb-36'/>
            <PageFooter/>
        </div>
    );
}

export default AboutPage
