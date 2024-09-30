"use client";
import Logo from '../../assets/logo.jpg'
import {Button, Navbar} from "flowbite-react";
import {useNavigate, useLocation} from "react-router-dom";

function PageNavbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/signUp');
    }

    const landingPageNavigationLinks = {
        "Home": "/",
        "About": "/about",
        "Contact": "/contact"
    }

    return (
        <Navbar fluid rounded className='w-screen h-24'>
            <Navbar.Brand href="/" className='ml-14'>
                <img src={Logo} className="h-12" alt="Logo"/>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button pill size="lg" onClick={handleLogin} className="px-3 mr-8 bg-cyan-500">Login</Button>
                <Button pill size="lg" color="cyan" onClick={handleSignUp} className="mr-20 text-cyan-400">Sign
                    Up</Button>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
            {Object.keys(landingPageNavigationLinks).map((key, value) => {

                    const link = landingPageNavigationLinks[key]
                    if (link === pathname) {
                        return (<Navbar.Link href={landingPageNavigationLinks[key]} key={value} active className="text-lg font-bold"> {key} </Navbar.Link>)
                    }
                    return <Navbar.Link href={landingPageNavigationLinks[key]} key={value} className="text-lg"> {key} </Navbar.Link>
                })}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default PageNavbar
