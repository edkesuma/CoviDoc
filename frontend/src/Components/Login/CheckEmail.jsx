"use client";
import {Card} from "flowbite-react";
import { MdEmail } from "react-icons/md";
import {useLocation} from 'react-router-dom';


function CheckEmail() {
    const location = useLocation();
    const { email } = location.state;

    return (
        <div>
            <Card className='flex flex-col items-center md:py-16 md:px-72'>
                <div className='flex justify-center mb-4'>
                    <MdEmail color='cyan' className='w-64 h-64' alt="Success"/>
                </div>
                <p className="mb-4 text-center text-2xl">An email has been sent to {email}. Please click the link on the email to continue.</p>
            </Card>
        </div>
    )
}

export default CheckEmail;
