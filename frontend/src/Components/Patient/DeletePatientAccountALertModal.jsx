import React, { useState, useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { Modal } from "flowbite-react";

function DeleteAccountPrompt({ show, onClose }) {
  const { logout, token } = useContext(AuthContext);

  function closeSuccess() {
    logout();
  }

  return (
    <Modal show={show} size="md" popup={true} onClose={closeSuccess}>
        <Modal.Header />
        
        <Modal.Body>
            <div className="flex justify-center">
                <div className="p-6 text-center">
                    {/* Message */}
                    <p className="text-lg text-black mb-4">Your patient account has been deleted.</p>
                    {/* Exit Button */}
                    <button
                        className="bg-cyan-400 text-white py-2 px-4 rounded cursor-pointer font-bold hover:bg-cyan-500"
                        onClick={closeSuccess}
                    >
                        Exit CoviDoc
                    </button>
                </div>
            </div>
        </Modal.Body>
    </Modal>
  );
}

export default DeleteAccountPrompt;
