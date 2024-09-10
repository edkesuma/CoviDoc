"use client";
import Logo from '../../../../assets/logo.jpg'
import {Navbar} from "flowbite-react";
import { FaUser } from "react-icons/fa";

function ConsultationNavbar() {
    return (
        <Navbar fluid rounded className='w-screen h-24'>
            <Navbar.Brand href="/" className='ml-20'>
                <img src={Logo} className="h-16" alt="Logo"/>
            </Navbar.Brand>
            <div className="flex md:order-2 mr-20">
                <FaUser className="size-14" color='cyan'/>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/home" className="text-2xl"> Patients </Navbar.Link>
                <Navbar.Link href="/about" className="text-2xl"> Visualization </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default ConsultationNavbar
