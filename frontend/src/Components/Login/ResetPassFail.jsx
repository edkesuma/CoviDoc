"use client";
import {Button, Card} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import { MdError } from "react-icons/md";


function ResetPassFail({ message }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login/forget');
    };

    return (
        <div>
            <Card className='flex flex-col items-center md:py-16 md:px-72'>
                <div className='flex justify-center mb-4'>
                    <MdError className='w-64 h-64 text-red-700' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">Password reset failed. Reason: {message}</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Back to Forget Password</Button>
            </Card>
        </div>
    )
}

export default ResetPassFail;
