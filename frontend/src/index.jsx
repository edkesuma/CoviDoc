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
import {SignUpProvider} from "./Components/SignUp/SignUpContext.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ForgetPage from "./Pages/Login/ForgetPage.jsx";
import ResetPage from "./Pages/Login/ResetPage.jsx"
import ResetSuccPage from "./Pages/Login/ResetSuccPage.jsx";
import SignUpPage1 from "./Pages/SignUp/SignUpPage1.jsx";
import SignUpPage2 from "./Pages/SignUp/SignUpPage2.jsx";
import SignSuccPage from "./Pages/SignUp/SignSuccPage.jsx";

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
            <Route path='signUp' element={<SignUpProviderWrapper/>}>
                <Route index element={<SignUpPage1 />} />
                <Route path="next" element={<SignUpPage2 />} />
                <Route path="signSucc" element={<SignSuccPage/>}></Route>
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

function SignUpProviderWrapper() {
    return (
        <SignUpProvider>
            <Outlet/>
        </SignUpProvider>
    );
}