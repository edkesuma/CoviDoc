"use client";
import {Button, Card, Label, TextInput,} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from "react";
import axios from "axios";

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        // Custom email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');

        await axios.post("/api/authentication/resetPasswordEmail", { "email": email })
        .then((res) => {
            if (res.data.success) {
                navigate('/login/resetPassword/checkEmail', { state: { email } });
            } else {
                setError(res.data.message);
                return;
            }
        })
    };

    return (
        <div>
            <Card className='flex flex-row items-center rounded-lg shadow bg-gray-100 md:py-20'>
                <div className="flex w-full h-full items-center justify-center">
                    <div className='flex flex-col justify-center text-center w-3/4'>
                        <p className="text-4xl font-bold mb-8">Forgot Your Password?</p>
                        <p className="text-2xl mb-4">Please provide the email address that you used when you signed up
                            for your
                            account.</p>
                        <div className="mb-4">
                            <div className="block text-left">
                                <Label htmlFor="email" value="Email" className="text-xl"/>
                            </div>
                            <TextInput id="email" type="email" placeholder="user@mail.com" required={true} value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <p className="mb-4">We will send you an email that will allow you to reset your password.</p>
                        <Button onClick={handleClick} className='bg-cyan-500 mb-4'>Request Password Reset</Button>
                        <Link to="/login" className="text-cyan-400"> Back to Login</Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ForgetPassword;