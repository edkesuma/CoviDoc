import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";

function PatientAccountPage({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            <ActorNavbar />
            Patient Account Page
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default PatientAccountPage;