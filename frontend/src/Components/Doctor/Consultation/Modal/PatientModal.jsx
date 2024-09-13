"use client";

import {Modal} from "flowbite-react";
import React from "react";
import PatientDetail from "../PatientDetail.jsx";

function PatientModal({isShow,onClose}) {
    const patient = 'John Smith'

    return (
        <div>
            <Modal show={isShow} size="2xl" onClose={onClose} popup>
                <Modal.Header>
                    <h3 className="text-xl font-medium text-cyan-400 dark:text-white"></h3>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-4 text-2xl'>{patient}</div>
                    <PatientDetail/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PatientModal;