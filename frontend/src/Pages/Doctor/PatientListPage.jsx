import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import {Button, Spinner,TextInput} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import ViewPatients from "../../Components/Doctor/ViewPatients.jsx";
import axios from "axios";
import {FaSearch} from "react-icons/fa";

function PatientListPage() {
    const { token, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (token) {
            axios
                .get("/api/doctor/getPatientList", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setPatients(response.data.patients);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching patient data:", error);
                    setIsLoading(false);
                });
        }
    }, [token]);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleUpdate = (patientId, newState) => {
        setPatients(prevPatients =>
            prevPatients.map(patient =>
                patient.patientId === patientId ? { ...patient, currentState: newState } : patient
            )
        );
    };

    return (
        <div>
            <ActorNavbar />
            <TextInput
                id="Search"
                placeholder="Search profile"
                className="mr w-1/4 mx-20 mb-10"
                icon={FaSearch}
                sizing="lg"
                onChange={(e) => setSearch(e.target.value)}
            />
            {isLoading ? (
                <div className="mt-20 text-center ">
                    <Spinner aria-label="Loading patients" size="xl" />
                </div>
            ) : (
                <ViewPatients patients={filteredPatients} token={token} onUpdate={handleUpdate} />
            )}
        </div>
    );
}

export default PatientListPage;
