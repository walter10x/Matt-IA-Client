import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth"; // 🔥 Importamos métodos necesarios

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // 🔥 Observador de Firebase para mantener la sesión activa tras refrescar
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
        localStorage.setItem("token", user.accessToken); // 🔥 Opcionalmente guardar el token
        localStorage.setItem("userEmail", user.email);
      } else {
        logout(); // Si no hay usuario, cerrar sesión
      }
      setAuthChecked(true);
    });

    return () => unsubscribe(); // Cleanup para evitar memory leaks
  }, []);

  const logout = async () => {
    await signOut(auth); // 🔥 Cierra sesión en Firebase
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, authChecked, logout }}>
      {children}
    </UserContext.Provider>
  );
};
