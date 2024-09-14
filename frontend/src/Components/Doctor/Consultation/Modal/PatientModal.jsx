"use client";

import {Modal} from "flowbite-react";
import React from "react";
import PatientDetail from "../PatientDetail.jsx";

function PatientModal({isShow,onClose, patient}) {

    return (
        <div>
            <Modal show={isShow} size="2xl" onClose={onClose} popup>
                <Modal.Header>
                    <p className="text-xl font-medium text-cyan-400 dark:text-white"></p>
                </Modal.Header>
                <Modal.Body>
                    <div className='mx-4 text-2xl'>{patient.name}</div>
                    <PatientDetail patientDetails={patient}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PatientModal;