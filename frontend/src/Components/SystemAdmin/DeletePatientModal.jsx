import React, { useState, useContext } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
// components
import DeletePatientSuccess from './DeletePatientSuccess';

function DeletePatientModal({ show, onClose, data }) {
  const { token } = useContext(AuthContext);

  const [deletePatientSuccess, setDeletePatientSuccess] = useState(false);

  // handle delete patient account
  function handleDeletePatient() {
    axios
    .delete(`/api/systemAdmin/deletePatient`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: { patientId: data.patientId }
    })
    .then((response) => {
      setDeletePatientSuccess(true);
      onClose();
    })
    .catch((error) => {
      console.error("Error deleting patient account: ", error);
    });
  };

  // confirmation popup after patient account deletion
  function handleDeletePatientSuccess() {
    setDeletePatientSuccess(false);
    onClose();
  };


  return (
    <div>
      <Modal show={show} size="lg" popup={true} onClose={onClose}>
        <Modal.Header />

        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-400" />

            <h1 className="text-xl font-bold text-black">You are about to delete</h1>
            <h1 className="p-1 text-3xl font-bold text-red-600 break-words">{data.name}, <br/> ID: {data.patientId}</h1>

            <div className='p-2'></div>

            <h3 className="mb-5 text-lg font-normal text-black">
              This action is irreversible. <br /> Do you wish to proceed?
            </h3>

            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className="w-44"
                onClick={handleDeletePatient}
              >
                Confirm Delete
              </Button>
              <Button
                color="gray" 
                className="w-44"
                onClick={onClose}
              >
                Cancel Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* delete patient success */}
      <DeletePatientSuccess show={deletePatientSuccess} onClose={handleDeletePatientSuccess} />
    </div>
  );
}

export default DeletePatientModal;
