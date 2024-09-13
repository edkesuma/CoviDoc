"use client";

import React, { useState } from "react";
import ConsultationNavbar from "../../Components/Doctor/Consultation/View/ConsultationNavbar.jsx";

import AgeDistributionChart from "../../Components/Doctor/Analytics/AgeDistributionOfPatients.jsx";
import ClassificationConfidenceChart from "../../Components/Doctor/Analytics/ClassificationConfidenceChart.jsx";
import ClassificationOverTime from "../../Components/Doctor/Analytics/ClassificationOverTime.jsx";
import PatientConsultationByGender from "../../Components/Doctor/Analytics/PatientConsultationByGender.jsx";
import SeverityIllnessChart from "../../Components/Doctor/Analytics/SeverityIllnessChart.jsx";
import SymptomPrevalenceHM from "../../Components/Doctor/Analytics/SymptomsPrevelanceHM.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button, Card } from "flowbite-react";

function VisualizationsPage() {
    const [selectedChart, setSelectedChart] = useState("Age Distribution");

    // Function to handle the chart selection from the drop-down
    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    return (
        <div className='flex flex-col items-center'>
            {/* Navbar Section */}
            <ConsultationNavbar />

            {/* Page Title */}
            <div className='ml-20 my-10 font-bold text-3xl'>{selectedChart}</div>

            {/* Drop-down to select chart */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Select Chart</label>
                <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={selectedChart}
                    onChange={handleChartChange}
                >
                    <option value="Age Distribution">Age Distribution</option>
                    <option value="Classification Confidence">Classfication Confidence</option>
                    <option value="Consultation over time">Consultation over time</option>
                    <option value="Patient Consultation by Gender">Patient Consultation by Gender</option>
                    <option value="Severity Illness">Severity Illness</option>
                    <option value="Symptom Prevalence Heatmap">Symptom Prevalence</option>

                    

                </select>
            </div>

            {/* Render the selected chart */}
            <Card className='mx-20'>
                {selectedChart === "Age Distribution" && <AgeDistributionChart />}
                {selectedChart === "Classification Confidence" && <ClassificationConfidenceChart />}
                {selectedChart === "Consultation over time" && <ClassificationOverTime />}
                {selectedChart === "Patient Consultation by Gender" && <PatientConsultationByGender />}
                {selectedChart === "Severity Illness" && <SeverityIllnessChart />}
                {selectedChart === "Symptom Prevalence Heatmap" && <SymptomPrevalenceHM />}



            </Card>
        </div>
    );
}

export default VisualizationsPage;
