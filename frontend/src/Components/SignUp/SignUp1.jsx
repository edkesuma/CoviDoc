"use client";
import {Button, Label, TextInput} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import loginImage from '../../assets/login.jpg'
import {Link} from 'react-router-dom';
import React, {useState} from 'react';


function SignUp1({onNext, formData}) {
    const [email, setEmail] = useState(formData.email);
    const [password, setPassword] = useState(formData.password);
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('\u00A0');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one number and one special character
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(String(password));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setMessage('Invalid email format.');
            return;
        }
        if (!validatePassword(password)) {
            setMessage('Password must be at least 8 characters long and contain at least one number and one special character.');
            return;
        }
        if (password !== rePassword) {
            setMessage('The confirmation password does not match. Try again.');
            return;
        }
        onNext({email, password});
    };

    return (
        <div
            className="flex flex-row items-center rounded-lg shadow bg-gray-100"
            style={{width: '1000px', height: '600px'}}
        >
            <img className="object-cover w-1/3 h-full rounded-s-lg" src={loginImage} alt="Login Image"/>
            <div className="flex flex-col justify-center items-center w-2/3 h-full ">
                <div className="w-3/4">
                    <div className="flex flex-col items-center">
                        <div className="relative font-bold text-5xl pb-8">
                            <span
                                className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                            Sign Up
                        </div>
                        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email"/>
                                </div>
                                <TextInput id="email" type="email" placeholder="user@mail.com" required
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Create password"/>
                                </div>
                                <TextInput id="password" type="password" required value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="rePassword" value="Re-enter Password"/>
                                </div>
                                <TextInput id="rePassword" type="password" required value={rePassword}
                                           onChange={(e) => setRePassword(e.target.value)}/>
                            </div>
                            <div className="flex w-full">
                                <p className="text-red-500">{message}</p>
                            </div>
                            <Button type="submit" className='bg-cyan-500'>Next</Button>
                            <div className="text-center">Already have a account?
                                <Link to="/login" className="text-cyan-400"> Login here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp1;

