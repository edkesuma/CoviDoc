import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function AgeDistributionChart({ token }) {
  const [ageGroups, setAgeGroups] = useState({
    "0-18": 0,
    "19-35": 0,
    "36-50": 0,
    "51-65": 0,
    "66-80": 0,
    "81-100": 0,
  });

  useEffect(() => {
    axios.get('/api/doctor/getPatientList', {
      headers: {
        Authorization: `Bearer ${token}`, // Use token from props
      },
    })
    .then(response => {
      const patients = response.data.patients; // Log the response to inspect its structure
      if (Array.isArray(patients)) {
        const newAgeGroups = {
          "0-18": 0,
          "19-35": 0,
          "36-50": 0,
          "51-65": 0,
          "66-80": 0,
          "81-100": 0,
        };

        patients.forEach(patient => {
          const age = patient.age;
          if (age <= 18) newAgeGroups["0-18"]++;
          else if (age <= 35) newAgeGroups["19-35"]++;
          else if (age <= 50) newAgeGroups["36-50"]++;
          else if (age <= 65) newAgeGroups["51-65"]++;
          else if (age <= 80) newAgeGroups["66-80"]++;
          else newAgeGroups["81-100"]++;
        });

        setAgeGroups(newAgeGroups);
      } else {
        console.error("Expected an array of patients");
      }
    })
    .catch(error => {
      console.error("Error fetching patient data:", error);
    });
  }, [token]); // Watch for token changes

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
