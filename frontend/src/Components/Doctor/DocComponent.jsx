import { useContext, useEffect } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button } from "flowbite-react";

function DocComponent({}) {
    const { token, logout } = useContext(AuthContext);
    useEffect(() => {
        console.log("token", token);
    }, []);
    return (
        <div>
            Some Doctor Component
            <Button onClick={() => logout()}>LOGOUT</Button>
        </div>
    );
}

export default DocComponent;