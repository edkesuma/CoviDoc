"use client";
import ConsultationNavbar from "../../Components/Doctor/Consultation/View/ConsultationNavbar.jsx";
import PatientDetail from "../../Components/Doctor/Consultation/PatientDetail.jsx";
import ViewConsultations from "../../Components/Doctor/Consultation/ViewConsultations.jsx";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {Button, Card} from "flowbite-react";

function ViewConsultationPage() {

    const name = 'John Smith'

    const productData = [
            {
                Status: true,
                ConsultationID: '1',
                Doctor: 'John Doe',
                PatientView: true,
                CreationDate: '15/08/2024'
            },
            {
                Status: false,
                ConsultationID: '2',
                Doctor: 'John Doe',
                PatientView: true,
                CreationDate: '17/08/2024'
            },
            {
                Status: false,
                ConsultationID: '3',
                Doctor: 'John Doe',
                PatientView: false,
                CreationDate: '19/08/2024'
            }
        ]
    ;
    return (
        <div className='flex flex-col items-center'>
            <div>
                <ConsultationNavbar/>
                <div className='flex flex-row ml-20 items-center my-10'>
                    <IoArrowBackCircleOutline color='cyan' className='h-12 w-12'/>
                    <button className='text-4xl ml-2 text-cyan-300 bg-transparent border-none cursor-pointer'>Back
                    </button>
                </div>
                <div className='ml-20 my-10 font-bold text-3xl'>{name}'s Account</div>
                <Card className='mx-20'>
                    <PatientDetail/>
                </Card>
                <div className='mb-24'/>
                <div className='flex flex-row'>
                    <div className='ml-20 my-10 font-bold text-3xl'>{name}’s Consultation Records</div>
                    <Button className='bg-cyan-400 my-10 ml-auto mr-20'>+ Create Consultation Record</Button>
                </div>
                <ViewConsultations data={productData}/>
            </div>
        </div>
    )
}

export default ViewConsultationPage;