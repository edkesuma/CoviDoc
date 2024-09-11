import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import ActorNavbar from "../../Components/ActorNavbar";
import { Button } from "flowbite-react";

function PatientManagement({}) {
    const { token } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            <ActorNavbar />
            Patient Management
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default PatientManagement;