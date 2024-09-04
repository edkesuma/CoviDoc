import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import AuthProvider from "./Components/Authentication/AuthContext.jsx";

// Development/Example only
import TestPage from "./Pages/Examples/TestPage";
import SearchPage from "./Pages/Examples/SearchPage.jsx";

// Login/Sign up pages
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ForgetPage from "./Pages/Login/ForgetPage.jsx";
import ResetPage from "./Pages/Login/ResetPage.jsx";
import ResetSuccPage from "./Pages/Login/ResetSuccPage.jsx";
import SignUpPage1 from "./Pages/SignUp/SignUpPage1.jsx";
import SignUpPage2 from "./Pages/SignUp/SignUpPage2.jsx";
import SignSuccPage from "./Pages/SignUp/SignSuccPage.jsx";

// Auth Wrappers
import UnauthenticatedRoute from "./Components/Authentication/UnauthenticatedRoute.jsx";
import PrivateRoute from "./Components/Authentication/PrivateRoute.jsx";

// Pages for actors
import DoctorManagement from "./Pages/SystemAdmin/DoctorManagement.jsx";
import PatientManagement from "./Pages/SystemAdmin/PatientManagement.jsx";
import DoctorAccountPage from "./Pages/Doctor/DoctorAccountPage.jsx";
import PatientDetailsPage from "./Pages/Doctor/PatientDetailsPage.jsx";
import PatientListPage from "./Pages/Doctor/PatientListPage.jsx";
import ViewConsultationDetailsPage from "./Pages/Doctor/ViewConsultationDetailsPage.jsx";
import VisualizationsPage from "./Pages/Doctor/VisualizationsPage.jsx";
import ConsultationHistoryPage from "./Pages/Patient/ConsultationHistoryPage.jsx";
import PatientAccountPage from "./Pages/Patient/PatientAccountPage.jsx";
import ConsultationDetailsPage from "./Pages/Patient/ConsultationDetailsPage.jsx";

// App entry point
ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter> 
            <Routes>
                {/* DEVELOPMENT/EXAMPLE ONLY routes */}
                <Route path="/test" element={<TestPage />} />
                <Route path="/search" element={<SearchPage />} />

                {/* Public routes */}
                <Route 
                    path="/" 
                    element={<div>Landing page</div>} 
                />
                <Route 
                    path="/login" 
                    element={
                        <UnauthenticatedRoute>
                            <LoginPage />
                        </UnauthenticatedRoute>
                    } 
                />
                <Route
                    path="/signup"
                    element={
                        <UnauthenticatedRoute>
                            <div>Sign up page</div>
                        </UnauthenticatedRoute>
                    }
                />
                {/* System Admin routes */}
                <Route
                    path="/systemAdmin/doctorManagement"
                    element={
                        <PrivateRoute systemAdmin>
                            <DoctorManagement />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/systemAdmin/patientManagement"
                    element={
                        <PrivateRoute systemAdmin>
                            <PatientManagement />
                        </PrivateRoute>
                    }
                />
                {/* Doctor routes */}
                <Route
                    path="/doctor"
                    element={
                        <PrivateRoute doctor>
                            <PatientListPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/account"
                    element={
                        <PrivateRoute doctor>
                            <DoctorAccountPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId"
                    element={
                        <PrivateRoute doctor>
                            <PatientDetailsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId"
                    element={
                        <PrivateRoute doctor>
                            <ViewConsultationDetailsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/visualizations"
                    element={
                        <PrivateRoute doctor>
                            <VisualizationsPage />
                        </PrivateRoute>
                    }
                />
                {/* Patient routes */}
                <Route
                    path="/patient"
                    element={
                        <PrivateRoute patient>
                            <ConsultationHistoryPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/patient/account"
                    element={
                        <PrivateRoute patient>
                            <PatientAccountPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/patient/consultation/:consultationId"
                    element={
                        <PrivateRoute patient>
                            <ConsultationDetailsPage />
                        </PrivateRoute>
                    }
                />

                {/* to be deleted */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/forget" element={<ForgetPage />} />
                <Route path="/login/reset" element={<ResetPage />} />
                <Route path="/login/setSucc" element={<ResetSuccPage />} />
                <Route path="/signUp" element={<SignUpPage1 />} />
                <Route path="/signUp/next" element={<SignUpPage2 />} />
                <Route path="/signUp/signSucc" element={<SignSuccPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
