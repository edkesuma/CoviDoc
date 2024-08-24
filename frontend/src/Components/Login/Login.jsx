"use client";
import {Button, Label, TextInput, Select} from "flowbite-react";
import {Link} from 'react-router-dom';
import loginImage from '../../assets/login.jpg';
import React, {useState} from 'react';

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
    // error massage
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const users = getUsers();

        const matchedUser = users.find(user =>
            user.userType === userType &&
            user.email === email &&
            user.password === password
        );

        if (!matchedUser) {
            setMessage('Email or password error. Try again.');
        } else setMessage('')
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
                                <Label htmlFor="userType" value="Select User Type"/>
                            </div>
                            <Select id="userType" required value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="-mt-4">
                                <option value="">Select User Type</option>
                                <option value="Admin">Admin</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>
                            </Select>
                            <div>
                                <div className="block">
                                    <Label htmlFor="email" value="Email"/>
                                </div>
                                <TextInput id="email" type="email" placeholder="name@flowbite.com" required
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <div className="block">
                                    <Label htmlFor="password" value="Password"/>
                                </div>
                                <TextInput id="password" type="password" required value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="flex w-full">
                                <Link to="/login/forget" className='text-cyan-400'>Forget password?</Link>
                                <p className="ml-auto text-red-500">{message}</p>
                            </div>
                            <Button type="submit" className='bg-cyan-500'>Login</Button>
                            <div className="text-center">Don’t have a account?
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
