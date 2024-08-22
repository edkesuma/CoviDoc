import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
    const [inputEmail, setInputEmail] = useState('');

    return (
        <EmailContext.Provider value={{ inputEmail, setInputEmail }}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmail() {
    return useContext(EmailContext);
}
