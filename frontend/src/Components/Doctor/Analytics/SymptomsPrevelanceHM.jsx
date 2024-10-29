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
        const response = await axios.get("/api/doctor/getSymptomPrevalence", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { patients, symptomCategories, symptomData } = response.data;

        setPatients(patients);
        setSymptomCategories(symptomCategories);
        setSymptomData(symptomData);
      } catch (error) {
        console.error("Error fetching symptom prevalence data:", error);
      }
    };

    fetchSymptomPrevalence();
  }, [token]);

  const series = symptomCategories.map((symptom, index) => ({
    name: symptom,
    data: symptomData.map((row) => row[index]),
  }));

  const chartWidth = Math.max(patients.length * 70, 400); // Adjusted width for spacing
  const chartHeight = Math.max(symptomCategories.length * 30, 500); // Adjusted height for spacing

  return (
    <div style={{ overflow: "auto", width: "100%", maxHeight: "600px" }}>
      <ApexCharts
        options={{
          chart: {
            type: "heatmap",
            toolbar: {
              show: false,
            },
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
              radius: 2, // Rounded corners for cells
              padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
              },
            },
          },
          grid: {
            padding: {
              top: 10,
              bottom: 10,
              left: 20,
              right: 20,
            },
          },
          title: {
            text: "Symptom Prevalence Heatmap",
            align: 'center',
          },
          xaxis: {
            categories: patients.map((patient) => patient.name),
            title: {
              text: "Patients",
            },
            labels: {
              rotate: -45, // Rotate labels for better spacing
              style: {
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            title: {
              text: "Symptoms",
            },
            labels: {
              style: {
                fontSize: '12px',
              },
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
        height={chartHeight}
        width={chartWidth}
      />
    </div>
  );
}

export default SymptomPrevalenceHeatmap;
