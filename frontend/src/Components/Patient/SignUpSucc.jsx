"use client";
import {Button, Card} from "flowbite-react";
import SignUpSuccImage from '../../assets/signUp.jpg';

function SignUpSucc() {
    const handleClick = () => {

    };

    return (
        <div>
            <Card className='flex flex-col items-center'
                  style={{width: '1000px', height: '600px'}}>
                <div className='flex justify-center mb-4'>
                    <img src={SignUpSuccImage} className='w-16 h-16' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">Your patient account has been created!</p>
                <Button onClick={handleClick} className='bg-cyan-500'>Login to Your Account</Button>
            </Card>
        </div>
    )
}

export default SignUpSucc;

