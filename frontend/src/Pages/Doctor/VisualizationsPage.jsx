"use client";

import React, { useState } from "react";
import AgeDistributionChart from "../../Components/Doctor/Analytics/AgeDistributionOfPatients.jsx";
import ClassificationConfidenceChart from "../../Components/Doctor/Analytics/ClassificationConfidenceChart.jsx";
import ConsultationOverTime from "../../Components/Doctor/Analytics/ConsultationOverTime.jsx";
import PatientConsultationByGender from "../../Components/Doctor/Analytics/PatientConsultationByGender.jsx";
import SymptomPrevalenceHM from "../../Components/Doctor/Analytics/SymptomsPrevelanceHM.jsx";
import { Card } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";

const token = localStorage.getItem("token");

function VisualizationsPage() {
    const [selectedChart, setSelectedChart] = useState("Age Distribution");

    // Function to handle the chart selection from the drop-down
    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    return (
        <div>
            {/* Navbar Section */}
            <ActorNavbar />
            <div className='flex flex-col items-center'>
                {/* Page Title */}
                <div className='my-10 font-bold text-3xl'>{selectedChart}</div>

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
                        <option value="Symptom Prevalence Heatmap">Symptom Prevalence</option>
                    </select>
                </div>

                {/* Render the selected chart */}
                <Card className='mx-20'>
                    {selectedChart === "Age Distribution" && <AgeDistributionChart token={token} />}
                    {selectedChart === "Classification Confidence" && <ClassificationConfidenceChart token={token} />}
                    {selectedChart === "Consultation over time" && <ConsultationOverTime token={token} />}
                    {selectedChart === "Patient Consultation by Gender" && <PatientConsultationByGender token={token} />}
                    {selectedChart === "Symptom Prevalence Heatmap" && <SymptomPrevalenceHM token={token} />}
                </Card>
            </div>
        </div>
        
    );
}

export default VisualizationsPage;
