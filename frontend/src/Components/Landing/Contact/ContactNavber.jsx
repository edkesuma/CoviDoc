"use client";
import Logo from '../../../assets/logo.jpg'
import {Button, Navbar} from "flowbite-react";
import {useNavigate} from "react-router-dom";

function ContactNavber() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/signUp');
    }

    return (
        <Navbar fluid rounded className='h-24'>
            <Navbar.Brand href="/" className='ml-20'>
                <img src={Logo} className="h-16" alt="Logo"/>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button pill size="lg" onClick={handleLogin} className="px-3 mr-8 bg-cyan-500">Login</Button>
                <Button pill size="lg" color="cyan" onClick={handleSignUp} className="mr-20 text-cyan-400">Sign
                    Up</Button>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/home" className="text-2xl"> Home </Navbar.Link>
                <Navbar.Link href="/about" className="text-2xl">About</Navbar.Link>
                <Navbar.Link href="/contact" active className="text-2xl text-cyan-400">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default ContactNavber
