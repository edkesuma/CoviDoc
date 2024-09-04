// Imported libraries
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";

// Imported icons
import { FaRegTrashAlt } from "react-icons/fa";
import DeletePatientModal from "./DeletePatientModal";

function PatientTableRow(props) {
	const [deleteShow, setDeleteShow] = useState(false);
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.patientName}
			</Table.Cell>
			<Table.Cell>
				<p className="w-80 max-h-16 overflow-y-auto">
					{props.data.patientEmail}
				</p>
			</Table.Cell>
			<Table.Cell>
				<Button
					size="xs"
					className="w-40 py-1 bg-red-500"
					onClick={() => setDeleteShow(true)}
				>
					<FaRegTrashAlt className="h-4 w-4 mr-2" />
					Delete
				</Button>
			</Table.Cell>
			<DeletePatientModal
			show={deleteShow}
			onClose={() => setDeleteShow(false)}
			data={props.data}
			/>
		</Table.Row>
	);
}

export default PatientTableRow;
