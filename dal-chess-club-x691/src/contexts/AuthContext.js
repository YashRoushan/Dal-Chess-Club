import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (isAdmin) => setIsAdmin(isAdmin);
    const logout = () => setIsAdmin(false);

    return (
        <AuthContext.Provider value={{ isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};