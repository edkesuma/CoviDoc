import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function GenderDistributionChart() {
  const maleCount = mockData.patients.filter((patient) => patient.gender === "Male").length;
  const femaleCount = mockData.patients.filter((patient) => patient.gender === "Female").length;
  const otherCount = mockData.patients.filter((patient) => patient.gender === "Other").length;

  const series = [maleCount, femaleCount, otherCount];
  const labels = ["Male", "Female", "Other"];

  return (
    <ApexCharts
      options={{
        chart: {
          type: "pie",
        },
        labels: labels,
        title: {
          text: "Gender Distribution of Patients",
        },
      }}
      series={series}
      type="pie"
      width="500"
    />
  );
}

export default GenderDistributionChart;
