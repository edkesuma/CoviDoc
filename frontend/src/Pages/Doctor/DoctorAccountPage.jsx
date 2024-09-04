import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";

function DoctorAccountPage({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Doctor Account Page
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default DoctorAccountPage;