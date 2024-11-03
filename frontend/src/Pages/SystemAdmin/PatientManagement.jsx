import React, { useState, useEffect, useContext } from 'react';
import { Button, Label, TextInput, Card, Spinner } from "flowbite-react";
import { FaSearch, FaFilter, FaUserInjured } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
// components
import PatientRowCard from '../../Components/SystemAdmin/PatientRowCard';
import ActorNavbar from "../../Components/ActorNavbar";
import CreatePatientModal from '../../Components/SystemAdmin/CreatePatientModal';
import FilterPatientModal from '../../Components/SystemAdmin/FilterPatientModal';


function PatientManagement({}) {
    const { token } = useContext(AuthContext);

    const [listOfPatients, setListOfPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [createPatientShow, setCreatePatientShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    // filtering
    const [filterPatientShow, setFilterPatientShow] = useState(false)
    const [filteredGender, setFilteredGender] = useState("");
    const [filteredAge, setFilteredAge] = useState({ min: 0, max: 100 });

    const fetchPatients = async () => {
        try {
            const response = await axios.get('/api/systemAdmin/queryAllPatients', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setListOfPatients(response.data.data);
                setIsLoading(false);
            });   
        } catch (error) {
            console.log('Error fetching patients: ', error);
        }
    };

    // useEffect
    useEffect(() => {
        fetchPatients();
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
    const filteredData = listOfPatients.filter((patient) => {
        // search
        const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase());
        // gender
        const matchesGender = filteredGender ? patient.gender === filteredGender : true;
        // age
        const patientAge = calculateAge(patient.dob);
        const matchesAgeRange = patientAge >= filteredAge.min && patientAge <= filteredAge.max;

        return matchesSearch && matchesGender && matchesAgeRange;
    });

    function handleFilter({ gender, ageRange }) {
        setFilteredGender(gender);
        setFilteredAge(ageRange);
    };


    return (
        <>
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
                            <FaFilter className="mr-2 w-5 h-5"/>
                            Filter
                        </button>
                    </div>

                    {/* create new patient account */}
                    <button
                        type="button"
                        className="hidden md:flex items-center justify-center px-4 py-4 w-auto border border-cyan-400 text-lg font-bold text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition duration-300"
                        onClick={() => setCreatePatientShow(true)}
                    >
                        <FaUserInjured className='mr-2'/>
                        Create New Patient
                    </button>
                    <button
                        type="button"
                        className="flex md:hidden items-center justify-center px-4 py-4 w-auto border border-cyan-400 text-lg font-bold text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition duration-300"
                        onClick={() => setCreatePatientShow(true)}
                    >
                        <FaUserInjured className='mr-2'/>
                        New
                    </button>
                </div>

                <div className='p-5'></div>

                {/* spinner when loading */}
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spinner aria-label="Center-aligned spinner" size="xl"/>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="flex justify-center">
                        <span className="text-lg font-semibold">
                        There are no patient accounts available.
                        </span>
                    </div>
                ) : (
                    // display patient accounts
                    <PatientRowCard data={filteredData} />
                )}
            </div>

            {/* handle filter patient account */}
            <FilterPatientModal 
                show={filterPatientShow}
                onClose={() => setFilterPatientShow(false)}
                onFilter={handleFilter}
            />

            {/* handle create patient account */}
            <CreatePatientModal 
                show={createPatientShow}
                onClose={() => setCreatePatientShow(false)}
            />
        </>
    );
}

export default PatientManagement;