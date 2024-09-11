import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";

function PatientListPage({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            <ActorNavbar />
            List of patients
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default PatientListPage;