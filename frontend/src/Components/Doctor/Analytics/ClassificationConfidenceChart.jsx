// import React from "react";
// import ApexCharts from "react-apexcharts";
// import { mockData } from "./Dataset/dataset";

// function ClassificationConfidenceChart() {
//     const classifications = {
//       "COVID-19": 0,
//       "Healthy": 0,
//       "Other Lung Infections": 0,
//     };
  
//     mockData.reports.forEach((report) => {
//       if (report.classification === "COVID-19") classifications["COVID-19"]++;
//       else if (report.classification === "Healthy") classifications["Healthy"]++;
//       else classifications["Other Lung Infections"]++;
//     });
  
//     const series = Object.values(classifications);
//     const categories = Object.keys(classifications);
  
//     return (
//       <ApexCharts
//         options={{
//           chart: {
//             type: "pie",
//           },
//           labels: categories,
//           title: {
//             text: "Patient Classifications",
//           },
//         }}
//         series={series}
//         type="pie"
//         width="500"
//       />
//     );
//   }
  
//   export default ClassificationConfidenceChart;


import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ConsultationsStatusChart({ token }) {
  const [consultationStatuses, setConsultationStatuses] = useState({}); // To store status counts

  useEffect(() => {
    const fetchConsultationStatuses = async () => {
      try {
        // Step 1: Fetch all patients to get their IDs
        const response = await axios.get('/api/doctor/getPatientList', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const patientsArray = response.data.patients; // Patients is an array
        console.log("Patients:", patientsArray);
        const statusCounts = {}; // Object to hold consultation status counts

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
            // i want to see the data of consultationResponse
            console.log("Consultation Response: ");
            console.log(consultationResponse.data);

            const consultations = consultationResponse.data.consultationHistory;
            console.log(`Consultations for patient ${patientId}:`);

            // Step 3: Count the statuses
            consultations.forEach((consultation) => {
              const status = consultation.status;
              if (statusCounts[status]) {
                statusCounts[status]++;
              } else {
                statusCounts[status] = 1;
              }
            });

          } catch (error) {
            console.error(`Error fetching consultation history for patient ${patientId}:`, error);
          }
        }

        setConsultationStatuses(statusCounts); // Update state with status counts
      } catch (error) {
        console.error("Error fetching patient list:", error);
      }
    };

    fetchConsultationStatuses();
  }, [token]);

  const series = Object.values(consultationStatuses); // Extracting the counts of statuses
  const categories = Object.keys(consultationStatuses); // Extracting the status names

  return (
    <ApexCharts
      options={{
        chart: {
          type: "pie",
        },
        labels: categories,
        title: {
          text: "Consultation Statuses",
        },
      }}
      series={series}
      type="pie"
      width="500"
    />
  );
}

export default ConsultationsStatusChart;
