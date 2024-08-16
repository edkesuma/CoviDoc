import { Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PatientTable from "../Components/SystemAdmin/PatientTable";

function SearchPage() {
    const [search, setSearch] = useState("");
    return (
      <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">           
            <TextInput
                id="Search"
                placeholder="Search profile"
                className="mr w-2/4"
                icon={FaSearch}
                sizing="lg"
                onChange={
                    (event) => setSearch(event.target.value)
                }
            />
            <PatientTable hoverable={true} searchQuery={search}/>
        </div>
    )
}

export default SearchPage;