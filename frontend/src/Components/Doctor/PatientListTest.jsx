import React from 'react';
import ShowPatientList from "./ShowPatientList.jsx";

const userList = [
    {userType: 'Patient1', email: 'patient1@gmail.com', statue: 'Open'},
    {userType: 'Patient2', email: 'patient2@gmail.com', statue: 'Open'},
    {userType: 'Patient3', email: 'patient3@gmail.com', statue: 'Closed'}
];

function App() {
    return (
        <div>
            <ShowPatientList initialUsers={userList} />
        </div>
    );
}

export default App;
