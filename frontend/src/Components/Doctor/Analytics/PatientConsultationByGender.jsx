import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function GenderDistributionChart({ token }) {
  const [genderCounts, setGenderCounts] = useState({
    Male: 0,
    Female: 0,
    Other: 0,
  });

  useEffect(() => {
    // Fetch the patient data from the API
    axios.get('/api/doctor/getPatientList', {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer token passed in the header
      },
    })
    .then(response => {
      const patients = response.data.patients; // Access the array of patients

      // Initialize counts for each gender
      const newGenderCounts = { Male: 0, Female: 0 };

      // Iterate over each patient and count by gender
      patients.forEach(patient => {
        if (patient.gender === "Male") newGenderCounts.Male++;
        else if (patient.gender === "Female") newGenderCounts.Female++;
      });

      // Set the gender counts in state
      setGenderCounts(newGenderCounts);
    })
    .catch(error => {
      console.error("Error fetching patient data:", error);
    });
  }, [token]);

  const series = Object.values(genderCounts); // Extract the counts for chart
  const labels = Object.keys(genderCounts);  // Extract the gender labels

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
      series={series}  // Set the data series for the pie chart
      type="pie"
      width="500"
    />
  );
}

export default GenderDistributionChart;
