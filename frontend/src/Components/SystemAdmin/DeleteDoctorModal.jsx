import React, { useState, useContext } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
// components
import DeleteDoctorSuccess from './DeleteDoctorSuccess';

function DeleteDoctorModal({ show, onClose, data }) {
    const { token } = useContext(AuthContext);

    const [deleteDoctorSuccess, setDeleteDoctorSuccess] = useState(false);

    // handle delete doctor account
    function handleDeleteDoctor() {
        axios
        .delete(`/api/systemAdmin/deleteDoctor`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { doctorId: data.doctorId }
        })
        .then((response) => {
            setDeleteDoctorSuccess(true);
            onClose();
        })
        .catch((error) => {
            console.error("Error deleting doctor account: ", error);
        });
    };

    // confirmation popup after doctor account deletion
    function handleDeleteDoctorSuccess() {
        setDeleteDoctorSuccess(false);
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
                        <h1 className="p-1 text-3xl font-bold text-red-600 break-words">{data.name}, <br/> ID: {data.doctorId}</h1>

                        <div className='p-2'></div>

                        <h3 className="mb-5 text-lg font-normal text-black">
                            This action is irreversible. <br /> Do you wish to proceed?
                        </h3>

                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                className="w-44"
                                onClick={handleDeleteDoctor}
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

            {/* delete doctor success */}
            <DeleteDoctorSuccess show={deleteDoctorSuccess} onClose={handleDeleteDoctorSuccess} />
        </div>
    )
}

export default DeleteDoctorModal
