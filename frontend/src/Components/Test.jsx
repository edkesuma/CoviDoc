"use client";
import React from "react";
import CreateModal from "./Doctor/Consultation/Modal/CreateModal";
import DoctorEditAccountModal from "./Doctor/DoctorEditAccountModal";
import DeleteAccountAlertModal from "./Patient/DeletePatientAccountALertModal";
import DeleteAccountAlertConfirmationModal from "./Patient/DeletePatientAccountConfirmationModal";
import EditPatientAccountModal from "./Patient/EditPatientAccountModal";
import PatientAccountDeletedAlertModal from "./Patient/PatientAccountDeletedAlertModal";
import PatientGASFilter from "./Doctor/PatientGASFilter";
import ChangePatientPasswordModal from "./Patient/ChangePatientPasswordModal";
import ChangesSaved from "./OverallActorModal/ChangesSaved";
import PasswordU from "./OverallActorModal/PasswordUpdated";
import DocComponent from "./Doctor/DocComponent";

function Test() {
    return (
        <div>
            <DocComponent />
        </div>)
}

export default Test;
