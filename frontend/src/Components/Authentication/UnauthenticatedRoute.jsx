import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "flowbite-react";

function UnauthenticatedRoute({ children }) {
    const { token, logout } = useContext(AuthContext);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.get("/api/authentication/verifyToken", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    const user = jwtDecode(token);
                    setAuthenticated(true);
                }
                else {
                    logout();
                }
                setLoading(false);
            })
            .catch((err) => {
                logout();
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [token, logout]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="w-12 h-12 text-primary-500" />
            </div>
        );
    } 
    if (authenticated) {
        const user = jwtDecode(token);
        if (user.role == "System Admin") {
            return <Navigate to="/systemAdmin/doctorManagement" />;
        } else if (user.role == "Doctor") {
            return <Navigate to="/doctor" />;
        } else if (user.role == "Patient") {
            return <Navigate to="/patient" />;
        }
    } else {
        // If not authenticated, render the children (unauthenticated route content)
        return children;
    }
    
}

export default UnauthenticatedRoute;