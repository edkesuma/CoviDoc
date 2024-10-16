import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function SymptomPrevalenceHeatmap({ token }) {
  const [patients, setPatients] = useState([]);
  const [symptomData, setSymptomData] = useState([]);
  const [symptomCategories, setSymptomCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the patient list
        const patientResponse = await axios.get("/api/doctor/getPatientList", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const patientsArray = patientResponse.data.patients;
        setPatients(patientsArray); // Store the patient details for later use

        // Initialize a set to store unique symptoms
        const uniqueSymptoms = new Set();

        // Step 2: Loop through patients to get their consultation notes
        const symptomMatrix = [];
        for (const patient of patientsArray) {
          const patientId = patient.patientId;
          try {
            const consultationResponse = await axios.get(
              `/api/doctor/getPatientConsultationHistory`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: { patientId },
              }
            );

            const consultations = consultationResponse.data.consultationHistory;

            // Step 3: Loop through consultations and extract symptoms from consultation notes
            consultations.forEach((consultation) => {
              const consultationNotes = consultation.ConsultationNotes.split(", ");
              consultationNotes.forEach((symptom) => {
                uniqueSymptoms.add(symptom.trim());
              });
            });

            // Add a new row in the matrix for this patient, initialized with 0s for all symptoms
            const symptomPresence = Array.from(uniqueSymptoms).map((symptom) =>
              consultations.some((consultation) =>
                consultation.ConsultationNotes.includes(symptom)
              )
                ? 1
                : 0
            );
            symptomMatrix.push(symptomPresence);
          } catch (error) {
            console.error(`Error fetching consultation history for ${patientId}:`, error);
          }
        }

        // Update state with the unique symptoms and matrix data
        setSymptomCategories(Array.from(uniqueSymptoms));
        setSymptomData(symptomMatrix);
      } catch (error) {
        console.error("Error fetching patient list:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
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
          },
        },
        title: {
          text: "Symptom Prevalence Heatmap",
        },
        xaxis: {
          categories: patients.map((patient) => patient.name),
        },
        yaxis: {
          categories: symptomCategories,
        },
      }}
      series={symptomCategories.map((symptom, index) => ({
        name: symptom,
        data: symptomData.map((row) => row[index]),
      }))}
      type="heatmap"
      width="700"
    />
  );
}

export default SymptomPrevalenceHeatmap;

