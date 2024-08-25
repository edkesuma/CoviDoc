"use client";
import HomeNavber from "../../Components/Landing/Home/HomeNavber.jsx";
import HealthCare from "../../Components/Landing/Home/HealthCare.jsx";
import Features from "../../Components/Landing/Home/Features.jsx";
import OverView from "../../Components/Landing/Home/OverView.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";

function HomePage() {
    return (
        <div>
            <HomeNavber/>
            <br/>
            <HealthCare/>
            <br/>
            <Features/>
            <br/>
            <br/>
            <br/>
            <OverView/>
            <br/>
            <br/>
            <PageFooter/>
        </div>
    );
}

export default HomePage
