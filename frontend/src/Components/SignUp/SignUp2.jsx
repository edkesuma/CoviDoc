"use client";
import {Button, Label, TextInput, Select, Datepicker} from "flowbite-react";
import loginImage from '../../assets/login.jpg';
import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function SignUp2({onCreateAccount, formData}) {
    const [name, setName] = useState(formData.name);
    const [gender, setGender] = useState(formData.gender);
    const [dob, setDob] = useState(formData.dob);
    const [phone, setPhone] = useState(formData.phone);
    const [message, setMessage] = useState('\u00A0');

    const validatePhone = (phone) => {
        const re = /^[0-9]{8,15}$/;
        return re.test(String(phone));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !gender || !dob || !phone) {
            setMessage('All fields are required.');
            return;
        }
        if (!validatePhone(phone)) {
            setMessage('Invalid phone number format. It should be 8-15 digits.');
            return;
        }
        setMessage('\u00A0'); // Clear the message
        onCreateAccount({name, gender, dob, phone});
    };

    return (
        <div
            className="flex flex-row items-center rounded-lg shadow bg-gray-100"
            style={{width: '1000px', height: '600px'}}
        >
            <img className="hidden md:block object-cover w-1/3 h-full rounded-s-lg" src={loginImage} alt="Login Image"/>
            <div className="flex flex-col justify-center items-center w-full md:w-2/3 h-full ">
                <div className="w-3/4">
                    <div className="flex flex-col items-center">
                        <div className="relative text-5xl pb-8">
                <span
                    className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                            Sign Up
                        </div>
                        <form className="flex max-w-md flex-col gap-4 w-full" onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Full Name"/>
                                </div>
                                <TextInput id="name" placeholder="John Doe" required value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="gender" value="Gender"/>
                                </div>
                                <Select id="gender" required value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Select>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="dob" value="Date of Birth"/>
                                </div>
                                <Datepicker
                                    id="dob"
                                    selected={dob}
                                    onSelectedDateChanged={(date) => setDob(date)}
                                    defaultDate={new Date()}
                                    minDate={new Date(1900, 0, 1)}
                                    maxDate={new Date()}
                                    autoHide={true}
                                    showClearButton={false}
                                    showTodayButton={false}
                                    weekStart={7}
                                    placeholdertext="Select your date of birth"
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Phone number"/>
                                </div>
                                <TextInput id="phone" required value={phone} placeholder="12345678"
                                           onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="flex w-full">
                                <p className="text-red-500">{message}</p>
                            </div>
                            <Button type="submit" className='bg-cyan-500'>Create Account</Button>
                            <div className="flex justify-center">
                                <Link to="/signUp" className="text-cyan-400"> &lt; back</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp2;
