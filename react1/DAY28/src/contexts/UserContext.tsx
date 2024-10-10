'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    userId: string | null; // userId can be a string or null
    login: (id: string) => void; // Function to log in
    logout: () => void; // Function to log out
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [userId, setUserId] = useState<string | null>(null); // Initially, no user is logged in

    const login = (id: string) => {
        setUserId(id);
    };

    const logout = () => {
        setUserId(null);
    };

    return (
        <UserContext.Provider value={{ userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
