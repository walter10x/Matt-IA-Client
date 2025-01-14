import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};
