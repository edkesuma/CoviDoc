import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function ClassificationConfidenceChart() {
    const classifications = {
      "COVID-19": 0,
      "Healthy": 0,
      "Other Lung Infections": 0,
    };
  
    mockData.reports.forEach((report) => {
      if (report.classification === "COVID-19") classifications["COVID-19"]++;
      else if (report.classification === "Healthy") classifications["Healthy"]++;
      else classifications["Other Lung Infections"]++;
    });
  
    const series = Object.values(classifications);
    const categories = Object.keys(classifications);
  
    return (
      <ApexCharts
        options={{
          chart: {
            type: "pie",
          },
          labels: categories,
          title: {
            text: "Patient Classifications",
          },
        }}
        series={series}
        type="pie"
        width="500"
      />
    );
  }
  
  export default ClassificationConfidenceChart;