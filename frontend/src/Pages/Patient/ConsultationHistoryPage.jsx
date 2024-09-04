import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";

function ConsultationHistoryPage({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Consultation History Page
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default ConsultationHistoryPage;