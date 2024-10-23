// import React, { useEffect, useState } from "react";
// import ApexCharts from "react-apexcharts";
// import axios from "axios";

// function SymptomPrevalenceHeatmap({ token }) {
//   const [patients, setPatients] = useState([]);
//   const [symptomData, setSymptomData] = useState([]);
//   const [symptomCategories, setSymptomCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Step 1: Fetch the patient list
//         const patientResponse = await axios.get("/api/doctor/getPatientList", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const patientsArray = patientResponse.data.patients;
//         setPatients(patientsArray); // Store the patient details for later use

//         // Step 2: Fetch all consultation histories in parallel
//         const consultationPromises = patientsArray.map((patient) =>
//           axios.get(`/api/doctor/getPatientConsultationHistory`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             params: { patientId: patient.patientId },
//           }).then(response => ({
//             patientId: patient.patientId,
//             consultations: response.data.consultationHistory
//           })).catch(error => {
//             console.error(`Error fetching consultation history for ${patient.patientId}:`, error);
//             return {
//               patientId: patient.patientId,
//               consultations: []
//             };
//           })
//         );

//         const consultationsArray = await Promise.all(consultationPromises);

//         // Step 3: Extract all unique symptoms
//         const uniqueSymptomsSet = new Set();
//         consultationsArray.forEach(({ consultations }) => {
//           consultations.forEach((consultation) => {
//             if (consultation.ConsultationNotes) {
//               const symptoms = consultation.ConsultationNotes.split(", ");
//               symptoms.forEach((symptom) => {
//                 uniqueSymptomsSet.add(symptom.trim());
//               });
//             }
//           });
//         });

//         const uniqueSymptoms = Array.from(uniqueSymptomsSet).sort(); // Sorting for consistency
//         setSymptomCategories(uniqueSymptoms);

//         // Step 4: Build the symptom matrix
//         const symptomMatrix = consultationsArray.map(({ consultations }) => {
//           // Create a Set for symptoms present in any consultation for this patient
//           const patientSymptoms = new Set();
//           consultations.forEach((consultation) => {
//             if (consultation.ConsultationNotes) {
//               const symptoms = consultation.ConsultationNotes.split(", ");
//               symptoms.forEach((symptom) => {
//                 patientSymptoms.add(symptom.trim());
//               });
//             }
//           });

//           // For each unique symptom, mark 1 if present, else 0
//           return uniqueSymptoms.map((symptom) => (patientSymptoms.has(symptom) ? 1 : 0));
//         });

//         setSymptomData(symptomMatrix);
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // Prepare series data for ApexCharts
//   const series = symptomCategories.map((symptom, index) => ({
//     name: symptom,
//     data: symptomData.map((row) => row[index]),
//   }));

//   return (
//     <div>
//       <ApexCharts
//         options={{
//           chart: {
//             type: "heatmap",
//           },
//           plotOptions: {
//             heatmap: {
//               colorScale: {
//                 ranges: [
//                   { from: 0, to: 0, color: "#e0e0e0", name: "No" },
//                   { from: 1, to: 1, color: "#f44336", name: "Yes" },
//                 ],
//               },
//               shadeIntensity: 0.5,
//               radius: 0,
//               useFillColorAsStroke: true,
//               distributed: false,
//               opacity: 1,
//             },
//           },
//           title: {
//             text: "Symptom Prevalence Heatmap",
//           },
//           xaxis: {
//             categories: patients.map((patient) => patient.name),
//             title: {
//               text: "Patients",
//             },
//           },
//           yaxis: {
//             title: {
//               text: "Symptoms",
//             },
//           },
//           tooltip: {
//             y: {
//               formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
//                 return val === 1 ? "Yes" : "No";
//               },
//             },
//           },
//         }}
//         series={series}
//         type="heatmap"
//         height={350}
//         width="100%"
//       />
//     </div>
//   );
// }

// export default SymptomPrevalenceHeatmap;



import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function SymptomPrevalenceHeatmap({ token }) {
  const [patients, setPatients] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  const [symptomCategories, setSymptomCategories] = useState([]);

  useEffect(() => {
    const fetchSymptomPrevalence = async () => {
      try {
        // Step 1: Fetch the processed symptom prevalence data from the backend
        const response = await axios.get("/api/doctor/getSymptomPrevalence", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { patients, symptomCategories, symptomData } = response.data;

        // Step 2: Store the fetched data in state variables
        setPatients(patients);
        setSymptomCategories(symptomCategories);
        setSymptomData(symptomData);
      } catch (error) {
        console.error("Error fetching symptom prevalence data:", error);
      }
    };

    fetchSymptomPrevalence();
  }, [token]);

  // Prepare series data for ApexCharts
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
              radius: 0,
              useFillColorAsStroke: true,
              distributed: false,
              opacity: 1,
            },
          },
          title: {
            text: "Symptom Prevalence Heatmap",
          },
          xaxis: {
            categories: patients.map((patient) => patient.name),
            title: {
              text: "Patients",
            },
          },
          yaxis: {
            title: {
              text: "Symptoms",
            },
          },
          tooltip: {
            y: {
              formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                return val === 1 ? "Yes" : "No";
              },
            },
          },
        }}
        series={series}
        type="heatmap"
        height={1200}  // Increased height for vertical scroll
        width={patients.length * 55}   // Increased width for horizontal scroll
      />
    </div>
  );
}

export default SymptomPrevalenceHeatmap;