import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button, Spinner } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";
import axios from "axios";
import PatientDetail from "../../Components/Doctor/Consultation/PatientDetail"; // Ensure the path is correct

function PatientAccountPage() {
  const { token, logout } = useContext(AuthContext);
  const [patientProfile, setPatientProfile] = useState(null); // Store patient profile
  const [isLoading, setIsLoading] = useState(true); // Loading state for API

  // Fetch patient's profile when the component mounts
  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await axios.get("/api/patient/getPatientProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientProfile(response.data.patient); // Store the profile data
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching patient profile:", error);
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPatientProfile();
    }
  }, [token]);

  // If the page is still loading, show a spinner
  if (isLoading) {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <ActorNavbar />
      <div className="container mx-auto px-4 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>

        {/* Profile Section */}
        {patientProfile && <PatientDetail patientDetails={patientProfile} />} {/* Pass the profile data to PatientDetail */}

        {/* Password Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Password and Authentication</h2>
          <Button className="bg-cyan-400 text-white">Change Password</Button>
        </div>

        {/* Logout Button */}
        <div className="mt-9 space-y-4">
            <div className="mt-10 space-y-4">
                <h2 className="font-bold text-xl text-gray-400">ACCOUNT REMOVAL</h2>
            </div>
            <h1 className="text-gray-400 ">Deleting your account means that you will lose all data stored in your current account after taking this action</h1>
          <Button onClick={() => deleteAccount()} className="bg-red-500 text-white">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PatientAccountPage;
