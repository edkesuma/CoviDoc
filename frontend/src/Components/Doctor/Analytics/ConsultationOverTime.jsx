import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ConsultationsByDateChart({ token }) {
  const [consultationsByDate, setConsultationsByDate] = useState({}); // To store the number of consultations per date

  useEffect(() => {
    const fetchConsultationsByDate = async () => {
      try {
        // Fetch precomputed consultations by date from the backend
        const response = await axios.get("/api/doctor/getConsultationsByDate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response to inspect the data structure
        console.log("Consultations By Date:", response.data.consultationsByDate);

        // Update state with the consultation counts by date
        setConsultationsByDate(response.data.consultationsByDate);
      } catch (error) {
        console.error("Error fetching consultations by date:", error);
      }
    };

    fetchConsultationsByDate();
  }, [token]);

  // Function to convert a "dd-mm-yyyy" date string to a JavaScript Date object
  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
  };

  // Extracting the dates and counts
  const dates = Object.keys(consultationsByDate);
  const counts = Object.values(consultationsByDate);

  // Sort the dates in ascending order using convertToDate for correct date comparison
  const sortedDates = dates.sort((a, b) => convertToDate(a) - convertToDate(b));

  // Reorder the counts array to match the sorted dates
  const sortedCounts = sortedDates.map((date) => consultationsByDate[date]);

  // Log sorted dates and counts to inspect
  console.log("Sorted Dates:", sortedDates);
  console.log("Sorted Counts:", sortedCounts);

  return (
    <ApexCharts
      options={{
        chart: {
          type: "line",
        },
        xaxis: {
          categories: sortedDates, // X-axis will be the sorted consultation dates
        },
        title: {
          text: "Consultations Over Time",
        },
      }}
      series={[
        {
          name: "Number of Consultations",
          data: sortedCounts, // The data points (number of consultations per date)
        },
      ]}
      type="line"
      width="700"
    />
  );
}

export default ConsultationsByDateChart;
