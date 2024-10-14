import React from 'react';
import { Modal } from "flowbite-react";

function CreateUpdatePatientError({ show, onClose, errorMessage }) {
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
                        <div>
                            {/* Error Message */}
                            <p className="text-lg text-red-600 mb-4">{errorMessage}</p>
                            {/* Exit Button */}
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer font-bold hover:bg-red-600"
                                onClick={closeSuccess}
                            >
                                Back to Previous Page
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CreateUpdatePatientError;