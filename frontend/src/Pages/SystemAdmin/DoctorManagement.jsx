import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";
import PageNavbar from "../../Components/Landing/PageNavbar";

function DoctorManagement({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            <ActorNavbar />
            {/* <PageNavbar /> */}
            Doctor Management
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default DoctorManagement;