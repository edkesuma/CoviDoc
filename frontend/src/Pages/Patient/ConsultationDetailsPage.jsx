import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Authentication/AuthContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";
// components
import ActorNavbar from "../../Components/ActorNavbar.jsx";
import ViewPDF from "../../Components/Patient/ViewPDF.jsx";

function ConsultationDetailsPage() {
    const { token } = useContext(AuthContext);
    const { consultationId } = useParams();
    const [viewData, setViewData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const generateReportAndFetchData = () => {
        if (token && consultationId) {
            axios.get(`/api/patient/viewReportPage`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    "consultationId": consultationId
                }
            })
                .then((response) => {
                    setViewData(response.data.data);
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        generateReportAndFetchData();
    }, [token, consultationId]);

    return isLoading ? (
        <div className="text-center text-8xl">
            <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
    ) : (   <div>
            <ActorNavbar/>
            <div className='mb-10'/>
            <ViewPDF viewData={viewData}/>
        </div>
    )
}

export default ConsultationDetailsPage;