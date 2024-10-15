import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ConsultationsByDateChart({ token }) {
  const [consultationsByDate, setConsultationsByDate] = useState({}); // To store the number of consultations per date

  useEffect(() => {
    const fetchConsultationsByDate = async () => {
      try {
        // Step 1: Fetch all patients to get their IDs
        const response = await axios.get('/api/doctor/getPatientList', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const patientsArray = response.data.patients; // Patients is an array
        console.log("Patients:", patientsArray);
        const consultationDateCounts = {}; // Object to hold consultation counts per date

        // Step 2: Loop through each patient and fetch their consultation history
        for (const patient of patientsArray) {
          const patientId = patient.patientId;
          console.log(`Fetching consultation history for patient ${patientId}`);

          try {
            // Fetch consultation history for each patientId
            const consultationResponse = await axios.get(
              `/api/doctor/getPatientConsultationHistory`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: { patientId }, // Send patientId as a parameter
              }
            );

            const consultations = consultationResponse.data.consultationHistory;
            console.log(`Consultations for patient ${patientId}:`, consultations);

            // Step 3: Count the number of consultations by date
            consultations.forEach((consultation) => {
              const date = consultation.consultationDate;
              if (consultationDateCounts[date]) {
                consultationDateCounts[date]++;
              } else {
                consultationDateCounts[date] = 1;
              }
            });

          } catch (error) {
            console.error(`Error fetching consultation history for patient ${patientId}:`, error);
          }
        }

        setConsultationsByDate(consultationDateCounts); // Update state with consultation counts by date
      } catch (error) {
        console.error("Error fetching patient list:", error);
      }
    };

    fetchConsultationsByDate();
  }, [token]);

  const dates = Object.keys(consultationsByDate); // Extracting the dates
  const counts = Object.values(consultationsByDate); // Extracting the consultation counts

  return (
    <ApexCharts
      options={{
        chart: {
          type: "line",
        },
        xaxis: {
          categories: dates, // X-axis will be the consultation dates
        },
        title: {
          text: "Consultations Over Time",
        },
      }}
      series={[
        {
          name: "Number of Consultations",
          data: counts, // The data points (number of consultations per date)
        },
      ]}
      type="line"
      width="700"
    />
  );
}

export default ConsultationsByDateChart;

