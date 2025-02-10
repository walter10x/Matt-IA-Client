import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Función para actualizar el estado al leer localStorage
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && token !== 'undefined' && token !== 'null' && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
    setAuthChecked(true);
  };

  // Ejecutar checkAuthStatus al montar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Nuevo: Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        authChecked,
        checkAuthStatus, // Lo exponemos para poder llamarlo manualmente
      }}>
      {children}
    </UserContext.Provider>
  );
};
