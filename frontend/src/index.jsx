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
import SignUpFlow from "./Pages/SignUp/SignUpFlow.jsx";

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
import AboutPage from "./Pages/Landing/AboutPage.jsx";
import ContactPage from "./Pages/Landing/ContactPage.jsx";
import HomePage from "./Pages/Landing/HomePage.jsx";
import ViewFindingPage from "./Pages/Doctor/ViewFindingPage.jsx";
import ViewPDFPage from "./Pages/Doctor/ViewPDFPage.jsx";
import DoctorViewPatientPage from "./Pages/Doctor/DoctorViewPatientPage.jsx";
import DoctorEditAccountModal from "./Components/Doctor/DoctorEditAccountModal.jsx";

// App entry point
ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter> 
            <Routes>
                {/* DEVELOPMENT/EXAMPLE ONLY routes */}
                <Route path="/test" element={<TestPage />} />
                <Route path="/search" element={<SearchPage />} />

                {/* Public routes */}
                {/* Landing pages */}
                <Route
                    path="/landing/home"
                    element={<HomePage />}
                />
                <Route 
                    path="/landing/about" 
                    element={<AboutPage />} 
                />
                <Route 
                    path="/landing/contact" 
                    element={<ContactPage />}
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
                    path="/signup/*"
                    element={
                        <UnauthenticatedRoute>
                            <SignUpFlow />
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
                            <DoctorViewPatientPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doctor/patient/:patientId/:consultationId"
                    element={
                        <PrivateRoute doctor>
                            <ViewFindingPage />
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
                <Route path="/login/forget" element={<ForgetPage />} />
                <Route path="/login/reset" element={<ResetPage />} />
                <Route path="/login/setSucc" element={<ResetSuccPage />} /> 
                
                {/* <Route path="/test/doc/viewfinding" element={} /> */}
                <Route path="/test/doc/viewpdf" element={<ViewPDFPage />} />
                <Route path="/test/doc/consultationPage" element={<DoctorViewPatientPage />} />
                <Route path="/test/doc/editAccountModal" element={<DoctorEditAccountModal />} />

                <Route path="/test/doc/account" element={<DoctorAccountPage />} />
                <Route path="/test/doc/patientdetails" element={<PatientDetailsPage />} />
                <Route path="/test/doc/patientlist" element={<PatientListPage />} />
                <Route path="/test/doc/consultationdetails" element={<ViewConsultationDetailsPage />} />
                <Route path="/test/doc/visualizations" element={<VisualizationsPage />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);