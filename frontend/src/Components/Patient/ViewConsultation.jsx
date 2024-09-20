"use client";

import { Card } from "flowbite-react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaBriefcaseMedical } from "react-icons/fa";

function ViewConsultations({ consultations }) {
  return (
    <div className="mx-20 space-y-4">
      <div className="flex flex-row mx-8 font-bold">
        <div className="w-1/4">Status</div>
        <div className="w-1/4 text-left">Consultation ID</div>
        <div className="w-1/4">Doctor</div>
        <div className="w-1/4">Date</div>
      </div>
      {consultations.map((consultation, index) => (
        <Card key={index}>
          <div className="flex flex-row">
            <div className="w-1/4">
              {consultation.status === "Healthy" ? (
                <AiFillSafetyCertificate color="green" className="w-8 h-8" />
              ) : consultation.status === "Mild" ? (
                <FaBriefcaseMedical color="yellow" className="w-8 h-8" />
              ) : consultation.status === "Moderate" ? (
                <FaBriefcaseMedical color="orange" className="w-8 h-8" />
              ) : consultation.status === "Severe" ? (
                <FaBriefcaseMedical color="red" className="w-8 h-8" />
              ) : null}
            </div>
            <button className="w-1/4 text-left">
              Consultation #{index + 1}
            </button>
            <div className="w-1/4">
              {consultation.doctorName}
            </div>
            <div className="w-1/4">{consultation.consultationDate}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ViewConsultations;
