import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        // console.log(localStorage.getItem("token"));
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;