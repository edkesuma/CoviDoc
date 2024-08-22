"use client";
import {Button, Card} from "flowbite-react";
import {useNavigate} from 'react-router-dom';
import PasswordImage from '../../assets/rePassword.jpg';


function ResetPassSucc() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <Card className='flex flex-col items-center'
                  style={{width: '1000px', height: '600px'}}>
                <div className='flex justify-center mb-4'>
                    <img src={PasswordImage} className='w-16 h-16' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">Your password has been reset.</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Back to Login</Button>
            </Card>
        </div>
    )
}

export default ResetPassSucc;
