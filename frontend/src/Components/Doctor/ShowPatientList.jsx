"use client";

import {Table, TextInput} from "flowbite-react";
import {useState} from "react";

function ShowPatientList({initialUsers}) {
    const [userList, setUserList] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");

    const handleStatusChange = (index, newStatus) => {
        const updatedUserList = userList.map((user, i) =>
            i === index ? {...user, statue: newStatus} : user
        );
        setUserList(updatedUserList);
    };

    const filteredUsers = userList.filter(user =>
        user.userType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center">
            <div className='w-3/4'>
                <div className="text-2xl">List of Patients</div>
                <div className="mb-4">
                    <TextInput type="text" placeholder="Enter Name" value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Patient</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Statue</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredUsers.map((user, index) => (
                                <Table.Row key={index} className="bg-white rounded-lg">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.userType}
                                    </Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        <select
                                            value={user.statue}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ShowPatientList;
