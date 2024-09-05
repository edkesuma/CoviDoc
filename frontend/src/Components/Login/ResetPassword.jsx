"use client";
import {Button, Card, Label, TextInput} from "flowbite-react";
import {useNavigate, Link, useLocation} from 'react-router-dom';
import React, {useState} from "react";

function ResetPassword() {
    const location = useLocation();
    const {email} = location.state;
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigate = useNavigate();
    const [message,setMessage] = useState('\u00A0');

    const handleClick = () => {
        if (!password) {
            setMessage('\u00A0')
        }
        else if (password == rePassword){
            navigate('/login/setSucc');
        }else {
            setMessage('The confirmation password does not match.')
        }
    };

    return (
        <div>
            <Card className='flex justify-center items-center'
                  style={{width: '1000px', height: '600px'}}>
                    <div className='flex flex-col justify-center text-center'>
                        <p className="text-4xl font-bold mb-8"
                           style={{width: '750px'}}
                        >Reset Your Password</p>
                        <div className="mb-4">
                            <div className="block text-left">
                                <Label htmlFor="password" value="Enter new password" className="text-xl"/>
                            </div>
                            <TextInput id="password" type="password" required value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <div className="block text-left">
                                <Label htmlFor="rePasswrod" value="Confirm new password" className="text-xl"/>
                            </div>
                            <TextInput id="rePasswrod" type="password" required value={rePassword}
                                       onChange={(e) => setRePassword(e.target.value)}/>
                        </div>
                        <div className="text-left mb-8 text-red-400 text-xl">{message}</div>
                        <Button onClick={handleClick} className='bg-cyan-500 mb-4'>Reset Password</Button>
                        <Link to="/login" className="text-red-400">Cancel</Link>
                    </div>
            </Card>
        </div>
    )
}

export default ResetPassword;