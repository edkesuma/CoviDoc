import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";

function PatientManagement({}) {
    const { token } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Patient Management
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default PatientManagement;