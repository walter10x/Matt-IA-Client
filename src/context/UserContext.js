import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Estado para determinar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Información del email del usuario, leída de localStorage
  const [userEmail, setUserEmail] = useState(null);
  // Flag que indica que ya se revisó la existencia del token en localStorage
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsLoggedIn(true);
        setUserEmail(email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
      
    } catch (error) {
      console.error("Error reading localStorage", error);
      setIsLoggedIn(false);
      setUserEmail(null);
    }
    setAuthChecked(true);
  }, []);
  

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        authChecked
      }}>
      {children}
    </UserContext.Provider>
  );
};
