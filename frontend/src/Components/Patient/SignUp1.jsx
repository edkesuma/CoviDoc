"use client";
import {Button, Label, TextInput} from "flowbite-react";
import loginImage from '../../assets/login.jpg'
import React, {useState} from 'react';


function SignUpFrom() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('\u00A0');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password==rePassword){
            setMessage('\u00A0')
        }else
            setMessage('The confirmation password does not match. Try again.')
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative text-5xl pb-8">
                <span className="absolute top-4 left-0 opacity-50 w-8 h-8 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
                Sign Up
            </div>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email"/>
                    </div>
                    <TextInput id="email" type="email" placeholder="name@flowbite.com" required value={email}
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
                <div>Already have a account?
                    <a href="#" className="text-cyan-400"> Login here</a>
                </div>
            </form>
        </div>
    );
}

function SignUp1() {
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

export default SignUp1;

