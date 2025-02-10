import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token || !email) {
        setIsLoggedIn(false);
        setUserEmail(null);
        setAuthChecked(true);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/verify-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          setIsLoggedIn(true);
          setUserEmail(email);
        } else {
          console.warn('Token inválido o expirado, cerrando sesión');
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          setIsLoggedIn(false);
          setUserEmail(null);
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }

      setAuthChecked(true);
    };

    verifyToken();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, authChecked }}>
      {children}
    </UserContext.Provider>
  );
};
