// import React, { useEffect, useState } from "react";
// import ApexCharts from "react-apexcharts";
// import axios from "axios";

// function ConsultationsStatusChart({ token }) {
//   const [consultationStatuses, setConsultationStatuses] = useState({}); // To store status counts

//   useEffect(() => {
//     const fetchConsultationStatuses = async () => {
//       try {
//         // Step 1: Fetch all patients to get their IDs
//         const response = await axios.get('/api/doctor/getPatientList', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const patientsArray = response.data.patients; // Patients is an array
//         console.log("Patients:", patientsArray);
//         const statusCounts = {}; // Object to hold consultation status counts

//         // Step 2: Loop through each patient and fetch their consultation history
//         for (const patient of patientsArray) {
//           const patientId = patient.patientId;
//           console.log(`Fetching consultation history for patient ${patientId}`);
          
//           try {
//             // Fetch consultation history for each patientId
//             const consultationResponse = await axios.get(
//               `/api/doctor/getPatientConsultationHistory`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//                 params: { patientId }, // Send patientId as a parameter
//               }
//             );
//             // i want to see the data of consultationResponse
//             console.log("Consultation Response: ");
//             console.log(consultationResponse.data);

//             const consultations = consultationResponse.data.consultationHistory;
//             console.log(`Consultations for patient ${patientId}:`);

//             // Step 3: Count the statuses
//             consultations.forEach((consultation) => {
//               const status = consultation.status;
//               if (statusCounts[status]) {
//                 statusCounts[status]++;
//               } else {
//                 statusCounts[status] = 1;
//               }
//             });

//           } catch (error) {
//             console.error(`Error fetching consultation history for patient ${patientId}:`, error);
//           }
//         }

//         setConsultationStatuses(statusCounts); // Update state with status counts
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       }
//     };

//     fetchConsultationStatuses();
//   }, [token]);

//   const series = Object.values(consultationStatuses); // Extracting the counts of statuses
//   const categories = Object.keys(consultationStatuses); // Extracting the status names

//   return (
//     <ApexCharts
//       options={{
//         chart: {
//           type: "pie",
//         },
//         labels: categories,
//         title: {
//           text: "Consultation Statuses",
//         },
//       }}
//       series={series}
//       type="pie"
//       width="500"
//     />
//   );
// }

// export default ConsultationsStatusChart;





import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ClassificationConfidenceChart({ token }) {
  const [confidenceCounts, setConfidenceCounts] = useState({});

  useEffect(() => {
    const fetchConfidenceCounts = async () => {
      try {
        // Fetch precomputed classification confidence counts from the backend
        const response = await axios.get("/api/doctor/getClassificationConfidenceCounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response to inspect the data structure
        console.log("Classification Confidence Counts:", response.data.confidenceCounts);

        // Update state with the confidence counts
        setConfidenceCounts(response.data.confidenceCounts);
      } catch (error) {
        console.error("Error fetching classification confidence counts:", error);
      }
    };

    fetchConfidenceCounts();
  }, [token]);

  const series = Object.values(confidenceCounts); // Extracting the counts of classification confidences
  const categories = Object.keys(confidenceCounts); // Extracting the confidence levels

  return (
    <ApexCharts
      options={{
        chart: {
          type: "pie",
        },
        labels: categories,
        title: {
          text: "Classification Confidence Levels",
        },
      }}
      series={series}
      type="pie"
      width="500"
    />
  );
}

export default ClassificationConfidenceChart;


