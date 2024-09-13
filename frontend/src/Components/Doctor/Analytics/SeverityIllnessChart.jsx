import React from "react";
import ApexCharts from "react-apexcharts";
import { mockData } from "./Dataset/dataset";

function SeverityOfIllnessChart() {
  const mildCount = mockData.reports.filter((report) => report.severity === "Mild").length;
  const moderateCount = mockData.reports.filter((report) => report.severity === "Moderate").length;
  const severeCount = mockData.reports.filter((report) => report.severity === "Severe").length;

  const series = [mildCount, moderateCount, severeCount];
  const labels = ["Mild", "Moderate", "Severe"];

  return (
    <ApexCharts
      options={{
        chart: {
          type: "donut",
        },
        labels: labels,
        title: {
          text: "Severity of Illness Distribution",
        },
      }}
      series={series}
      type="donut"
      width="500"
    />
  );
}

export default SeverityOfIllnessChart;
