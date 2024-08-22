import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Outlet,
} from "react-router-dom";
import TestPage from "./Pages/TestPage";
import { EmailProvider } from "./Components/Login/EmailContext.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ForgetPage from "./Pages/Login/ForgetPage.jsx";
import ResetPage from "./Pages/Login/ResetPage.jsx"
import ResetSuccPage from "./Pages/Login/ResetSuccPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainPage/>}>
            <Route index element={<div>Root route</div>}/>
            <Route path="test" element={<TestPage />} />
            <Route path="login" element={<EmailProviderWrapper/>}>
                <Route index element={<LoginPage />} />
                <Route path="forget" element={<ForgetPage />} />
                <Route path="reset" element={<ResetPage />} />
                <Route path="setSucc" element={<ResetSuccPage />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

function MainPage(){
    return(
        <Outlet />
    )
}

function EmailProviderWrapper() {
    return (
        <EmailProvider>
            <Outlet />
        </EmailProvider>
    );
}

