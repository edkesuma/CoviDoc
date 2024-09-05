"use client";
import {Button, Card} from "flowbite-react";
import { MdCancel } from "react-icons/md";
import {useNavigate, useLocation} from "react-router-dom";

function SignUpFail() {
    const location = useLocation();
    const navigate = useNavigate();

    const message = location.state.message;
    const handleClick = () => {
        navigate('/signUp')
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className='flex flex-col items-center'
                  style={{width: '40vw', height: '50vh'}}>
                <div className='flex justify-center mb-4'>
                    <MdCancel color='#ff0000' className='w-24 h-24' alt="Error"/>
                </div>
                <p className="text-center text-2xl">Error occured in Account Creation.</p>
                <p className="mb-4 text-center text-xl">Reason: {message}</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Go back to Sign Up</Button>
            </Card>
        </div>
    )
}

export default SignUpFail;

