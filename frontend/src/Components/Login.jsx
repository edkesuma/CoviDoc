"use client";
import {Button, Label, TextInput, Select} from "flowbite-react";
import loginImage from '../assets/login.jpg'
import React, {useState} from 'react';

function getUsers() {
    const userList = [
        {userType: 'Admin', email: 'admin@gmail.com', password: '123'},
        {userType: 'Doctor', email: 'doctor@gmail.com', password: '123'}
    ];
    return userList;
}

function LoginFrom() {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const users = getUsers();

        const matchedUser = users.find(user =>
            user.userType === userType &&
            user.email === email &&
            user.password === password
        );

        if (matchedUser) {
            setMessage('Login successful!');
        } else {
            setMessage('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative text-5xl pb-8">
                <span className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                Login
            </div>
            <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="mb-2 block">
                    <Label htmlFor="userType" value="Select User Type"/>
                </div>
                <Select id="userType" required value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="">Select User Type</option>
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Patient">Patient</option>
                </Select>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email"/>
                    </div>
                    <TextInput id="email" type="email" placeholder="name@flowbite.com" required value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password"/>
                    </div>
                    <TextInput id="password" type="password" required value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <a href="#" className='text-cyan-400'>Forget password?</a>
                <Button type="submit" className='bg-cyan-500'>Login</Button>
                <div>Don’t have a account?
                    <a href="#" className="text-cyan-400"> Sign Up here</a>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

function Login() {
    return (
        <div
            className="flex flex-row items-center rounded-lg shadow bg-gray-100 w-1/2 h-1/2">
            <img className="object-cover w-1/3 h-full rounded-s-lg" src={loginImage} alt="Login Image"/>
            <div className="flex-1 w-2/3 h-full">
                <LoginFrom/>
            </div>
        </div>
    );
}

export default Login;

