import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        // If user is not authenticated, they're redirect to login page
        return <Redirect to="/adminLogin" />;
    }

    // Returns admin pages if they're authenticated
    return children;
};