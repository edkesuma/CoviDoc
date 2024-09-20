"use client";
import {Button, Label, TextInput, Select} from "flowbite-react";
import {useNavigate, Link} from 'react-router-dom';
import loginImage from '../../assets/login.jpg';
import React, {useState, useContext} from 'react';
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//the function return userList
function getUsers() {
    const userList = [
        {userType: 'Admin', email: 'admin@gmail.com', password: '123'},
        {userType: 'Doctor', email: 'doctor@gmail.com', password: '123'}
    ];
    return userList;
}

function Login() {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // error message
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const redirectToUserHome = (token) => {
        const user = jwtDecode(token);
        console.log("Decoded user: ", user);
        if (user.role === 'System Admin') {
            return navigate('/systemAdmin/doctorManagement');
        } else if (user.role === 'Doctor') {
            return navigate('/doctor');
        } else if (user.role === 'Patient') {
            return navigate('/patient');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios
            .post("/api/authentication/login", {
                userType: userType,
                email: email,
                password: password
            })
            .catch((err) => {
                console.log(err);
            });
        if (response.data.token) {
            login(response.data.token);
            redirectToUserHome(response.data.token);
            // console.log("token", response.data.token);
        } else {
            setErrorMessage('Invalid credentials');
        }
    };

    return (
        <div
            className="flex flex-row items-center rounded-lg shadow bg-gray-100"
            style={{width: '1000px', height: '600px'}}
        >
            <img className="object-cover w-1/3 h-full rounded-s-lg" src={loginImage} alt="Login Image"/>
            <div className="flex flex-col justify-center items-center w-2/3 h-full ">
                <div className="w-3/4">
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative font-bold text-5xl pb-8">
                <span
                    className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                            Login
                        </div>
                        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                            <div className="block">
                                <Label htmlFor="userType" value="User Type"/>
                            </div>
                            <Select id="userType" required value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    >
                                <option value="">Select User Type</option>
                                <option value="System Admin">System Admin</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>
                            </Select>
                            <div>
                                <div className="block">
                                    <Label htmlFor="email" value="Email"/>
                                </div>
                                <TextInput 
                                    id="email" 
                                    type="email" 
                                    placeholder="user@mail.com"
                                    required={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    color={errorMessage === "" ? "gray" : "failure"}
                                />
                            </div>
                            <div>
                                <div className="block">
                                    <Label htmlFor="password" value="Password"/>
                                </div>
                                <TextInput 
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    color={errorMessage === "" ? "gray" : "failure"}
                                />
                            </div>
                            <div className="flex w-full">
                                <Link to="/login/forget" className='text-cyan-400'>Forget password?</Link>
                                <p className="ml-auto text-red-500">{errorMessage}</p>
                            </div>
                            <Button type="submit" className='bg-cyan-500'>Login</Button>
                            <div className="text-center">Don’t have an account?
                                <Link to="/signUp" className="text-cyan-400"> Sign Up here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
