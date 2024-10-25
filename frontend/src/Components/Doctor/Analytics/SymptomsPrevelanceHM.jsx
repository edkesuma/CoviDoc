import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function SymptomPrevalenceHeatmap({ token }) {
  const [patients, setPatients] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  const [symptomCategories, setSymptomCategories] = useState([]);

  useEffect(() => {
    const fetchSymptomPrevalence = async () => {
      try {
        // Step 1: Fetch the processed symptom prevalence data from the backend
        const response = await axios.get("/api/doctor/getSymptomPrevalence", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { patients, symptomCategories, symptomData } = response.data;

        // Step 2: Store the fetched data in state variables
        setPatients(patients);
        setSymptomCategories(symptomCategories);
        setSymptomData(symptomData);
      } catch (error) {
        console.error("Error fetching symptom prevalence data:", error);
      }
    };

    fetchSymptomPrevalence();
  }, [token]);

  // Prepare series data for ApexCharts
  const series = symptomCategories.map((symptom, index) => ({
    name: symptom,
    data: symptomData.map((row) => row[index]),
  }));

  return (
    <div style={{ overflow: "auto", width: "100%", maxHeight: "600px" }}>
      <ApexCharts
        options={{
          chart: {
            type: "heatmap",
          },
          plotOptions: {
            heatmap: {
              colorScale: {
                ranges: [
                  { from: 0, to: 0, color: "#e0e0e0", name: "No" },
                  { from: 1, to: 1, color: "#f44336", name: "Yes" },
                ],
              },
              shadeIntensity: 0.5,
              radius: 0,
              useFillColorAsStroke: true,
              distributed: false,
              opacity: 1,
            },
          },
          title: {
            text: "Symptom Prevalence Heatmap",
          },
          xaxis: {
            categories: patients.map((patient) => patient.name),
            title: {
              text: "Patients",
            },
          },
          yaxis: {
            title: {
              text: "Symptoms",
            },
          },
          tooltip: {
            y: {
              formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                return val === 1 ? "Yes" : "No";
              },
            },
          },
        }}
        series={series}
        type="heatmap"
        height={1200}  // Increased height for vertical scroll
        width={patients.length * 55}   // Increased width for horizontal scroll
      />
    </div>
  );
}

export default SymptomPrevalenceHeatmap;