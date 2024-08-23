"use client";
import {Button, Card} from "flowbite-react";
import { TiTick } from "react-icons/ti";
import {useNavigate} from "react-router-dom";

function SignUpSucc() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    };

    return (
        <div>
            <Card className='flex flex-col items-center'
                  style={{width: '1000px', height: '600px'}}>
                <div className='flex justify-center mb-4'>
                    <TiTick color='cyan' className='w-64 h-64' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">Your patient account has been created!</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Login to Your Account</Button>
            </Card>
        </div>
    )
}

export default SignUpSucc;

