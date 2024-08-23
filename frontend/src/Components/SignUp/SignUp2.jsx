"use client";
import { Button, Label, TextInput, Select, Datepicker } from "flowbite-react";
import loginImage from '../../assets/login.jpg';
import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSignUp} from "./SignUpContext.jsx";

function SignUpFrom() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState(null); 
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const {inputEmail,inputPassword} = useSignUp()

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/signUp/signSucc');
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative font-bold text-5xl pb-8">
                <span className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                Sign Up
            </div>
            <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fullName" value="Full Name" />
                    </div>
                    <TextInput id="fullName" placeholder="John Dow" required value={fullName}
                               onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="gender" value="Gender" />
                    </div>
                    <Select id="gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birth" value="Date of Birth" />
                    </div>
                    <Datepicker
                        id="birth"
                        selected={birth}
                        onSelectedDateChanged={(date) => setBirth(date)}
                        defaultDate={new Date()}
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date()}
                        autoHide={true}
                        showClearButton={false}
                        showTodayButton={false}
                        weekStart={7}
                        placeholderText="Select your birth date"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone number" />
                    </div>
                    <TextInput id="phone" required value={phone}
                               onChange={(e) => setPhone(e.target.value)} />
                </div>
                <Button type="submit" className='bg-cyan-500'>Create Account</Button>
                <div className="flex justify-center">
                    <Link to="/signUp" className="text-cyan-400"> &lt; back</Link>
                </div>
            </form>
        </div>
    );
}

function SignUp2() {
    return (
        <div
            className="flex flex-row items-center rounded-lg shadow bg-gray-100"
            style={{width: '1000px', height: '600px'}}
        >
            <img className="object-cover w-1/3 h-full rounded-s-lg" src={loginImage} alt="Login Image"/>
            <div className="flex flex-col justify-center items-center w-2/3 h-full ">
                <div className="w-3/4">
                    <SignUpFrom/>
                </div>
            </div>
        </div>
    );
}

export default SignUp2;
