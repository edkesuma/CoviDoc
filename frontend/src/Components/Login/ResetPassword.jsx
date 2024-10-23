"use client";
import {Button, Card, Label, TextInput, Modal} from "flowbite-react";
import {useNavigate, Link, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";

function ResetPassword() {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigate = useNavigate();
    const [message,setMessage] = useState('\u00A0');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            await axios.post("/api/authentication/verifyResetPasswordToken", { "resetToken": token })
            .then((res) => {
                if (!res.data.success) {
                    // Create popup for error with message and redirect back to login
                    setModalMessage(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setModalMessage('Token is invalid or expired.');
                setShowErrorModal(true);
            })
        };
        verifyToken();
        }, []);

    const handleCloseModal = () => {
        setShowErrorModal(false);
        navigate("/login/forget");
    }

    const resetPassword = async () => {
        await axios.patch("/api/authentication/resetPassword", 
            { "newPassword": password },
            { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then((res) => {
                if (res.data.success) {
                    navigate('/login/resetPasswordSuccess');
                } else {
                    setMessage(res.data.message);
                }
            })
        };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one number and one special character
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(String(password));
    };

    const handleClick = () => {
        if (!validatePassword(password)){
            setMessage('Password must be at least 8 characters long and contain at least one number and one special character.');
            return;
        } else if (password != rePassword) {
            setMessage('The confirmation password does not match. Try again.');
            return;
        } else {
            resetPassword();
        } 
    };

    return (
        <div>
            <Card className='flex flex-row items-center justify-center rounded-lg shadow bg-gray-100'>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col justify-center text-center w-3/4 md:py-8 md:px-12'>
                        <p className="text-4xl font-bold mb-8"
                        >Reset Your Password</p>
                        <p className="text-2xl mb-4">Please set up the new password and confirm the password for your
                            account.</p>
                        <div className="mb-4">
                            <div className="block text-left">
                                <Label htmlFor="password" value="Enter new password" className="text-xl"/>
                            </div>
                            <TextInput id="password" type="password" required value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <div className="block text-left">
                                <Label htmlFor="rePassword" value="Confirm new password" className="text-xl"/>
                            </div>
                            <TextInput id="rePassword" type="password" required value={rePassword}
                                       onChange={(e) => setRePassword(e.target.value)}/>
                        </div>
                        <div className="text-left mb-8 text-red-400 text-xl">{message}</div>
                        <Button onClick={handleClick} className='bg-cyan-500 mb-4'>Reset Password</Button>
                        <Link to="/login" className="text-red-400">Cancel</Link>
                    </div>
                </div>
            </Card>
            <Modal size="xl" show={showErrorModal} onClose={handleCloseModal}>
                <Modal.Header>
                    <p className="text-xl font-medium text-cyan-400 dark:text-white">Error Occured</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-lg text-gray-600 dark:text-gray-300 flex justify-center">{modalMessage}</p>
                        <Button className="w-full" onClick={handleCloseModal}>Return</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ResetPassword;