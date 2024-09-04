import { useContext, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { Button } from "flowbite-react";

function PatientComponent({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Some Patient Component
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default PatientComponent;