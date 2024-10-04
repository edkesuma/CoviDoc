import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp1 from "../../Components/SignUp/SignUp1";
import SignUp2 from "../../Components/SignUp/SignUp2";
import SignUpSucc from "../../Components/SignUp/SignUpSucc";
import axios from "axios";
import SignUpFail from "../../Components/SignUp/SignUpFail";

function SignUpFlow() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        dob: new Date(),
        phone: ""
    });
    const navigate = useNavigate();

    const handleNext = (data) => {
        const updatedFormData = {...formData, ...data};
        setFormData(updatedFormData);
        navigate("/signUp/next");
    };

    const formatDateToDDMMYYYY = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const convertToFormDataFormat = (data) => {
        const formData = new FormData();
        for (const key in data) {
            if (key === "dob" && data["dob"]) {
                // Convert dob to YYYY-MM-DD format
                const date = data["dob"];
                const formattedDate = formatDateToDDMMYYYY(date);
                formData.append(key, formattedDate);
            } else {
                formData.append(key, data[key]);
            }            
        }
        return formData;
    }

    const createAccount = async (data) => {
        const updatedFormData = {...formData, ...data};
        setFormData(updatedFormData);
        const formDataToSend = convertToFormDataFormat(updatedFormData);
        console.log(formDataToSend);
        // Send data to backend
        await axios
            .put("/api/patient/registerPatient", formDataToSend,
                {
                    headers: {
                        "Content-Type": "form-data"
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    console.log("Account created successfully");
                    navigate("/signUp/success");
                } else {
                    console.log("Account creation failed");
                    navigate("/signUp/fail", {state: {message: res.data.message}});
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Routes>
            <Route
                path="/"
                element = {
                    <div className='flex w-screen h-screen justify-center items-center md:bg-gradient-to-l bg-gradient-to-br from-cyan-500 to-cyan-100'>
                        <SignUp1 onNext={handleNext} formData={formData} />
                    </div>
                }
            />
            <Route
                path="/next"
                element = {
                    <div className='flex w-screen h-screen justify-center items-center md:bg-gradient-to-l bg-gradient-to-br from-cyan-500 to-cyan-100'>
                        <SignUp2 onCreateAccount={createAccount} formData={formData} />
                    </div>
                }
            />
            <Route 
                path="/success"
                element={
                    <div className='flex w-screen h-screen justify-center items-center bg-[#27a2ba]'>
                        <SignUpSucc />
                    </div>
                }
            />
            <Route 
                path="/fail"
                element={
                    <div className='flex w-screen h-screen justify-center items-center bg-[#27a2ba]'>
                        <SignUpFail />
                    </div>
                }
            />
        </Routes>
    );
}

export default SignUpFlow;