"use client";
import ConsultationNavbar from "../../Components/Doctor/Consultation/View/ConsultationNavbar.jsx";
import ViewPDF from "../../Components/Doctor/Consultation/View/ViewPDF.jsx";

function ViewPDFPage() {
    return (
        <div>
            <ConsultationNavbar/>
            <div className='mb-10'/>
            <ViewPDF/>
        </div>
    )
}

export default ViewPDFPage;