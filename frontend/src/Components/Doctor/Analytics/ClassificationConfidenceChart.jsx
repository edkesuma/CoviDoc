import React, {useEffect, useState} from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

function ClassificationConfidenceChart({token}) {
    const [confidenceCounts, setConfidenceCounts] = useState({});
    const [chartWidth, setChartWidth] = useState(window.innerWidth > 768 ? 500 : 300);

    useEffect(() => {
        const fetchConfidenceCounts = async () => {
            try {
                // Fetch precomputed classification confidence counts from the backend
                const response = await axios.get("/api/doctor/getClassificationConfidenceCounts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Update state with the confidence counts
                setConfidenceCounts(response.data.confidenceCounts);
            } catch (error) {
                console.error("Error fetching classification confidence counts:", error);
            }
        };

        fetchConfidenceCounts();
    }, [token]);

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth > 768 ? 500 : 300);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const series = Object.values(confidenceCounts); // Extracting the counts of classification confidences
    const categories = Object.keys(confidenceCounts); // Extracting the confidence levels

    return (
            <ApexCharts
                options={{
                    chart: {
                        type: "pie",
                    },
                    labels: categories,
                    title: {
                        text: "Classification Confidence Levels",
                    },
                }}
                series={series}
                type="pie"
                width={chartWidth}
            />
    );
}

export default ClassificationConfidenceChart;
