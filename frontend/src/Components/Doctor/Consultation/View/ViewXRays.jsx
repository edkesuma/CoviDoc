import {Card} from "flowbite-react";
import React from "react";

function ViewXrays({xRays, setDetail}) {
    function formatDateString(dateString) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    }

    const sortedXrays = [...xRays].sort((a, b) => {
        if (a.prescriptions == null && b.prescriptions != null) {
            return -1;
        }
        if (a.prescriptions != null && b.prescriptions == null) {
            return 1;
        }
        const dateA = new Date(formatDateString(a.consultationDate));
        const dateB = new Date(formatDateString(b.consultationDate));
        return dateB - dateA;
    });

    function analysisPrescriptions(str) {
        let jsonString = str.replace(/\\"/g, '"');
        let jsonArray = JSON.parse(jsonString);
        let resultArray = jsonArray.map(item => '• ' + item.prescriptionName[0] + '.');
        let resultString = resultArray.join('\n');
        return resultString
    }

    return (
        <div className="mx-5 md:mx-20 space-y-4">
            {sortedXrays.length != 0 ? (
                sortedXrays.map((xRay, index) => (
                    <Card
                        key={index}
                        className={`hover:shadow-md transition duration-300 ${
                            xRay.prescriptions == null
                                ? 'border-2 border-red-500 bg-gray-200 hover:bg-gray-300'
                                : 'hover:bg-gray-200'
                        }`}
                        onClick={() => {
                            if (xRay.prescriptions == null) {
                                setDetail(false); // direct to Consultation Record tab
                            }
                        }}
                    >
                        <div className='flex flex-col'>
                            {xRay.prescriptions != null ? (
                                <p className='text-xl font-bold'>Consultation
                                    #{xRay.consultationId} - {xRay.consultationDate}</p>
                            ) : (
                                <p className='text-xl font-bold'>Consultation #{xRay.consultationId} </p>
                            )}

                            <div className='flex flex-col md:flex-row my-4 items-center'>
                                <div className='w-11/12 md:w-3/5 bg-gray-400 flex flex-row justify-center my-4 mx-4'>
                                    <div className='w-1/2 flex justify-center'>
                                        <img src={xRay.xrayImageUrl} alt='x'/>
                                    </div>
                                    <div className='w-1/2 flex justify-center'>
                                        <img src={xRay.highlightedXrayImageUrl} alt='y' className='h-full'/>
                                    </div>
                                </div>
                                <div className='w-full md:w-2/5'>
                                    {xRay.prescriptions == null ? (
                                        <div
                                            className='flex justify-center items-center border-2 border-cyan-400 rounded-lg px-4 py-4 mx-4 h-64 overflow-y-auto bg-gray-200'>
                                            <p className='text-xl'>Workflow not completed yet.<br/>
                                            <span className="text-red-500 font-bold">Click to return to the "Consultation Record" tab.</span></p>
                                        </div>
                                    ) : (
                                        <div>
                                            {
                                                xRay.classification == 'Healthy' ? (
                                                    <div className='border-2 border-cyan-400 rounded-lg px-4 py-4 mx-4 h-64 overflow-y-auto bg-white'>
                                                        <p>Classification: {xRay.classification}</p>
                                                        <p>Classification
                                                            Confidence: {xRay.classificationConfidence}%</p>
                                                        <p>Severity: {xRay.severity}</p>
                                                        <p>Severity Confidence: {xRay.severityConfidence}%</p>
                                                        <br/>
                                                        {xRay.prescriptions}
                                                    </div>
                                                ) : (
                                                    <div className='border-2 border-cyan-400 rounded-lg px-4 py-4 mx-4 h-64 overflow-y-auto whitespace-pre-wrap bg-white'>
                                                        <p>Classification: {xRay.classification}</p>
                                                        <p>Classification Confidence: {xRay.classificationConfidence}%</p>
                                                        <p>Severity: {xRay.severity}</p>
                                                        <p>Severity Confidence: {xRay.severityConfidence}%</p>
                                                        <br/>
                                                        {analysisPrescriptions(xRay.prescriptions)}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <p className="flex justify-center items-center h-20 bg-gray-200 text-black m-0">
                    No X-Rays yet
                </p>
            )}

        </div>
    );
}

export default ViewXrays;

