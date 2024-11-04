import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import AuthProvider from "./Components/Authentication/AuthContext.jsx";

// Login/Sign up pages
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ForgetPage from "./Pages/Login/ForgetPage.jsx";
import ResetPage from "./Pages/Login/ResetPage.jsx";
import ResetSuccPage from "./Pages/Login/ResetSuccPage.jsx";
import SignUpFlow from "./Pages/SignUp/SignUpFlow.jsx";
import CheckEmailPage from "./Pages/Login/CheckEmailPage.jsx";
import ResetFailPage from "./Pages/Login/ResetFailPage.jsx";

// Auth Wrappers
import UnauthenticatedRoute from "./Components/Authentication/UnauthenticatedRoute.jsx";
import PrivateRoute from "./Components/Authentication/PrivateRoute.jsx";

// Pages for actors
// doctor pages
import PatientListPage from "./Pages/Doctor/PatientListPage.jsx";
import CreateConsultationPage from "./Pages/Doctor/CreateConsultationPage.jsx";
import ModelPredictionPage from "./Pages/Doctor/ModelPredictionPage.jsx";
import LLMResultPage from "./Pages/Doctor/LLMResultPage.jsx";
import DoctorViewPatientPage from "./Pages/Doctor/DoctorViewPatientPage.jsx";
import ViewPDFPage from "./Pages/Doctor/ViewPDFPage.jsx";
import DoctorAccountPage from "./Pages/Doctor/DoctorAccountPage.jsx";
import VisualizationsPage from "./Pages/Doctor/VisualizationsPage.jsx";

// patient pages
import ConsultationHistoryPage from "./Pages/Patient/ConsultationHistoryPage.jsx";
import ConsultationDetailsPage from "./Pages/Patient/ConsultationDetailsPage.jsx";
import PatientAccountPage from "./Pages/Patient/PatientAccountPage.jsx";

// system admin pages
import DoctorManagement from "./Pages/SystemAdmin/DoctorManagement.jsx";
import PatientManagement from "./Pages/SystemAdmin/PatientManagement.jsx";

// landing pages
import HomePage from "./Pages/Landing/HomePage.jsx";
import ProductPage from "./Pages/Landing/ProductPage.jsx";
import PricingPage from "./Pages/Landing/PricingPage.jsx";
import AboutPage from "./Pages/Landing/AboutPage.jsx";
import ContactPage from "./Pages/Landing/ContactPage.jsx";


// App entry point
ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                {/* Landing pages */}
                <Route
                    path="/"
                    element={<HomePage/>}
                />
                <Route
                    path="/product"
                    element={<ProductPage/>}
                />
                <Route
                    path="/pricing"
                    element={<PricingPage/>}
                />
                <Route
                    path="/about"
                    element={<AboutPage/>}
                />
                <Route
                    path="/contact"
                    element={<ContactPage/>}
                />

                {/* Login, sign up pages */}
                <Route
                    path="/login"
                    element={
                        <UnauthenticatedRoute>
                            <LoginPage/>
                        </UnauthenticatedRoute>
                    }
                />
                <Route
                    path="/login/forget"
                    element={<ForgetPage />}
                />
                <Route
                    path="/login/resetPassword/checkEmail"
                    element={<CheckEmailPage />}
                />
                <Route
                    path="/login/resetPassword/:token"
                    element={<ResetPage />}
                />
                <Route
                    path="/login/resetPasswordSuccess"
                    element={<ResetSuccPage />}
                />
                <Route
                    path="login/resetPasswordFail"
                    element={<ResetFailPage />}
                />

                <Route
                    path="/signup/*"
                    element={
                        <UnauthenticatedRoute>
                            <SignUpFlow/>
                        </UnauthenticatedRoute>
                    }
                />
                {/* System Admin routes */}
                <Route
                    path="/systemAdmin/doctorManagement"
                    element={
                        <PrivateRoute systemAdmin>
                            <DoctorManagement/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/systemAdmin/patientManagement"
                    element={
                        <PrivateRoute systemAdmin>
                            <PatientManagement/>
                        </PrivateRoute>
                    }
                />
                {/* Doctor routes */}
                <Route
                    path="/doctor"
                    element={
                        <PrivateRoute doctor>
                            <PatientListPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/account"
                    element={
                        <PrivateRoute doctor>
                            <DoctorAccountPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId"
                    element={
                        <PrivateRoute doctor>
                            <DoctorViewPatientPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId/classification"
                    element={
                        <PrivateRoute doctor>

                            <ModelPredictionPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId/newClassification"
                    element={
                        <PrivateRoute doctor>
                            <CreateConsultationPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId/additionalInfo"
                    element={
                        <PrivateRoute doctor>
                            <LLMResultPage />

                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId/pdf"
                    element={
                        <PrivateRoute doctor>
                            <ViewPDFPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/visualizations"
                    element={
                        <PrivateRoute doctor>
                            <VisualizationsPage/>
                        </PrivateRoute>
                    }
                />
                {/* Patient routes */}
                <Route
                    path="/patient"
                    element={
                        <PrivateRoute patient>
                            <ConsultationHistoryPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/patient/account"
                    element={
                        <PrivateRoute patient>
                            <PatientAccountPage/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/patient/consultation/:consultationId"
                    element={
                        <PrivateRoute patient>
                            <ConsultationDetailsPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);