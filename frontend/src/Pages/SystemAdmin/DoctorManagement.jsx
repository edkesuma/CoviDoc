import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";

function DoctorManagement({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Doctor Management
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default DoctorManagement;