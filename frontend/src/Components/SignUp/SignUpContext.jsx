import React, { createContext, useState, useContext } from 'react';

const SignUpContext = createContext();

export function SignUpProvider({ children }) {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    return (
        <SignUpContext.Provider value={{ inputEmail, setInputEmail, inputPassword, setInputPassword }}>
            {children}
        </SignUpContext.Provider>
    );
}

export function useSignUp() {
    return useContext(SignUpContext);
}
