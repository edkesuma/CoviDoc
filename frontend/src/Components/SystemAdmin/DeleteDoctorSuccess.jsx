import React from 'react';
import { Modal, Button } from "flowbite-react";

function DeleteDoctorSuccess({ show, onClose }) {
    function closeSuccess() {
        onClose();
        window.location.reload();
    }

    return (
        <Modal show={show} size="md" popup={true} onClose={closeSuccess}>
            <Modal.Header />
            
            <Modal.Body>
                <div className="flex justify-center">
                    <div className="p-6 text-center">
                        {/* Message */}
                        <p className="text-lg text-red-600 mb-4">Doctor account successfully deleted!</p>
                        {/* Exit Button */}
                        <button
                            className="bg-cyan-400 text-white py-2 px-4 rounded cursor-pointer font-bold hover:bg-cyan-500"
                            onClick={closeSuccess}
                        >
                            Back to Previous Page
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default DeleteDoctorSuccess;