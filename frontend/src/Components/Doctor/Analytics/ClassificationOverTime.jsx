import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function ConsultationsByDateChart() {
    const consultationsByDate = {};
  
    mockData.Consultation.forEach((consultation) => {
      const date = consultation.consultationDate;
      if (consultationsByDate[date]) {
        consultationsByDate[date]++;
      } else {
        consultationsByDate[date] = 1;
      }
    });
  
    const dates = Object.keys(consultationsByDate);
    const counts = Object.values(consultationsByDate);
  
    return (
      <ApexCharts
        options={{
          chart: {
            type: "line",
          },
          xaxis: {
            categories: dates,
          },
          title: {
            text: "Consultations Over Time",
          },
        }}
        series={[
          {
            name: "Number of Consultations",
            data: counts,
          },
        ]}
        type="line"
        width="500"
      />
    );
  }
  
  export default ConsultationsByDateChart;