"use client";
import Logo from '../assets/logo.jpg'
import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import { useContext, useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import { AuthContext } from './Authentication/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { FaUser } from 'react-icons/fa';

function ActorNavbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { logout, token } = useContext(AuthContext);
    const user = jwtDecode(token);
    const [imageError, setImageError] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const handleViewAccount = () => {
        if (user.role === "Doctor") {
            navigate('/doctor/account');
        }
        else if (user.role === "Patient") {
            navigate('/patient/account');
        }
    }

    const actorNavigationLinks = {
        "Doctor": {
            "Patients": "/doctor",
            "Visualizations": "/doctor/visualizations",
        },
        "Patient": {
            "Consultations": "/patient",
        },
        "System Admin": {
            "Doctors": "/systemAdmin/doctorManagement",
            "Patients": "/systemAdmin/patientManagement",
        }
    }

    return (
        <Navbar fluid rounded className='w-screen h-24'>
            <Navbar.Brand href="/landing/home" className='ml-14'>
                <img src={Logo} className="h-12" alt="Logo"/>
            </Navbar.Brand>

            <div className="flex md:order-2">
                <Dropdown
                label={
                    imageError || !user.profilePicture ? (
                        <FaUser className="size-10" color='cyan'/>
                    ) : (
                        <Avatar
                            alt = "User profile"
                            img = {user.profilePicture}
                            rounded
                            onError={() => setImageError(true)}
                        />
                    )
                }
                arrowIcon={false}
                inline
                >
                <Dropdown.Header>
                    <span className="block text-sm">{user.name}</span>
                    <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                {user.role !== "System Admin" && 
                    <div>
                        <Dropdown.Item onClick={handleViewAccount}> View Account </Dropdown.Item>
                        <Dropdown.Divider />
                    </div>
                }
                <Dropdown.Item className="text-red-500" onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                {Object.entries(actorNavigationLinks).map(([role, routes]) => {
                    if (token) {
                        
                        if (user.role === role) {
                            return Object.keys(routes).map((key, value) => {
                                const link = routes[key];
                                if (link === pathname) {
                                    return (<Navbar.Link href={routes[key]} key={value} active className="text-lg font-bold"> {key} </Navbar.Link>)
                                }
                                return <Navbar.Link href={routes[key]} key={value} className="text-lg"> {key} </Navbar.Link>
                            })
                        }
                    }
                })}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default ActorNavbar
