import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext";
import { Button, Spinner } from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar";
import DocMainModal from "../../Components/Doctor/DocMainModal";
import axios from "axios";
import ChangeDoctorPasswordModal from "../../Components/Doctor/ChangeDoctorPasswordModal"; // Import the modal

function DoctorAccountPage() {
  const { token } = useContext(AuthContext);
  const [doctorProfile, setDoctorProfile] = useState(null); // Store doctor's profile
  const [isLoading, setIsLoading] = useState(true); // Loading state for API
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State for password modal

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get('/api/doctor/getDoctorProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctorProfile(response.data.doctor);
        setIsLoading(false);
      });
    } catch (error) {
      console.log("Error fetching doctor profile:", error);
      setIsLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    fetchDoctorProfile();
  }, [token]);

  useEffect(() => {
    console.log("Is loading", isLoading);
  }, [isLoading]);


  return (
    <div>
      <ActorNavbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>

        {/* spinner when loading */}
        {isLoading ? (
          <div className="flex">
            <Spinner aria-label="Center-aligned spinner" size="xl" />
          </div>
        ) : (
          doctorProfile && <DocMainModal doctorProfile={doctorProfile} />
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
        {isPasswordModalOpen && ( // Conditional rendering of the password modal
          <ChangeDoctorPasswordModal 
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)} // Close the modal when necessary
          />
        )}
      </div>
    </div>
  );
}

export default DoctorAccountPage;
