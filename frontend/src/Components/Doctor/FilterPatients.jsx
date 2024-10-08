import React, { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown, Checkbox } from "flowbite-react";
// components
import AgeRangeSlider from "../AgeRangeSlider";

function FilterPatients({ show, onClose, onFilter }) {
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedAgeRange, setSelectedAgeRange] = useState({ min: 0, max: 100 });
    const [selectedStatus, setSelectedStatus] = useState("");

    // handle gender filter
    const handleToggleGender = (gender) => {
        setSelectedGender((prevGender) => (prevGender === gender ? "" : gender));
    };

    const handleToggleStatus = (status) => {
        setSelectedStatus((prevStatus) => (prevStatus === status ? "" : status));
    };

    // handle apply filter
    function handleFilterSubmit() {
        onFilter({
            gender: selectedGender,
            ageRange: selectedAgeRange,
            status: selectedStatus
        });
        onClose();
    };

    // reset filter (clear choices)
    function resetFilter() {
        setSelectedGender("");
        setSelectedAgeRange({ min: 0, max: 100 });
        setSelectedStatus("");
        onFilter({ 
            gender: "",
            ageRange: { min: 0, max: 100 },
            status: ""
        });
        onClose();
    }


    return (
        <Modal show={show} size="lg" onClose={resetFilter}>
            <Modal.Header>Filter</Modal.Header>

            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        {/* gender filter*/}
                        <Label htmlFor="gender" value="Select Gender" className="text-md"/>
                        <div className="flex items-center space-x-4 mt-2">
                            {/* male */}
                            <button
                                className={`px-4 py-2 w-1/4 rounded-lg font-semibold border transition duration-300 ${
                                selectedGender === "Male" ? "bg-cyan-500 text-white" : "bg-white border-cyan-500 text-cyan-500"
                                }`}
                                onClick={() => handleToggleGender("Male")}
                            >
                                Male
                            </button>

                            {/* female */}
                            <button
                                className={`px-4 py-2 w-1/4 rounded-lg font-semibold border transition duration-300 ${
                                selectedGender === "Female" ? "bg-cyan-500 text-white" : "bg-white border-cyan-500 text-cyan-500"
                                }`}
                                onClick={() => handleToggleGender("Female")}
                            >
                                Female
                            </button>
                        </div>

                        <div className="p-5"></div>

                        {/* age range */}
                        <Label htmlFor="ageRange" value="Select Age Range" />
                        <AgeRangeSlider
                            data={selectedAgeRange}
                            setData={setSelectedAgeRange}
                            minAge={0}
                            maxAge={100}
                        />

                        <div className="p-5"></div>

                        {/* status filter */}
                        <Label htmlFor="status" value="Select Status" className="text-md"/>
                        <div className="flex items-center space-x-4 mt-2">
                            {/* open */}
                            <button
                                className={`px-4 py-2 w-1/4 rounded-lg font-semibold border transition duration-300 ${
                                selectedStatus === "Open" ? "bg-cyan-500 text-white" : "bg-white border-cyan-500 text-cyan-500"
                                }`}
                                onClick={() => handleToggleStatus("Open")}
                            >
                                Open
                            </button>

                            {/* closed */}
                            <button
                                className={`px-4 py-2 w-1/4 rounded-lg font-semibold border transition duration-300 ${
                                selectedStatus === "Closed" ? "bg-cyan-500 text-white" : "bg-white border-cyan-500 text-cyan-500"
                                }`}
                                onClick={() => handleToggleStatus("Closed")}
                            >
                                Closed
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button color="gray" onClick={resetFilter}>
                    Reset Filter
                </Button>
                <Button onClick={handleFilterSubmit}>Apply Filter</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterPatients
