import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function SymptomPrevalenceHeatmap() {
  const symptoms = ["Cough", "Fever", "Shortness of Breath", "Fatigue", "Loss of Taste/Smell"];
  const patients = mockData.patients;

  // Generate random symptom presence data for demonstration purposes
  const generateSymptomData = () => {
    return symptoms.map((symptom) => ({
      name: symptom,
      data: patients.map(() => Math.floor(Math.random() * 2)), // 0 or 1 for symptom presence
    }));
  };

  return (
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
          },
        },
        title: {
          text: "Symptom Prevalence Heatmap",
        },
        xaxis: {
          categories: patients.map((patient) => patient.name),
        },
      }}
      series={generateSymptomData()}
      type="heatmap"
      width="700"
    />
  );
}

export default SymptomPrevalenceHeatmap;
