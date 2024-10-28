import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button, Spinner } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";
import axios from "axios";
import ViewAccountDetails from "../../Components/Patient/ViewAccountDetails";
import ChangePatientPasswordModal from "../../Components/Patient/ChangePatientPasswordModal";
import DeletePatientAccountConfirmationModal from "../../Components/Patient/DeletePatientAccountConfirmationModal"; // Import the DeleteAccountModal

function PatientAccountPage() {
  const { token, logout } = useContext(AuthContext);
  const [patientProfile, setPatientProfile] = useState(null); // Store patient profile
  const [isLoading, setIsLoading] = useState(true); // Loading state for API
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Modal state for password change
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false); // Modal state for account deletion
  const [errorMessage, setErrorMessage] = useState(null); // Error message state

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
      <div className="mt-12 mx-20 px-6 sm:px-8 md:px-10 lg:px-12">
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>

        {/* spinner when loading */}
        {isLoading ? (
          <div className="flex">
            <Spinner aria-label="Center-aligned spinner" size="xl" />
          </div>
        ) : (
          patientProfile && <ViewAccountDetails patientDetails={patientProfile} />
        )}

        <div className="p-7"></div>

        {/* Password Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Password and Authentication</h2>
          <button 
            className="px-6 py-2 border border-cyan-400 bg-cyan-400 text-white rounded hover:bg-cyan-600 hover:border-cyan-600 transition duration-300"
            onClick={() => setIsPasswordModalOpen(true)} // Open password modal
          >
            Change Password
          </button>
        </div>

        {/* Render Change Password Modal */}
        {isPasswordModalOpen && (
          <ChangePatientPasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)} // Close the modal when necessary
          />
        )}

        <div className="p-7"></div>

        {/* Account Removal Section */}
        <div>
          <p className="font-semibold text-2xl mb-1">ACCOUNT REMOVAL</p>
          <p className="text-gray-600 mb-4">
            Deleting your account means that you will lose all data stored in your current account after taking this action.
          </p>
          <button
            onClick={() => setIsDeletePromptOpen(true)} // Open delete account prompt
            className="px-8 py-2 border border-red-500 bg-red-500 text-white rounded hover:bg-red-700 hover:border-red-700 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      </div>

      <div className="p-10"></div>

      {/* Render Delete Account Modal */}
      {isDeletePromptOpen && (
        <DeletePatientAccountConfirmationModal
          isOpen={isDeletePromptOpen}
          onClose={() => setIsDeletePromptOpen(false)} // Close the modal if cancel is clicked
        />
      )}

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
    </div>
  );
}

export default PatientAccountPage;
