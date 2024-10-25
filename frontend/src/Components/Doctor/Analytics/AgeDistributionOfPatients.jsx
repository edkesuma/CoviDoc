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
    // Fetch preprocessed age distribution from the backend
    axios.get('/api/doctor/getAgeDistribution', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const ageGroups = response.data.ageGroups;
      setAgeGroups(ageGroups);
    })
    .catch(error => {
      console.error("Error fetching age distribution data:", error);
    });
  }, [token]);

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

