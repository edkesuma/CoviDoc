import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function SymptomPrevalenceHeatmap({ token }) {
  const [patients, setPatients] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  const [symptomCategories, setSymptomCategories] = useState([]);
  const [chartDimensions, setChartDimensions] = useState({ width: 400, height: 500 });

  useEffect(() => {
    const fetchSymptomPrevalence = async () => {
      try {
        const response = await axios.get("/api/doctor/getSymptomPrevalence", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { patients, symptomCategories, symptomData } = response.data;

        setPatients(patients);
        setSymptomCategories(symptomCategories);
        setSymptomData(symptomData);
      } catch (error) {
        console.error("Error fetching symptom prevalence data:", error);
      }
    };

    fetchSymptomPrevalence();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.max(window.innerWidth * 0.8, 400);
      const newHeight = Math.max(window.innerHeight * 0.6, 500);
      setChartDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const series = symptomCategories.map((symptom, index) => ({
    name: symptom,
    data: symptomData.map((row) => row[index]),
  }));

  return (
    <div style={{ overflow: "auto", width: "100%", maxHeight: "600px" }}>
      <ApexCharts
        options={{
          chart: {
            type: "heatmap",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            heatmap: {
              colorScale: {
                ranges: [
                  { from: 0, to: 0, color: "#e0e0e0", name: "No" },
                  { from: 1, to: 1, color: "#f44336", name: "Yes" },
                ],
              },
              shadeIntensity: 0.5,
              radius: 2,
              padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
              },
            },
          },
          grid: {
            padding: {
              top: 10,
              bottom: 10,
              left: 20,
              right: 20,
            },
          },
          title: {
            text: "Symptom Prevalence Heatmap",
            align: "center",
          },
          xaxis: {
            categories: patients.map((patient) => patient.name),
            title: {
              text: "Patients",
            },
            labels: {
              rotate: -45,
              style: {
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            title: {
              text: "Symptoms",
            },
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          tooltip: {
            y: {
              formatter: (val) => (val === 1 ? "Yes" : "No"),
            },
          },
          responsive: [
            {
              breakpoint: 768,
              options: {
                xaxis: {
                  labels: {
                    rotate: -30,
                    style: {
                      fontSize: "10px",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      fontSize: "10px",
                    },
                  },
                },
              },
            },
          ],
        }}
        series={series}
        type="heatmap"
        height={chartDimensions.height}
        width={chartDimensions.width}
      />
    </div>
  );
}

export default SymptomPrevalenceHeatmap;
