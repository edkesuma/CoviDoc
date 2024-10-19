import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import {Button, Spinner} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";
import axios from "axios";
import ViewConsultation from "../../Components/Patient/ViewConsultation.jsx";

function ConsultationHistoryPage() {
    const { token, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [consultations, setConsultations] = useState([]);
    const [patientName,setPatientName] = useState('');

    useEffect(() => {
        if (token) {
            axios
                .get("/api/patient/queryConsultationsUnderPatient", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setConsultations(response.data.consultationHistory);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    setIsLoading(false);
                });
            axios
                .get("/api/patient/getPatientProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setPatientName(response.data.patient.name)
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    setIsLoading(false);
                });

        }
    }, [token]);
    return (
        <div>
            <ActorNavbar />
            <div className='ml-20 mb-10 font-bold text-4xl flex flex-row'>Greetings, &nbsp;
                <p className='text-cyan-400'>
                    {patientName}
                </p>
            </div>
            {isLoading ? (
                <div className="flex justify-center">
                    <Spinner aria-label="Center-aligned spinner" size="xl" />
                </div>
            ) : consultations.length === 0 ? (
                <div className="flex justify-center">
                    <span className="text-lg font-semibold">
                        You don't have any consultation history.
                    </span>
                </div>
            ) : (
                <ViewConsultation consultations={consultations} token={token}/>
            )}
        </div>
    );
}

export default ConsultationHistoryPage;