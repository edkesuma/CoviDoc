import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ConsultationsByDateChart({ token }) {
  const [consultationsByDate, setConsultationsByDate] = useState({}); // To store the number of consultations per date
  const [chartWidth, setChartWidth] = useState(window.innerWidth > 768 ? 700 : 400);

  useEffect(() => {
    const fetchConsultationsByDate = async () => {
      try {
        // Fetch precomputed consultations by date from the backend
        const response = await axios.get("/api/doctor/getConsultationsByDate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state with the consultation counts by date
        setConsultationsByDate(response.data.consultationsByDate);
      } catch (error) {
        console.error("Error fetching consultations by date:", error);
      }
    };

    fetchConsultationsByDate();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth > 768 ? 700 : 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to convert a "dd-mm-yyyy" date string to a JavaScript Date object
  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // JavaScript months are 0-indexed
  };

  // Extracting the dates and counts
  const dates = Object.keys(consultationsByDate);

  // Sort the dates in ascending order using convertToDate for correct date comparison
  const sortedDates = dates.sort((a, b) => convertToDate(a) - convertToDate(b));

  // Reorder the counts array to match the sorted dates
  const sortedCounts = sortedDates.map((date) => consultationsByDate[date]);

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
      width={chartWidth}
    />
  );
}

export default ConsultationsByDateChart;
