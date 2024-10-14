import React, {useState, useContext} from "react";
import { Button, Modal, Select, TextInput, Datepicker } from "flowbite-react";
import { FaUser, FaVenusMars, FaStethoscope, FaBirthdayCake, FaEnvelope, FaPhoneAlt, FaCamera, FaLock } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import { format } from "date-fns";
import axios from "axios";
// components
import DropImageInput from "../OverallActorModal/DropImageInput";
import CreateDoctorSuccess from "./CreateDoctorSuccess";
import CreateUpdateDoctorError from "./CreateUpdateDoctorError";

function CreateDoctorModal(props) {
    const { token } = useContext(AuthContext);

    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [birthDate, setBirthDate] = useState(Date.now());
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [createDoctorSuccess, setCreateDoctorSuccess] = useState(false);
    const [createDoctorError, setCreateDoctorError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // create doctor account
    function handleCreateDoctor() {
        // validation
        setErrorMessage("");
        
        if (!fullName || !gender || !specialization || !email || !phoneNumber || !password || !reEnterPassword) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage("Invalid email format.");
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage("Phone number must contain only digits and be 8 to 15 digits long.");
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage("Password must be at least 8 characters long, include at least one number, and one special character.");
            return;
        }
        if (password !== reEnterPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
    
        // send data to back-end
        const formData = new FormData();
        formData.append('name', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phoneNumber);
        formData.append('dob', format(birthDate, "dd/MM/yyyy"));
        formData.append('gender', gender);
        formData.append('specialization', specialization);
        formData.append('profilePicture', selectedImage);

        // create api requests
        axios
            .put(`/api/systemAdmin/createDoctor`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                const { success, message, status } = response.data;
                
                // check account creation
                if (success) {
                    console.log("Doctor account created successfully: ", response.data);
                    setCreateDoctorSuccess(true);
                    props.onClose();
                } else {
                    console.log("Error: ", message);
                    setErrorMessage(message);
                    setCreateDoctorError(true);
                }
            })
            .catch((error) => {
                console.log("Error creating consultation: ", error);

                // if the error comes from the backend, check the response status
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage(error.response.data.message || "Account already exists.");
                    } else {
                        setErrorMessage("Failed to create doctor account.");
                    }
                } else {
                    setErrorMessage("Network or server error occurred.");
                }
                setCreateDoctorError(true);
            });
        resetFields();
    };

    // email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // phone number validation
    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{8,15}$/;
        return phoneRegex.test(phoneNumber);
    }

    // password validation
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    }

    function resetFields() {
        setFullName('');
        setGender('');
        setSpecialization('');
        setBirthDate(Date.now());
        setEmail('');
        setPhoneNumber('');
        setSelectedImage(null);
        setPassword('');
        setReEnterPassword('');
        setErrorMessage("");
        props.onClose();
    }

    function handleCreateDoctorSuccess() {
        setCreateDoctorSuccess(false);
        props.onClose();
    }

    function handleCreateDoctorError() {
        setCreateDoctorError(false);
        props.onClose();
    }


    return (
        <div>
            {/* open modal */}
            <Modal show={props.show} size="4xl" onClose={resetFields} popup>
                <Modal.Header>
                    <p className="text-3xl font-bold text-black p-10">New Doctor Account</p>
                </Modal.Header>

                <Modal.Body>
                    <div className="space-y-6">
                        {/* input */}
                        <div className="flex flex-row">
                            {/* first column */}
                            <div className='flex flex-col w-1/2 space-y-5'>
                                {/* full name */}
                                <div className="flex pl-6 items-center">
                                    <FaUser 
                                        color="#6EE0FA"
                                        size={33}
                                        style={{ paddingRight: '5px' }}
                                    />
                                    <TextInput
                                        id="fullName"
                                        value={fullName}
                                        placeholder="Enter full name"
                                        onChange={(event) => setFullName(event.target.value)}
                                        required
                                        className="ml-2 w-4/5"
                                    />
                                </div>

                                {/* gender */}
                                <div className="flex pl-4 items-center">
                                    <FaVenusMars 
                                        color="#6EE0FA"
                                        size={37}
                                        style={{ marginLeft: '6px' }}
                                    />
                                    <Select id="gender" required 
                                        value={gender} onChange={(e) => setGender(e.target.value)}
                                        className="ml-1.5 w-5/12">
                                        <option value="" disabled>Select gender</option> {/* placeholder */}
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Select>
                                </div>

                                {/* specialization */}
                                <div className="flex pl-6 items-center">
                                    <FaStethoscope 
                                        color="#6EE0FA"
                                        size={31}
                                    />
                                    <TextInput
                                        id="specialization"
                                        value={specialization}
                                        placeholder="Enter specialization"
                                        onChange={(event) => setSpecialization(event.target.value)}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>

                                {/* birth date */}
                                <div className="flex pl-6 items-center">
                                    <FaBirthdayCake
                                        color="#6EE0FA"
                                        size={31}
                                    />
                                    <Datepicker
                                        id="birthDate"
                                        selected={birthDate}
                                        onSelectedDateChanged={(birthDate) => setBirthDate(birthDate)}
                                        defaultDate={new Date()}
                                        minDate={new Date(1900, 0, 1)}
                                        maxDate={new Date()}
                                        autoHide={true}
                                        showClearButton={false}
                                        showTodayButton={false}
                                        weekStart={7}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>

                                {/* email */}
                                <div className="flex pl-6 items-center">
                                    <FaEnvelope 
                                        color="#6EE0FA"
                                        size={31}
                                    />
                                    <TextInput
                                        id="email"
                                        value={email}
                                        placeholder="Enter email"
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>

                                {/* phone number */}
                                <div className="flex pl-6 items-center">
                                    <FaPhoneAlt 
                                        color="#6EE0FA"
                                        size={31}
                                    />
                                    <TextInput
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        placeholder="Enter phone number"
                                        onChange={(event) => setPhoneNumber(event.target.value)}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>
                            </div>

                            {/* second column */}
                            <div className='flex w-1/2 flex-col px-4 justify-center space-y-5'>
                                {/* drag n drop picture */}
                                <div className='flex items-start'>
                                    <FaCamera 
                                        color="#6EE0FA"
                                        size={40}
                                        style={{ paddingRight: '10px' }}
                                    />
                                    <div className="flex flex-col items-center w-64 h-56">
                                        <DropImageInput
                                            name="image"
                                            file={selectedImage}
                                            setFile={setSelectedImage}
                                            show={true}
                                        />
                                    </div>
                                </div>

                                {/* password */}
                                <div className="flex items-center">
                                    <FaLock 
                                        color="#6EE0FA"
                                        size={32}
                                        // style={{ paddingRight: '10px' }}
                                    />
                                    <TextInput
                                        id="password"
                                        value={password}
                                        placeholder="Enter password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>

                                {/* re-enter password */}
                                <div className="flex items-center">
                                    <FaLock 
                                        color="#6EE0FA"
                                        size={32}
                                    />
                                    <TextInput
                                        id="reEnterPassword"
                                        value={reEnterPassword}
                                        placeholder="Re-enter password"
                                        onChange={(event) => setReEnterPassword(event.target.value)}
                                        required
                                        className="ml-2.5 w-4/5"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-1"></div>

                        {/* create or cancel buttons */}
                        <div className="flex justify-center space-x-4 mt-6 w-full"> {/* Flexbox container for buttons */}
                            <button
                                onClick={resetFields}
                                className="w-5/12 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleCreateDoctor}
                                className="w-5/12 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-white transition duration-300"
                            >
                                Create
                            </button>
                        </div>
                        {/* error message */}
                        {errorMessage && (
                            <p className="text-red-500 text-center">{errorMessage}</p>
                        )}
                    </div>
                </Modal.Body>
            </Modal>

            {/* create doctor success */}
            <CreateDoctorSuccess show={createDoctorSuccess} onClose={handleCreateDoctorSuccess} />
            {/* create doctor error */}
            <CreateUpdateDoctorError show={createDoctorError} onClose={handleCreateDoctorError} errorMessage={errorMessage} />
        </div>
    )
}

export default CreateDoctorModal;