"use client";
import Results from "../../Components/Doctor/Consultation/View/Results.jsx";
import Suggested from "../../Components/Doctor/Consultation/View/Suggested.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button, Spinner} from "flowbite-react";
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewFindingPage() {
    const { token } = useContext(AuthContext);
    const { patientId, consultationId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [collectedData, setCollectedData] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [lifestyleChanges, setLifestyleChanges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && consultationId) {
            axios
                .put(`/api/doctor/getAIResults`, {
                    consultationId: consultationId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log("AI Results: ", response.data);
                    setCollectedData(response.data.collectedData);
                    setPrescriptions(JSON.parse(response.data.collectedData.suggestedPrescriptions))
                    setLifestyleChanges(JSON.parse(response.data.collectedData.suggestedLifestyleChanges))
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching AI results: ", error);
                });
        }
    }, [token, consultationId]);

    const convertLifestyleToJson = (text) => {
            return text
            .split('\n') // Split by newline
            .map(line => line.trim()) // Trim each line
            .filter(line => line.length > 0) // Filter out empty lines
            .map(line => ({ lifestyleChange: line.substring(2) })); // Map to JSON format, remove leading bullet point
    };

    const convertPrescriptionsToJson = (text) => {
        return text
            .split('\n') // Split by newline
            .map(line => line.trim()) // Trim each line
            .filter(line => line.length > 0) // Filter out empty lines
            .map(line => {
                const [firstElement, secondElement] = line.substring(2).split(':').map(part => part.trim());
                return { prescriptionName: [firstElement, secondElement] };
            }); // Map to JSON format, remove leading bullet point and split by colon
    };

    const generateReport = async () => {
        const lifestyleChangesJson = convertLifestyleToJson(lifestyleChanges)
        const prescriptionsJson = convertPrescriptionsToJson(prescriptions)

        const stringPrescriptions = JSON.stringify(prescriptionsJson)
        const stringLifestyleChanges = JSON.stringify(lifestyleChangesJson)

        console.log("Prescriptions: ", stringPrescriptions);
        console.log("Lifestyle Changes: ", stringLifestyleChanges);
        
        await axios.patch(`/api/doctor/updatePrescriptionsLifestyleChanges`, {
            "consultationId": consultationId,
            "prescriptions": stringPrescriptions,
            "lifestyleChanges": stringLifestyleChanges
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Updated prescriptions and lifestyle changes: ", response.data);
        })
        .catch((error) => {
            console.log("Error updating prescriptions and lifestyle changes: ", error);
        });

        await axios.put(`/api/doctor/generateReport`, {
            "consultationId": consultationId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Generated report: ", response.data);
            navigate(`/doctor/patient/${patientId}/${consultationId}/pdf`);
        })
    };

    return isLoading ? (
        <div className='flex flex-col items-center'>
            <div className="text-center text-8xl">
                <Spinner aria-label="Extra large spinner example" size="xl" />
                <p className='text-4xl'>Generating AI Results...</p>
            </div>
        </div>
        
    ) : (
        <div className='flex flex-col items-center'>
            <div>
                <ActorNavbar/>
                <div className='flex flex-row ml-20 items-center my-10'>
                    <IoArrowBackCircleOutline color='cyan' className='h-12 w-12'/>
                    <button className='text-4xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer'>Back
                    </button>
                </div>
                {/* Note: theres a bug here (rendering consultation info thats wrong but findings right) - maybe cuz of params */}
                <Results findings={collectedData.findings} consultationInfo={collectedData.consultationInfo} patientDetails={collectedData.patient}/>
                <div className='mb-36'/>
                <Suggested prescriptions={prescriptions} setPrescriptions={setPrescriptions} lifestyleChanges={lifestyleChanges} setLifestyleChanges={setLifestyleChanges} />
            </div>
            <Button onClick={generateReport} className='bg-cyan-400 w-2/3 my-10'>Generate Report</Button>
        </div>
    )
}

export default ViewFindingPage;