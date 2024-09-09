import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";
import TestPage from "./Pages/TestPage";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ForgetPage from "./Pages/Login/ForgetPage.jsx";
import ResetPage from "./Pages/Login/ResetPage.jsx";
import ResetSuccPage from "./Pages/Login/ResetSuccPage.jsx";
import SignUpPage1 from "./Pages/SignUp/SignUpPage1.jsx";
import SignUpPage2 from "./Pages/SignUp/SignUpPage2.jsx";
import SignSuccPage from "./Pages/SignUp/SignSuccPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
// import ProfilePage from "./Pages/Login/ProfilePage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<div>Root route</div>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/forget" element={<ForgetPage />} />
            <Route path="/login/reset" element={<ResetPage />} />
            <Route path="/login/setSucc" element={<ResetSuccPage />} />
            <Route path="/signUp" element={<SignUpPage1 />} />
            <Route path="/signUp/next" element={<SignUpPage2 />} />
            <Route path="/signUp/signSucc" element={<SignSuccPage />} />
            {/* <Route path="/login/ProfilePage" element={<ProfilePage />} /> */}
        </>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
