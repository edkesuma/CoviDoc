"use client";
import Logo from '../../../../assets/logo.jpg'
import {Navbar} from "flowbite-react";
import { FaUser } from "react-icons/fa";

function ConNavbar() {
    return (
        <Navbar fluid rounded className='w-screen h-24'>
            <ConNavbar.Brand href="/" className='ml-20'>
                <img src={Logo} className="h-16" alt="Logo"/>
            </ConNavbar.Brand>
            <div className="flex md:order-2 mr-20">
                <FaUser className="size-14" color='cyan'/>
                <ConNavbar.Toggle/>
            </div>
            <ConNavbar.Collapse>
                <ConNavbar.Link href="/home" className="text-2xl"> Patients </ConNavbar.Link>
                <ConNavbar.Link href="/about" className="text-2xl"> Visualization </ConNavbar.Link>
            </ConNavbar.Collapse>
        </Navbar>
    );
}

export default ConNavbar
