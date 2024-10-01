import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Datepicker, Select, TextInput } from "flowbite-react";
import { FaPencilAlt, FaUser, FaVenusMars, FaStethoscope, FaBirthdayCake, FaEnvelope, FaPhoneAlt, FaCamera, FaLock } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import { format } from "date-fns";
import axios from "axios";
// components
import UpdatePatientSuccess from './UpdatePatientSuccess';
import DropImageInput from '../OverallActorModal/DropImageInput';

function ViewUpdatePatientModal({ show, onClose, data }) {
    const { token } = useContext(AuthContext);

    const [isEditable, setIsEditable] = useState(false); // update mode (editable)
    const [fullName, setFullName] = useState(data.name);
    const [gender, setGender] = useState(data.gender);
    const [birthDate, setBirthDate] = useState(new Date(data.dob));
    const [email, setEmail] = useState(data.email);
    const [phoneNumber, setPhoneNumber] = useState(data.phone);
    const [allergies, setAllergies] = useState(data.allergies);
    const [medicalHistory, setMedicalHistory] = useState(data.medicalHistory);
    const [selectedImage, setSelectedImage] = useState(null);
    const [password, setPassword] = useState(data.password);
    const [reEnterPassword, setReEnterPassword] = useState(""); // appears only when updating

    const [updatePatientSuccess, setUpdatePatientSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setFullName(data.name);
        setGender(data.gender);

        // ensure date string is parsed correctly
        const parsedDate = typeof data.dob === 'string' 
            ? new Date(data.dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')) 
            : new Date(data.dob);
        // check if the parsed date is valid using getTime() instead of isNaN(parsedDate)
        if (!isNaN(parsedDate)) {
            setBirthDate(parsedDate);
        } else {
            console.error("Invalid date format: ", data.dob);
        }
        
        setEmail(data.email);
        setPhoneNumber(data.phone);
        setAllergies(data.allergies);
        setMedicalHistory(data.medicalHistory);
        setPassword(data.password);
        setReEnterPassword("");
        setSelectedImage(data.profilePictureUrl);
    }, [data]);

    // handle update patient account information
    function handleUpdatePatient() {
        // validation
        setErrorMessage("");
        
        if (!fullName || !gender || !email || !phoneNumber || !allergies || !medicalHistory || !password || !reEnterPassword) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }
        if (isNaN(phoneNumber)) {
                setErrorMessage("Phone number must be a valid number.");
                return;
        }
        if (password !== reEnterPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // send data to back-end
        const formData = new FormData();
        formData.append('patientId', data.patientId);
        formData.append('name', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phoneNumber);
        formData.append('dob', format(birthDate, "dd/MM/yyyy"));
        formData.append('gender', gender);
        formData.append('allergies', allergies);
        formData.append('medicalHistory', medicalHistory);
        formData.append('profilePicture', selectedImage);

        // create api requests
        axios
            .patch(`/api/systemAdmin/updatePatient`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log("Patient account updated successfully: ", response.data);
                setUpdatePatientSuccess(true);
                setIsEditable(false);
                onClose();
            })
            .catch((error) => {
                console.log("Error updating patient account: ", error);
            });
    };

    function resetFields() {
        setFullName(data.name);
        setGender(data.gender);
        setBirthDate(new Date(data.dob));
        setEmail(data.email);
        setPhoneNumber(data.phone);
        setPassword(data.password);
        setAllergies(data.allergies);
        setMedicalHistory(data.medicalHistory);
        setReEnterPassword("");
        setSelectedImage(data.profilePictureUrl);

        setIsEditable(false);
        onClose();
    };
    
    function exitUpdate() {
        setFullName(data.name);
        setGender(data.gender);
        setBirthDate(new Date(data.dob));
        setEmail(data.email);
        setPhoneNumber(data.phone);
        setAllergies(data.allergies);
        setMedicalHistory(data.medicalHistory);
        setPassword(data.password);
        setReEnterPassword("");
        setSelectedImage(data.profilePictureUrl);

        setIsEditable(false);
    };

    function handleUpdatePatientSuccess() {
        setReEnterPassword("");
        setUpdatePatientSuccess(false);
        onClose();
    }


    return (
        <div>
            <Modal show={show} size="4xl" popup={true} onClose={resetFields}>
                <Modal.Header>
                    <p className="text-2xl font-bold text-black px-10 pt-10 break-words">{data.name} <br/> ID: {data.patientId}</p>
                </Modal.Header>

                <Modal.Body className={isEditable ? 'pt-8' : 'pt-0'}>
                    <div className="space-y-4">
                        {/* pencil icon to edit */}
                        {!isEditable && (
                            <div className="flex justify-end">
                                <button
                                    className="text-black hover:text-[#6EE0FA] transition duration-300"
                                    onClick={() => setIsEditable(true)}  // Enter edit mode
                                >
                                    <FaPencilAlt 
                                        size={26}
                                        style={{ marginRight: '40px' }}
                                    />
                                </button>
                            </div>
                        )}

                        <div className='flex flex-row'>
                            {/* first column */}
                            <div className='flex flex-col w-1/2 space-y-5'>
                                {/* profile picture */}
                                <div className='flex pl-6 items-start'>
                                    <FaCamera
                                        color="#6EE0FA"
                                        size={30}
                                    />
                                    {/* drag n drop picture */}
                                    {isEditable ? (
                                        <div className="flex flex-col items-center h-56 ml-2 w-4/5">
                                            <DropImageInput
                                                name="image"
                                                file={selectedImage}
                                                setFile={setSelectedImage}
                                                show={isEditable}
                                            />
                                        </div>
                                    ) : (
                                        <div className="ml-2 w-4/5">
                                            <img
                                                src={selectedImage}
                                                alt="Patient Profile"
                                                className="ml-2 w-72 h-72"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* full name */}
                                <div className="flex pl-4 items-center">
                                    <FaUser 
                                        color="#6EE0FA"
                                        size={31}
                                        style={{ marginLeft: '12px' }}
                                    />
                                    {isEditable ? (
                                        <TextInput
                                            id="fullName"
                                            value={fullName}
                                            placeholder="Enter full name"
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            className="ml-2 w-4/5"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={fullName}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]" 
                                        />
                                    )}
                                </div>

                                {/* gender */}
                                <div className="flex pl-4 items-center">
                                    <FaVenusMars 
                                        color="#6EE0FA"
                                        size={37}
                                        style={{ marginLeft: '6px' }}
                                    />
                                    {isEditable ? (
                                        <Select id="gender" 
                                            value={gender} 
                                            onChange={(e) => setGender(e.target.value)} 
                                            required 
                                            className="ml-1.5 w-5/12">
                                            <option value="" disabled>Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={gender}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]"
                                        />
                                    )}
                                </div>

                                {/* birth date */}
                                <div className="flex pl-4 items-center">
                                    <FaBirthdayCake 
                                        color="#6EE0FA"
                                        size={31}
                                        style={{ marginLeft: '12px' }}
                                    />
                                    {isEditable ? (
                                        <Datepicker
                                            id="birthDate"
                                            selected={birthDate}
                                            onSelectedDateChanged={(birthDate) => setBirthDate(birthDate)}
                                            defaultDate={birthDate}
                                            minDate={new Date(1900, 0, 1)}
                                            maxDate={new Date()}
                                            autoHide={true}
                                            showClearButton={false}
                                            showTodayButton={false}
                                            weekStart={7}
                                            required
                                            className="ml-2.5 w-4/5"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={birthDate.toLocaleDateString("en-GB")}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]"
                                        />
                                    )}
                                </div>

                                {/* email */}
                                <div className="flex pl-4 items-center">
                                    <FaEnvelope 
                                        color="#6EE0FA"
                                        size={31}
                                        style={{ marginLeft: '12px' }}
                                    />
                                    {isEditable ? (
                                        <TextInput
                                            id="email"
                                            value={email}
                                            placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="ml-2 w-4/5"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={email}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]"
                                        />
                                    )}
                                </div>

                                {/* phone number */}
                                <div className="flex pl-4 items-center">
                                    <FaPhoneAlt 
                                        color="#6EE0FA"
                                        size={31}
                                        style={{ marginLeft: '12px' }}
                                    />
                                    {isEditable ? (
                                        <TextInput
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            placeholder="Enter phone number"
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                            className="ml-2 w-4/5"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* second column */}
                            <div className='flex w-1/2 flex-col px-4 space-y-5'>
                                {/* allergies */}
                                <div className="pl-6 items-center w-11/12">
                                    <p className="text-[#6EE0FA]">ALLERGIES</p>
                                    {isEditable ? (
                                        <textarea
                                            id="allergies"
                                            value={allergies}
                                            placeholder="Enter allergies"
                                            onChange={(event) => setAllergies(event.target.value)}
                                            required
                                            className="text-sm w-full h-24 p-2 border border-gray-300 bg-gray-50 rounded-md resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={allergies}
                                            readOnly
                                            className="text-sm w-full h-24 p-2 border rounded-lg border-[#6EE0FA]"
                                            style={{ paddingBottom: '70px' }}
                                        />
                                    )}
                                </div>

                                {/* medical history */}
                                <div className="pl-6 items-center w-11/12">
                                    <p className="text-[#6EE0FA]">MEDICAL HISTORY</p>
                                    {isEditable ? (
                                        <textarea
                                            id="medicalHistory"
                                            value={medicalHistory}
                                            placeholder="Enter medical history"
                                            onChange={(event) => setMedicalHistory(event.target.value)}
                                            required
                                            className="text-sm w-full h-24 p-2 border border-gray-300 bg-gray-50 rounded-md resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={medicalHistory}
                                            readOnly
                                            className="text-sm w-full h-24 p-2 border rounded-lg border-[#6EE0FA]"
                                            style={{ paddingBottom: '70px' }}
                                        />
                                    )}
                                </div>

                                <div className='pt-2'></div>

                                {/* password */}
                                <div className="flex pl-4 items-center">
                                    <FaLock 
                                        color="#6EE0FA"
                                        size={31}
                                    />
                                    {isEditable ? (
                                        <TextInput
                                            id="password"
                                            type="password"
                                            value={password}
                                            placeholder="Enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="ml-2 w-4/5"
                                        />
                                    ) : (
                                        <input
                                            type="password"
                                            value={password}
                                            readOnly
                                            className="ml-2 w-4/5 border rounded-lg border-[#6EE0FA]"
                                        />
                                    )}
                                </div>

                                {/* re-enter password (only visible in edit mode) */}
                                {isEditable && (
                                    <div className="flex pl-4 items-center">
                                        <FaLock 
                                            color="#6EE0FA"
                                            size={31}
                                        />
                                        <TextInput
                                            id="reEnterPassword"
                                            type="password"
                                            value={reEnterPassword}
                                            placeholder="Re-enter password"
                                            onChange={(e) => setReEnterPassword(e.target.value)}
                                            required
                                            className="ml-2 w-4/5"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-1"></div>

                        {/* Conditional rendering for update buttons */}
                        {isEditable && (
                            <>
                                <div className="flex justify-center space-x-4 mt-6 w-full">
                                    <button
                                        onClick={exitUpdate}
                                        className="w-5/12 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleUpdatePatient}
                                        className="w-5/12 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition duration-300"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                                {/* error message */}
                                {errorMessage && (
                                    <p className="text-red-500 text-center">{errorMessage}</p>
                            )}
                            </>
                        )}
                    </div>
                </Modal.Body>
            </Modal>

            {/* update patient success */}
            <UpdatePatientSuccess show={updatePatientSuccess} onClose={handleUpdatePatientSuccess} />
        </div>
    )
}

export default ViewUpdatePatientModal
