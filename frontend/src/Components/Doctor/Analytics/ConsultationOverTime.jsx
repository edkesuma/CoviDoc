// import React, { useEffect, useState } from "react";
// import ApexCharts from "react-apexcharts";
// import axios from "axios";

// function ConsultationsByDateChart({ token }) {
//   const [consultationsByDate, setConsultationsByDate] = useState({}); // To store the number of consultations per date

//   useEffect(() => {
//     const fetchConsultationsByDate = async () => {
//       try {
//         // Step 1: Fetch all patients to get their IDs
//         const response = await axios.get('/api/doctor/getPatientList', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const patientsArray = response.data.patients; // Patients is an array
//         console.log("Patients:", patientsArray);
//         const consultationDateCounts = {}; // Object to hold consultation counts per date

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

//             const consultations = consultationResponse.data.consultationHistory;
//             console.log(`Consultations for patient ${patientId}:`, consultations);

//             // Step 3: Count the number of consultations by date
//             consultations.forEach((consultation) => {
//               const date = consultation.consultationDate;
//               if (consultationDateCounts[date]) {
//                 consultationDateCounts[date]++;
//               } else {
//                 consultationDateCounts[date] = 1;
//               }
//             });

//           } catch (error) {
//             console.error(`Error fetching consultation history for patient ${patientId}:`, error);
//           }
//         }

//         setConsultationsByDate(consultationDateCounts); // Update state with consultation counts by date
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       }
//     };

//     fetchConsultationsByDate();
//   }, [token]);

//   // Extracting the dates and counts
//   const dates = Object.keys(consultationsByDate);
//   const counts = Object.values(consultationsByDate);

//   // Sort the dates in ascending order
//   const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));

//   // Reorder the counts array to match the sorted dates
//   const sortedCounts = sortedDates.map(date => consultationsByDate[date]);

//   return (
//     <ApexCharts
//       options={{
//         chart: {
//           type: "line",
//         },
//         xaxis: {
//           categories: sortedDates, // X-axis will be the sorted consultation dates
//         },
//         title: {
//           text: "Consultations Over Time",
//         },
//       }}
//       series={[
//         {
//           name: "Number of Consultations",
//           data: sortedCounts, // The data points (number of consultations per date)
//         },
//       ]}
//       type="line"
//       width="700"
//     />
//   );
// }

// export default ConsultationsByDateChart;



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

  // Extracting the dates and counts
  const dates = Object.keys(consultationsByDate);
  const counts = Object.values(consultationsByDate);

  // Sort the dates in ascending order
  const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));

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
      width="700"
    />
  );
}

export default ConsultationsByDateChart;
