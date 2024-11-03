import {useNavigate} from "react-router-dom";
import {Card} from "flowbite-react";
import {AiFillSafetyCertificate} from "react-icons/ai";
import {FaBriefcaseMedical} from "react-icons/fa";

function ViewConsultations({consultations}) {
    const navigate = useNavigate();

    function formatDateString(dateString) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    }

    const sortedConsultations = [...consultations].sort((a, b) => {
        const dateA = new Date(formatDateString(a.consultationDate));
        const dateB = new Date(formatDateString(b.consultationDate));
        return dateB - dateA;
    });


    return (
        <div className="space-y-4">
            <div className="flex ml-4 flex-row font-bold">
                <div className="w-1/12">Status</div>
                <div className="w-6/12 text-center md:text-left">Consultation ID</div>
                <div className="w-3/12">Doctor</div>
                <div className="w-3/12">Date</div>
            </div>
            {sortedConsultations.map((consultation, index) => (
                <Card
                    key={index}
                    className="hover:bg-gray-100 transition duration-300 ease-in-out"
                    onClick={() =>
                        navigate(`/patient/consultation/${consultation.consultationId}`)
                    }
                >
                    <div className="flex flex-row items-center">
                        <div className="w-1/12">
                            {consultation.status === "Healthy" ? (
                                <AiFillSafetyCertificate className="w-8 h-8 text-green-500"/>
                            ) : consultation.status === "Mild" ? (
                                <FaBriefcaseMedical className="w-8 h-8 text-yellow-300 font-bold"/>
                            ) : consultation.status === "Moderate to Severe" ? (
                                <FaBriefcaseMedical color="red" className="w-8 h-8 text-red-500"/>
                            ) : null}
                        </div>
                        <button className="w-6/12 text-left truncate">
                            Consultation #{consultation.consultationId}
                        </button>
                        <div className="w-3/12 truncate">
                            {consultation.doctorName}
                        </div>
                        <div className="w-3/12">{consultation.consultationDate}</div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ViewConsultations;