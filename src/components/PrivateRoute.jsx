import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, authChecked } = useContext(UserContext);

  // Mientras no se haya verificado la autenticación, no se renderiza nada.
  if (!authChecked) return null;

  // Si se ha verificado la autenticación y el usuario está logueado, renderiza los hijos;
  // de lo contrario, redirige a /login.
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
