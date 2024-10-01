import React, { useState, useEffect } from "react";
import { Modal, Button, Label, Dropdown, Checkbox } from "flowbite-react";
// components
import AgeRangeSlider from "../AgeRangeSlider";

function FilterPatientModal({ show, onClose, onFilter }) {
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedAgeRange, setSelectedAgeRange] = useState({ min: 0, max: 100 });

    // handle gender filter
    const handleToggleGender = (gender) => {
        setSelectedGender((prevGender) => (prevGender === gender ? "" : gender));
    };

    // handle apply filter
    function handleFilterSubmit() {
        onFilter({
            gender: selectedGender,
            ageRange: selectedAgeRange
        });
        onClose();
    };

    // reset filter (clear choices)
    function resetFilter() {
        setSelectedGender("");
        setSelectedAgeRange({ min: 0, max: 100 });
        onFilter({ 
            gender: "",
            ageRange: { min: 0, max: 100 } 
        });
        onClose();
    }


    return (
        <Modal show={show} size="lg" onClose={onClose}>
            <Modal.Header>Filter</Modal.Header>

            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        {/* gender */}
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
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleFilterSubmit}>Apply Filter</Button>
                <Button color="gray" onClick={resetFilter}>
                Reset Filter
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterPatientModal;