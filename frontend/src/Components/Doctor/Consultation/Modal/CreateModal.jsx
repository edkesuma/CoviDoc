"use client";

import {Button, Checkbox, Label, Modal, TextInput, Datepicker, Textarea} from "flowbite-react";
import {FaCloudUploadAlt} from "react-icons/fa";
import React, {useState} from "react";

function CreateModal() {
    const [openModal, setOpenModal] = useState(true);
    const [date, setDate] = useState(null);
    const [temperature, setTemperature] = useState('')
    const [o2, setO2] = useState('')
    const [leukocyte, setLeukocyte] = useState('')
    const [neutrophil, setNeutrophil] = useState('')
    const [lymphocyte, setLymphocyte] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    function onCloseModal() {
        setOpenModal(false);
        setDate(null);
        setTemperature('')
        setO2('')
        setLeukocyte('')
        setNeutrophil('')
        setLymphocyte('')
    }

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>Create Consultation</Button>
            <Modal show={openModal} size="4xl" onClose={onCloseModal} popup>
                <Modal.Header>
                    <h3 className="text-xl font-medium text-cyan-400 dark:text-white">New Consultation</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className='flex flex-row'>
                            <div className='flex flex-col w-1/2 px-4'>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="date" value="Consultation date"/>
                                    </div>
                                    <Datepicker
                                        id="birth"
                                        selected={date}
                                        onSelectedDateChanged={(date) => setDate(date)}
                                        defaultDate={new Date()}
                                        minDate={new Date(1900, 0, 1)}
                                        maxDate={new Date()}
                                        autoHide={true}
                                        showClearButton={false}
                                        showTodayButton={false}
                                        weekStart={7}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="temperature" value="Temperature"/>
                                    </div>
                                    <TextInput
                                        id="temperature"
                                        value={temperature}
                                        onChange={(event) => setTemperature(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="o2" value="O2 saturation"/>
                                    </div>
                                    <TextInput
                                        id="o2"
                                        value={o2}
                                        onChange={(event) => setO2(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="leukocyte" value="Leukocyte count"/>
                                    </div>
                                    <TextInput
                                        id="leukocyte"
                                        value={leukocyte}
                                        onChange={(event) => setLeukocyte(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="neutrophil" value="Neutrophil Count"/>
                                    </div>
                                    <TextInput
                                        id="neutrophil"
                                        value={neutrophil}
                                        onChange={(event) => setNeutrophil(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="lymphocyte" value="Lymphocyte Count"/>
                                    </div>
                                    <TextInput
                                        id="lymphocyte"
                                        value={lymphocyte}
                                        onChange={(event) => setLymphocyte(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="icu">Recently been in ICU</Label>
                                    <Checkbox id="icu" className="ml-auto"/>
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="supplemental">Recently in need of supplemental O2</Label>
                                    <Checkbox id="supplemental" className="ml-auto"/>
                                </div>
                                <div className="flex my-2">
                                    <Label htmlFor="intubation">Intubation present</Label>
                                    <Checkbox id="intubation" className="ml-auto"/>
                                </div>
                            </div>

                            <div className='flex w-1/2 flex-col px-4 justify-center'>
                                <div className='items-center'>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="border-2 border-dashed border-gray-400 w-64 h-64 flex items-center justify-center text-center cursor-pointer mb-4"
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            {selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Uploaded"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-gray-500">
                                                    <div className='flex justify-center'>
                                                        <FaCloudUploadAlt className='size-12'/>
                                                    </div>

                                                    Drag and Drop X-ray <br/> or<br/><br/>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id="fileInput"
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                    />

                                                    <label
                                                        htmlFor="fileInput"
                                                        className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                                                    >
                                                        Browse file
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="notes" value="Consultation Notes"/>
                                    </div>
                                    <Textarea id="notes" placeholder="Previously had mild ground glass opacities." required rows={4}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button>Submit</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateModal;