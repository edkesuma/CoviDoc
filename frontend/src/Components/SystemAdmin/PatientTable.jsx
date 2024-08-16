import { Table, Spinner } from "flowbite-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PatientTableRow from "./PatientTableRow";


function PatientTable(props) {
    const { token } = "aaaaaa"
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const getData = async () => {
        // sample data
        setData(
            [
                {
                    'patientName': 'John Doe',
                    'patientEmail': 'johndoe@gmail.com'
                },
                {
                    'patientName': 'Jane Doe',
                    'patientEmail': 'janedoe@gmail.com'
                },
                {
                    'patientName': 'Jane Joe',
                    'patientEmail': 'janejoe@gmail.com'
                }
            ]
        )

        await delay(2000);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    // Filter the data based on searchQuery
    const filteredData = data.filter(
        (patient) =>
            patient.patientName.toLowerCase().startsWith(props.searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-x-auto">
            <Table hoverable={props.hoverable}>
                <Table.Head>
                    <Table.HeadCell>Patient</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {isLoading &&
                        <Table.Row className="h-20 bg-gray-800">
                        <Table.Cell
                            colSpan={6}
                            className="w-full text-center"
                        >
                            <Spinner
                                size="xl"
                                aria-label="Center-aligned spinner example"
                            />
                        </Table.Cell>
                    </Table.Row>
                    }
                    {!isLoading && data.length === 0 && (
                        <Table.Row className="h-20 bg-gray-800">
                            <Table.Cell
                                colSpan={6}
                                className="w-full text-center"
                            >
                                <span className="text-lg font-semibold">
                                    There are no patients
                                </span>
                            </Table.Cell>
                        </Table.Row>
                    )}
                    {!isLoading &&
                        filteredData.map((value, index) => (
                            <PatientTableRow 
                                data={value}
                                key={index}
                            />
                        ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default PatientTable;