import React, { useState, useEffect, useContext } from 'react';
import { Spinner,TextInput } from "flowbite-react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import axios from "axios";
// component
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import ViewPatients from "../../Components/Doctor/ViewPatients.jsx";
import FilterPatients from '../../Components/Doctor/FilterPatients.jsx';


function PatientListPage() {
    const { token } = useContext(AuthContext);
    
    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    // filtering
    const [filterPatientShow, setFilterPatientShow] = useState(false)
    const [filteredGender, setFilteredGender] = useState("");
    const [filteredAge, setFilteredAge] = useState({ min: 0, max: 100 });
    const [filteredStatus, setFilteredStatus] = useState("");
    

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

    // calculate age
    const calculateAge = (dob) => {
        // parse dob assuming it's in DD/MM/YYYY format
        const [day, month, year] = dob.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day); // JS months are 0-based

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    // search and filter
    const filteredData = patients.filter((patient) => {
        // search
        const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase());
        // gender
        const matchesGender = filteredGender ? patient.gender === filteredGender : true;
        // age
        const patientAge = calculateAge(patient.dob);
        const matchesAgeRange = patientAge >= filteredAge.min && patientAge <= filteredAge.max;
        const matchesStatus = filteredStatus ? patient.currentState === filteredStatus : true;

        return matchesSearch && matchesGender && matchesAgeRange && matchesStatus;
    });

    function handleFilter({ gender, ageRange, status }) {
        setFilteredGender(gender);
        setFilteredAge(ageRange);
        setFilteredStatus(status);
    };
    
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

            {/* title */}
            <div className="mt-12 mx-5 md:mx-20 px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[rem]">
                <h1 className="text-4xl font-bold text-gray-900">List of Patients</h1>
            </div>

            <div className="mt-12 mx-5 md:mx-20 px-6 sm:px-8 md:px-10 lg:px-12">
                <div className="flex items-center">
                    <div className='flex items-center space-x-4 flex-grow'>
                        {/* search bar */}
                        <TextInput
                            id="search"
                            placeholder="Enter name"
                            className="w-1/2"
                            icon={FaSearch}
                            sizing="lg"
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* filter */}
                        <button
                            type="button"
                            className="flex items-center justify-center px-4 py-4 w-auto border border-gray-300 text-lg text-gray-500 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition duration-300"
                            onClick={() => setFilterPatientShow(true)}
                        >
                            <FaFilter className="mr-2 w-5 h-5" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className='p-5'></div>

                {/* spinner when loading */}
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spinner aria-label="Center-aligned spinner" size="xl" />
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="flex justify-center">
                        <span className="text-lg font-semibold">
                        There are no patient accounts available.
                        </span>
                    </div>
                ) : (
                    // display doctor accounts
                    <ViewPatients patients={filteredData} token={token} onUpdate={handleUpdate} />
                )}
            </div>

            {/* handle filter patient account */}
            <FilterPatients 
                show={filterPatientShow}
                onClose={() => setFilterPatientShow(false)}
                onFilter={handleFilter}
            />
        </div>
    );
}

export default PatientListPage;
