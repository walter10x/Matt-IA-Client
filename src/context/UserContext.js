import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Asegúrate de importar la instancia correcta de Firebase
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Para evitar parpadeos en la UI

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
      setAuthChecked(true); // Indica que ya se verificó la autenticación
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
