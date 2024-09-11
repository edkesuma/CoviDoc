import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "flowbite-react";

function PrivateRoute({ systemAdmin = false, doctor = false, patient = false, children }) {
    console.log("PrivateRoute rendered")
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
                    setAuthenticated(true);
                }
                else {
                    logout();
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                logout();
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [systemAdmin, doctor, patient, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner className="w-12 h-12 text-primary-500" />
            </div>
        );
    } 
    if (!authenticated || !token) {
        console.log("Authenticated state", authenticated);
        return <Navigate to="/login" />;
    } else {
        console.log("token", token);
        const user = jwtDecode(token);
        console.log("Decoded user on private route", user);
        if (user.role == "System Admin" && systemAdmin) {
            return children;
        } else if (user.role == "Doctor" && doctor) {
            return children;
        } else if (user.role == "Patient" && patient) {
            return children;
        } else {
            // If user is not authorized, redirect to home page
            return <Navigate to="/landing/home" />;
        }
    }
}

export default PrivateRoute;