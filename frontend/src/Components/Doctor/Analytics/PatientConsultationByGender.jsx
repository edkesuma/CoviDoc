import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function GenderDistributionChart({ token }) {
  const [genderCounts, setGenderCounts] = useState({
    Male: 0,
    Female: 0,
  });

  useEffect(() => {
    // Fetch the gender distribution data from the backend API
    axios.get('/api/doctor/getGenderDistribution', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the header
      },
    })
    .then(response => {
      // Set the gender counts from the backend response
      setGenderCounts(response.data.genderCounts);
    })
    .catch(error => {
      console.error("Error fetching gender distribution data:", error);
    });
  }, [token]);

  const series = Object.values(genderCounts); // Extract the counts for the chart
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

