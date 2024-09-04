import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";

function ViewConsultationDetailsPage({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            View Consultation Details Page
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default ViewConsultationDetailsPage;