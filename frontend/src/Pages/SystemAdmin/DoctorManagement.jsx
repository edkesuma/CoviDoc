import React, { useState, useEffect, useContext } from 'react';
import { Button, Label, TextInput, Card, Spinner } from "flowbite-react";
import { FaSearch, FaFilter, FaStethoscope } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

// components
import DoctorRowCard from '../../Components/SystemAdmin/DoctorRowCard';
import ActorNavbar from "../../Components/ActorNavbar";
import CreateDoctorModal from '../../Components/SystemAdmin/CreateDoctorModal';
// import FilterDoctorModal from '../../Components/SystemAdmin/FilterDoctorModal';

function DoctorManagement() {
  const { token } = useContext(AuthContext);
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [createDoctorShow, setCreateDoctorShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/systemAdmin/queryAllDoctors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setListOfDoctors(response.data.data); // Set doctor data from response
        setIsLoading(false);
      });   
    } catch (error) {
      console.log('Error fetching doctors: ', error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchDoctors();
    // setIsLoading(false);
  }, [token]);

  useEffect(() => {
    console.log("List of doctors", listOfDoctors);
  }, [listOfDoctors]);

  useEffect(() => {
    console.log("Is loading", isLoading);
  }, [isLoading]);


  // Filter the data based on searchQuery
  const filteredData = listOfDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <ActorNavbar />

      {/* title */}
      <div className="mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[rem]">
        <h1 className="text-4xl font-bold text-gray-900">List of Doctors</h1>
      </div>

      <div className="mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12">
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
            <Button
              size="lg"
              color="gray"
              className="flex items-center px-4 py-2"
            >
              <FaFilter className="mr-2 w-5 h-5" />
              Filter
            </Button>
          </div>

            {/* create new doctor account */}
            <button
              type="button"
              className="flex items-center justify-center px-4 py-4 w-auto border border-cyan-400 text-lg font-bold text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition duration-300"
              onClick={() => setCreateDoctorShow(true)}
            >
              <FaStethoscope className='mr-2' />
              Create New Doctor
            </button>
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
              There are no doctor accounts available.
            </span>
          </div>
        ) : (
          // display doctor accounts
          <DoctorRowCard data={filteredData} />
        )}
      </div>

      {/* handle create doctor account */}
      <CreateDoctorModal 
        show={createDoctorShow}
        onClose={() => setCreateDoctorShow(false)}
      />
    </>
  );
}

export default DoctorManagement