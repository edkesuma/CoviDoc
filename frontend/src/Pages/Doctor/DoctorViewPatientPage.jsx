"use client";
import PatientDetail from "../../Components/Doctor/Consultation/PatientDetail.jsx";
import ViewConsultations from "../../Components/Doctor/Consultation/View/ViewConsultations.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button, Spinner} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../Components/Authentication/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ViewXrays from "../../Components/Doctor/Consultation/View/ViewXRays.jsx";
import UploadXrayImage from "../../Components/Doctor/Consultation/Create/UploadXrayImage.jsx";

function DoctorViewPatientPage() {
    const {token} = useContext(AuthContext);
    const {patientId} = useParams();
    const [patient, setPatient] = useState(null);
    const [consultations, setConsultations] = useState([]);
    const [xRays, setXRays] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [consultationModalOpen, setConsultationModalOpen] = useState(false);
    const navigate = useNavigate();
    const [detail, setDetail] = useState(false)

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
            const fetchXrayHistory = async () => {
                try {
                    const response = await axios.get(`/api/doctor/getXrayHistory`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        params: {
                            patientId: patientId
                        }
                    });
                    setXRays(response.data.data);
                } catch (error) {
                    console.log("Error get XRays: ", error);
                }
            };
            Promise.all([fetchPatientDetails(), fetchConsultationHistory(), fetchXrayHistory()])
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.log("Error fetching patient details and consultation history: ", error);
                    setIsLoading(false);
                });
        }
    }, [token, patientId]);


    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl"/>
        </div>
    ) : (
        <div className="flex flex-col mb-4">
            <ActorNavbar/>
            {/* Place the modal outside of other content */}
            <UploadXrayImage
                patientId={patientId}
                modalOpen={consultationModalOpen}
                setModalOpen={setConsultationModalOpen}
            />
            <div
                onClick={() => navigate("/doctor")}
                className="flex flex-row mx-20 px-6 sm:px-8 md:px-10 lg:px-12 items-center cursor-pointer"
            >
                <IoArrowBackCircleOutline color="cyan" className="h-8 w-8"/>
                <button className="text-3xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer hover:font-bold hover:text-cyan-400 transition duration-300">
                    Back
                </button>
            </div>

            <div className="mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12">
                <h1 className="text-4xl font-bold text-gray-900">{patient?.name || "Patient"}'s Account</h1>
            </div>
            <div className="mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12">
                {patient ? (
                    <PatientDetail patientDetails={patient} card={true}/>
                ) : (
                    <p>No patient details available</p>
                )}
            </div>

            <div className="mb-24"/>

            <div className="flex flex-col mx-16">
                <div className="flex flex-row">
                    <div className="flex w-1/2 justify-center">
                        <button
                            onClick={() => {
                                setDetail(false)}}
                            className={`text-2xl px-4 py-2 transition duration-200 ${
                                !detail
                                    ? 'text-cyan-500 font-semibold border-b-4 border-cyan-500'
                                    : 'text-gray-600 hover:text-cyan-500'
                            } bg-transparent border-none cursor-pointer`}
                        >
                            Consultation Record
                        </button>
                    </div>
                    <div className="flex w-1/2 justify-center">
                        <button
                            onClick={() => setDetail(true)}
                            className={`text-2xl px-4 py-2 transition duration-200 ${
                                detail
                                    ? 'text-cyan-500 font-semibold border-b-4 border-cyan-500'
                                    : 'text-gray-600 hover:text-cyan-500'
                            } bg-transparent border-none cursor-pointer`}
                        >
                            X-Ray History
                        </button>
                    </div>
                </div>
                <div className="mx-20 h-1 bg-gray-200 my-1" />
            </div>

            <div>
                {detail ? (
                    <div className="mx-16">
                        <div className="flex flex-row">
                            <div className="mx-20 my-10 font-bold text-3xl">
                                {patient?.name || "Patient"}'s X-Ray History
                            </div>
                        </div>
                        {detail && 
                            <ViewXrays xRays={xRays} setDetail={setDetail}/>}
                    </div>
                ) : (
                    <div className="mx-16">
                        <div className="md:flex-row hidden md:flex">
                            <div className=" ml-20 my-10 font-bold text-3xl">
                                {patient?.name || "Patient"}'s Consultation Records
                            </div>
                            <Button
                                className="bg-cyan-400 my-10 ml-auto mr-20"
                                onClick={() => setConsultationModalOpen(true)}
                            >
                                Create Consultation Record
                            </Button>
                        </div>
                        <div className="flex flex-row md:hidden">
                            <div className=" ml-20 my-10 font-bold text-3xl">
                                Consultation
                            </div>
                            <Button
                                className="bg-cyan-400 my-10 ml-auto mr-20"
                                onClick={() => setConsultationModalOpen(true)}
                            >
                                Create Consultation
                            </Button>
                        </div>
                        {!detail && 
                            <ViewConsultations consultations={consultations}/>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorViewPatientPage;