"use client";
import {Button, Card, Label, TextInput,} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import {useEmail} from './EmailContext.jsx';
import {Link} from 'react-router-dom';
import React, {useState} from "react";

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {setInputEmail} = useEmail();

    const handleClick = () => {
        if (email) {
            setInputEmail(email);
            navigate('/login/reset');
        }
    };

    return (
        <div>
            <Card className='flex justify-center items-center'
                  style={{width: '1000px', height: '600px'}}>
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
                            <TextInput id="email" type="email" placeholder="name@flowbite.com" required value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
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