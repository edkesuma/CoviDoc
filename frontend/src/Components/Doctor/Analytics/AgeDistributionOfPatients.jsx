import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function AgeDistributionChart() {
    const patientAges = mockData.patients.map((patient) => {
      const birthYear = new Date(patient.dob).getFullYear();
      return new Date().getFullYear() - birthYear;
    });
  
    const ageGroups = {
      "0-18": 0,
      "19-35": 0,
      "36-50": 0,
      "51-65": 0,
      "66-80": 0,
      "80+": 0,
    };
  
    patientAges.forEach((age) => {
      if (age <= 18) ageGroups["0-18"]++;
      else if (age <= 35) ageGroups["19-35"]++;
      else if (age <= 50) ageGroups["36-50"]++;
      else if (age <= 65) ageGroups["51-65"]++;
      else if (age <= 80) ageGroups["66-80"]++;
      else ageGroups["80+"]++;
    });
  
    const series = Object.values(ageGroups);
    const categories = Object.keys(ageGroups);
  
    return (
      <ApexCharts
        options={{
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: categories,
          },
          title: {
            text: "Age Distribution of Patients",
          },
        }}
        series={[
          {
            name: "Number of Patients",
            data: series,
          },
        ]}
        type="bar"
        width="700"
      />
    );
  }
  
  export default AgeDistributionChart;
