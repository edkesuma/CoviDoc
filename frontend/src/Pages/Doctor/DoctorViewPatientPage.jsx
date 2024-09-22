"use client";
import PatientDetail from "../../Components/Doctor/Consultation/PatientDetail.jsx";
import ViewConsultations from "../../Components/Doctor/Consultation/ViewConsultations.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button, Card, Spinner} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateConsultationModal from "../../Components/Doctor/Consultation/Modal/CreateConsultationModal.jsx";

function DoctorViewPatientPage() {
    const { token } = useContext(AuthContext);
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [consultations, setConsultations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [consultationModalOpen, setConsultationModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && patientId) {
            const fetchPatientDetails = async () => {
                try {
                    const response = await axios.get(`/api/doctor/getPatientDetails`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            patientId: patientId
                        }
                    });
                    setPatient(response.data.patient);
                } catch (error) {
                    console.log("Error fetching patient details: ", error);
                }
            };
            const fetchConsultationHistory = async () => {
                try {
                    console.log("Fetching consultation history");
                    const response = await axios.get(`/api/doctor/getPatientConsultationHistory`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            patientId: patientId
                        }
                    });
                    setConsultations(response.data.consultationHistory);
                } catch (error) {
                    console.log("Error fetching consultation history: ", error);
                }
            };
            
            Promise.all([fetchPatientDetails(), fetchConsultationHistory()])
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.log("Error fetching patient details and consultation history: ", error);
                    setIsLoading(false);
                });
            }
    }, [token, patientId]);
    
    useEffect(() => {
        console.log("Consultations", consultations);
    }, [consultations]);

    useEffect(() => {
        console.log("Patient", patient);
    }, [patient]);

    useEffect(() => {
        console.log("Is loading", isLoading);
    }, [isLoading]);
    

    return isLoading ? (
        <div className="text-center text-8xl">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
    ) : (
        <div className="flex flex-col items-center">
            <ActorNavbar />
            {/* Place the modal outside of other content */}
            <CreateConsultationModal
            patientId={patientId}
            modalOpen={consultationModalOpen}
            setModalOpen={setConsultationModalOpen}
            />
      
            <div
                onClick={() => navigate("/doctor")}
                className="flex flex-row ml-20 items-center my-10 cursor-pointer"
            >
                <IoArrowBackCircleOutline color="cyan" className="h-12 w-12" />
                <button className="text-4xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer">
                    Back
                </button>
            </div>
      
            <div className="ml-20 my-10 font-bold text-3xl">
                {patient?.name || "Patient"}'s Account
            </div>
            <Card className="mx-20">
                {patient ? (
                    <PatientDetail patientDetails={patient} />
                ) : (
                    <p>No patient details available</p>
                )}
            </Card>

            <div className="mb-24" />
            <div className="flex flex-row">
                <div className="ml-20 my-10 font-bold text-3xl">
                    {patient?.name || "Patient"}'s Consultation Records
                </div>
                <Button
                    className="bg-cyan-400 my-10 ml-auto mr-20"
                    onClick={() => setConsultationModalOpen(true)}
                >
                    Create Consultation Record
                </Button>
            </div>

            <ViewConsultations consultations={consultations} />
        </div>
    );
}

export default DoctorViewPatientPage;