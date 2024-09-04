"use client";
import PageNavbar from "../../Components/Landing/PageNavbar.jsx";
import Contact from "../../Components/Landing/Contact/Contact.jsx";
import PageFooter from "../../Components/Landing/PageFooter.jsx";

function ContactPage() {
    return (
        <div>
            <PageNavbar/>
            <div className='mb-5'/>
            <Contact/>
            <div className='mb-36'/>
            <PageFooter/>
        </div>
    );
}

export default ContactPage