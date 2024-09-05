"use client";
import {Button, Card} from "flowbite-react";
import {useNavigate} from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";

function SignUpSucc() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className='flex flex-col items-center'
                  style={{width: '40vw', height: '50vh'}}>
                <div className='flex justify-center mb-4'>
                    <BsPatchCheckFill color='#6ee0fa' className='w-24 h-24' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">Your patient account has been created!</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Login to Your Account</Button>
            </Card>
        </div>
    )
}

export default SignUpSucc;

